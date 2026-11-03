"""
Hierarchical CNN + Vision Transformer (ViT) Architecture for Epigraphical Paleography.
Solves the Medieval Cursive Convergence by decoupling Macro-Era classification
from fine-grained Micro-Dynasty attribution.
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models
from typing import Tuple, Dict, Any


class SpatialPatchTransformer(nn.Module):
    """Multi-Head Self-Attention layer processing 7x7 spatial glyph token patches."""
    def __init__(self, embed_dim: int = 256, num_heads: int = 8, mlp_dim: int = 512, dropout: float = 0.1):
        super().__init__()
        self.norm1 = nn.LayerNorm(embed_dim)
        self.attn = nn.MultiheadAttention(embed_dim, num_heads, dropout=dropout, batch_first=True)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.mlp = nn.Sequential(
            nn.Linear(embed_dim, mlp_dim),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(mlp_dim, embed_dim),
            nn.Dropout(dropout)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        normed = self.norm1(x)
        attn_out, _ = self.attn(normed, normed, normed)
        x = x + attn_out
        x = x + self.mlp(self.norm2(x))
        return x


class HierarchicalCNNViT(nn.Module):
    """
    Two-Stage Hierarchical Epigraphical Classifier:
    - Backbone: ResNet18 + Spatial ViT Patch Transformer
    - Head 1: Macro-Era Classifier (3 Classes: Ancient Brahmi, Medieval Cursive, Modern)
    - Head 2: Micro-Dynasty Classifier (10 Classes)
    - Gated Joint Inference: Constrains dynasty candidate distribution with macro confidence prior.
    """

    # Mapping from 10 classes to 3 macro-eras
    CLASS_TO_MACRO = {
        0: 0, 1: 0, 2: 0,     # Ashok, Satavahana, Kadamba -> Ancient
        3: 1, 4: 1, 5: 1, 6: 1, # Badami, Rashtrakuta, Kalyan, Hoysala -> Medieval
        7: 2, 8: 2, 9: 2      # Vijayanagara, Mysuru, Modern -> Post-Medieval
    }

    def __init__(
        self,
        num_micro_classes: int = 10,
        num_macro_classes: int = 3,
        embed_dim: int = 256,
        num_transformer_layers: int = 2,
        pretrained: bool = False
    ):
        super().__init__()
        base_cnn = models.resnet18(weights=models.ResNet18_Weights.DEFAULT if pretrained else None)
        self.cnn_conv1 = base_cnn.conv1
        self.cnn_bn1 = base_cnn.bn1
        self.cnn_relu = base_cnn.relu
        self.cnn_maxpool = base_cnn.maxpool
        self.layer1 = base_cnn.layer1
        self.layer2 = base_cnn.layer2
        self.layer3 = base_cnn.layer3
        self.layer4 = base_cnn.layer4

        # Vision Transformer feature projection
        self.feature_proj = nn.Conv2d(512, embed_dim, kernel_size=1)
        self.pos_embed = nn.Parameter(torch.randn(1, 49, embed_dim) * 0.02)

        self.transformers = nn.ModuleList([
            SpatialPatchTransformer(embed_dim=embed_dim, num_heads=8, mlp_dim=512)
            for _ in range(num_transformer_layers)
        ])

        self.cnn_pool = nn.AdaptiveAvgPool2d((1, 1))
        fusion_dim = 512 + embed_dim

        # Gated Multi-Modal Feature Fusion
        self.gate = nn.Sequential(
            nn.Linear(fusion_dim, fusion_dim),
            nn.Sigmoid()
        )

        # Stage 1 Head: Macro-Era Classifier
        self.macro_head = nn.Sequential(
            nn.LayerNorm(fusion_dim),
            nn.Dropout(0.2),
            nn.Linear(fusion_dim, 128),
            nn.GELU(),
            nn.Linear(128, num_macro_classes)
        )

        # Stage 2 Head: Micro-Dynasty Classifier
        self.micro_head = nn.Sequential(
            nn.LayerNorm(fusion_dim),
            nn.Dropout(0.3),
            nn.Linear(fusion_dim, 256),
            nn.GELU(),
            nn.Dropout(0.2),
            nn.Linear(256, num_micro_classes)
        )

        # Build mask tensor mapping dynasty to macro
        macro_mask = torch.zeros(num_micro_classes, num_macro_classes)
        for micro_idx, macro_idx in self.CLASS_TO_MACRO.items():
            macro_mask[micro_idx, macro_idx] = 1.0
        self.register_buffer("macro_mask", macro_mask)

    def extract_features(self, x: torch.Tensor) -> torch.Tensor:
        out = self.cnn_conv1(x)
        out = self.cnn_bn1(out)
        out = self.cnn_relu(out)
        out = self.cnn_maxpool(out)

        out = self.layer1(out)
        out = self.layer2(out)
        out = self.layer3(out)
        feat_map = self.layer4(out)

        cnn_vec = self.cnn_pool(feat_map).flatten(1)

        proj_map = self.feature_proj(feat_map)
        tokens = proj_map.flatten(2).transpose(1, 2)
        tokens = tokens + self.pos_embed

        for transformer in self.transformers:
            tokens = transformer(tokens)

        vit_vec = tokens.mean(dim=1)
        fused = torch.cat([cnn_vec, vit_vec], dim=1)
        gate_weights = self.gate(fused)
        return fused * gate_weights

    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        """Returns (micro_logits [B, 10], macro_logits [B, 3])"""
        feat = self.extract_features(x)
        macro_logits = self.macro_head(feat)
        micro_logits = self.micro_head(feat)
        return micro_logits, macro_logits

    def predict_hierarchical(self, x: torch.Tensor) -> Dict[str, Any]:
        """
        Executes hierarchical gated inference.
        Returns predicted micro class, macro class, confidence scores, and full probabilities.
        """
        self.eval()
        with torch.no_grad():
            micro_logits, macro_logits = self.forward(x)
            macro_probs = F.softmax(macro_logits, dim=-1) # [B, 3]
            micro_probs = F.softmax(micro_logits, dim=-1) # [B, 10]

            # Hierarchical prior gating:
            # P_gated(dynasty_i) = P(dynasty_i) * P(macro_k)^gamma
            macro_prior_expanded = torch.matmul(macro_probs, self.macro_mask.T) # [B, 10]
            gated_probs = micro_probs * (macro_prior_expanded ** 0.5)
            gated_probs = gated_probs / gated_probs.sum(dim=-1, keepdim=True)

            best_micro = gated_probs.argmax(dim=-1)
            best_macro = macro_probs.argmax(dim=-1)

            return {
                "micro_class_idx": best_micro.item(),
                "macro_class_idx": best_macro.item(),
                "micro_confidence": gated_probs[0, best_micro.item()].item(),
                "macro_confidence": macro_probs[0, best_macro.item()].item(),
                "micro_probs": gated_probs[0].tolist(),
                "macro_probs": macro_probs[0].tolist()
            }
