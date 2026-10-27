@echo off
title Upgrade PyTorch to CUDA 12.8 for RTX 5050 (sm_120 Blackwell)
echo =========================================================================
echo Upgrading PyTorch & Torchvision to CUDA 12.8 (cu128)
echo This compiles native sm_120 kernels for your NVIDIA GeForce RTX 5050!
echo =========================================================================
"C:\Users\Kushal M N\AppData\Local\Programs\Python\Python311\python.exe" -m pip install --upgrade torch torchvision --index-url https://download.pytorch.org/whl/cu128
echo.
echo Checking GPU CUDA compatibility...
"C:\Users\Kushal M N\AppData\Local\Programs\Python\Python311\python.exe" -c "import torch; print('CUDA Available:', torch.cuda.is_available()); print('Device:', torch.cuda.get_device_name(0)); a = torch.zeros(2,2,device='cuda'); print('Tensor GPU Test:', (a+1).sum().item())"
pause
