import React, { useState, useEffect, useMemo } from 'react';
import { HistoricalRuleItem, RuleType, RuleReviewStatus } from '../../types';
import { epigraphyService } from '../../services/epigraphyService';
import { PageHeader } from '../layout/PageHeader';
import { Badge } from '../common/Badge';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Edit3,
  Save,
  RotateCcw,
  ArrowRight,
  Info
} from 'lucide-react';

export const HistoricalRulesView: React.FC = () => {
  const [rules, setRules] = useState<HistoricalRuleItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRule, setSelectedRule] = useState<HistoricalRuleItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Partial<HistoricalRuleItem>>({});
  const [editSuccessMsg, setEditSuccessMsg] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<RuleType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<RuleReviewStatus | 'all'>('all');

  useEffect(() => {
    async function fetchRules() {
      setIsLoading(true);
      try {
        const data = await epigraphyService.getHistoricalRules();
        setRules(data);
      } catch (err) {
        console.error('Failed to load historical rules:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRules();
  }, []);

  const filteredRules = useMemo(() => {
    return rules.filter((r) => {
      if (selectedType !== 'all' && r.ruleType !== selectedType) {
        return false;
      }
      if (selectedStatus !== 'all' && r.reviewStatus !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        return (
          r.ruleCode.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.kannadaTitle.toLowerCase().includes(q) ||
          r.evidenceSource.toLowerCase().includes(q) ||
          r.applicability.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rules, selectedType, selectedStatus, searchQuery]);

  const handleOpenDrawer = (rule: HistoricalRuleItem) => {
    setSelectedRule(rule);
    setIsEditing(false);
    setEditSuccessMsg(null);
  };

  const handleCloseDrawer = () => {
    setSelectedRule(null);
    setIsEditing(false);
    setEditSuccessMsg(null);
  };

  const handleStartEdit = () => {
    if (!selectedRule) return;
    setEditFormData({ ...selectedRule });
    setIsEditing(true);
    setEditSuccessMsg(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRule) return;

    const updated: HistoricalRuleItem = {
      ...selectedRule,
      ...editFormData,
      lastUpdated: 'Just now (local prototype)',
    };

    setRules(prev => prev.map(r => r.id === updated.id ? updated : r));
    setSelectedRule(updated);
    setIsEditing(false);
    setEditSuccessMsg('Rule updated in local prototype state. Persistent database remains unaffected.');
    setTimeout(() => setEditSuccessMsg(null), 4500);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedStatus('all');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Historical Epigraphical Rules Engine"
        subtitle="Structured administrative register for phonological mutations, morphological case syntax, and paleographic diagnostic rules."
        kannadaSubtitle="ಶಾಸನ ವ್ಯಾಕರಣ, ವರ್ಣವಿಕಾಸ ಮತ್ತು ನಿಯಮಾವಳಿ ಪರೀಕ್ಷಾರ್ಥ ವೇದಿಕೆ"
        categoryTag="Rules Engine Registry"
      />

      {/* Scholarly & Prototype Disclaimer Notice */}
      <div className="bg-amber-50/70 border border-amber-300/80 p-4 rounded-xs shadow-subtle space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <span>Institutional Research Prototype Disclaimer</span>
        </div>
        <p className="text-xs text-amber-900/90 font-serif leading-relaxed">
          This administrative workbench presents sample computational rules designed to assist the forthcoming Kannada Inscription OCR & Translation engine.
          <strong> Sample records are for testing purposes only and do not imply unverified authority.</strong>
          All rules require peer review and consensus from certified epigraphists prior to canonical acceptance.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="border border-heritage-border bg-stone-100/70 p-4 rounded-xs space-y-3 shadow-subtle">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search rule by code (e.g. RULE-HAL-PHON-01), name, evidence citation, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-parchment-50 border border-stone-300 rounded-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500 shadow-subtle font-serif"
            />
          </div>

          <div className="text-xs font-mono text-stone-500 whitespace-nowrap">
            Showing <span className="font-bold text-stone-900">{filteredRules.length}</span> of {rules.length} prototype rules
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Filter Rules:</span>
          </div>

          {/* Rule Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as RuleType | 'all')}
            className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500 shadow-subtle"
          >
            <option value="all">All Rule Categories</option>
            <option value="phonological">Phonological (ವರ್ಣವಿಕಾಸ)</option>
            <option value="morphological">Morphological (ವಿಭಕ್ತಿ / ರೂಪಾಂತರ)</option>
            <option value="orthographical">Orthographical (ಸಂಧಿ / ವರ್ಣಶುದ್ಧಿ)</option>
            <option value="metric_poetic">Metric / Poetic (ಛಂದಸ್ಸು / ತ್ರಿಪದಿ)</option>
            <option value="paleographical">Paleographical (ಲಿಪಿ ರೇಖಾಗಣಿತ)</option>
          </select>

          {/* Review Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as RuleReviewStatus | 'all')}
            className="text-xs bg-parchment-50 border border-stone-300 rounded-xs px-2.5 py-1 text-stone-700 focus:outline-none focus:border-stone-500 shadow-subtle"
          >
            <option value="all">All Review Statuses</option>
            <option value="verified_epigraphist">Verified by Epigraphist</option>
            <option value="preliminary_draft">Preliminary Draft</option>
            <option value="needs_peer_review">Needs Peer Review</option>
            <option value="deprecated">Deprecated / Superceded</option>
          </select>

          {(searchQuery || selectedType !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[11px] font-mono text-stone-600 hover:text-stone-900 px-2 py-1 rounded-xs hover:bg-stone-200/70 border border-stone-300 transition-colors ml-auto shadow-subtle"
            >
              <RotateCcw className="w-3 h-3 text-stone-500" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Rules Registry Table */}
      {isLoading ? (
        <div className="py-20 text-center space-y-2">
          <div className="inline-block w-6 h-6 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin"></div>
          <p className="text-xs font-serif text-stone-600">Accessing Historical Rules Engine...</p>
        </div>
      ) : filteredRules.length === 0 ? (
        <div className="border border-dashed border-stone-300 p-12 text-center bg-parchment-50/50 rounded-xs space-y-2">
          <p className="font-serif text-stone-800 text-sm">No rules match the selected filter criteria.</p>
          <button
            onClick={handleResetFilters}
            className="text-xs font-mono text-heritage-ochre hover:underline"
          >
            Clear active filters
          </button>
        </div>
      ) : (
        <div className="border border-heritage-border rounded-xs overflow-hidden shadow-subtle bg-parchment-50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100 border-b border-heritage-border text-stone-600 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Rule Code & Ver.</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Rule Title & Kannada Description</th>
                  <th className="py-2.5 px-3">Target Script</th>
                  <th className="py-2.5 px-3">Evidence Source</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-heritage-border/60">
                {filteredRules.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => handleOpenDrawer(r)}
                    className="hover:bg-parchment-100/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3 font-mono whitespace-nowrap">
                      <div className="font-bold text-stone-900 group-hover:text-heritage-ochre transition-colors">
                        {r.ruleCode}
                      </div>
                      <span className="text-[10px] text-stone-400">{r.ruleVersion}</span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <Badge variant="rule_type" size="sm">
                        {r.ruleType.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-serif font-bold text-stone-900">
                        {r.title}
                      </div>
                      <div className="font-kannada text-xs text-stone-600 mt-0.5">
                        {r.kannadaTitle}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <Badge variant="script" size="sm">
                        {r.associatedScript.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-stone-700 font-serif">
                      <div className="line-clamp-1 max-w-[200px]" title={r.evidenceSource}>
                        {r.evidenceSource}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {r.reviewStatus === 'verified_epigraphist' ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded-xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : r.reviewStatus === 'needs_peer_review' ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] bg-amber-50 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded-xs">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          Peer Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] bg-stone-100 text-stone-600 border border-stone-300 px-1.5 py-0.5 rounded-xs">
                          <Clock className="w-3 h-3 text-stone-500" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDrawer(r);
                        }}
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-stone-600 hover:text-stone-900 border border-stone-300 px-2 py-1 rounded-xs bg-parchment-50 shadow-subtle group-hover:bg-white transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rule Detail & Local Editing Drawer */}
      {selectedRule && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs transition-opacity">
          <div
            className="w-full max-w-2xl bg-parchment-50 border-l border-heritage-border h-full overflow-y-auto shadow-2xl p-6 space-y-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between border-b border-heritage-border pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="rule_type" size="sm">{selectedRule.ruleType.replace('_', ' ')}</Badge>
                    <span className="font-mono text-xs text-stone-500">{selectedRule.ruleVersion}</span>
                    <Badge variant="script" size="sm">{selectedRule.associatedScript.replace('_', ' ')}</Badge>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {selectedRule.ruleCode}: {selectedRule.title}
                  </h3>
                  <div className="font-kannada text-xs text-stone-600 mt-0.5">
                    {selectedRule.kannadaTitle}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseDrawer}
                  className="p-1 rounded-xs text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success alert */}
              {editSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xs text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{editSuccessMsg}</span>
                </div>
              )}

              {/* View vs Edit Mode */}
              {!isEditing ? (
                <div className="space-y-5 text-xs">
                  {/* Modern Kannada Rule */}
                  <div className="bg-parchment-100/70 border border-heritage-border p-4 rounded-xs space-y-1.5">
                    <span className="font-mono text-[10px] uppercase text-stone-500 tracking-wider block">
                      Canonical Modern Kannada Translation Directive:
                    </span>
                    <p className="font-kannada text-sm text-stone-900 leading-relaxed">
                      {selectedRule.modernKannadaRule}
                    </p>
                  </div>

                  {/* Linguistic Description */}
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-stone-400 tracking-wider block">
                      Philological & Grammatical Description:
                    </span>
                    <p className="font-serif text-stone-700 leading-relaxed text-xs">
                      {selectedRule.description}
                    </p>
                  </div>

                  {/* Inscriptional Example */}
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs space-y-2">
                    <span className="font-mono text-[10px] uppercase text-stone-500 tracking-wider block">
                      Attested Epigraphical Example:
                    </span>
                    <div className="font-kannada text-xs font-semibold text-stone-900 bg-white border border-stone-200 p-2 rounded-xs">
                      {selectedRule.inscriptionalExample}
                    </div>
                    <div className="text-[11px] text-stone-600 font-serif">
                      <span className="font-mono text-[10px] text-stone-400">Equivalent: </span>
                      {selectedRule.modernEquivalent}
                    </div>
                  </div>

                  {/* Scholarly Evidence & References */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xs">
                      <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                        Evidence Source:
                      </span>
                      <p className="font-serif text-stone-800">
                        {selectedRule.evidenceSource}
                      </p>
                    </div>

                    <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xs">
                      <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                        Applicability Scope:
                      </span>
                      <p className="font-serif text-stone-800">
                        {selectedRule.applicability}
                      </p>
                    </div>
                  </div>

                  {/* Exceptions */}
                  {selectedRule.exceptionsOrCaveats && (
                    <div className="border-t border-heritage-border/70 pt-3">
                      <span className="font-mono text-[10px] uppercase text-stone-400 block mb-1">
                        Exceptions & Epigraphist Caveats:
                      </span>
                      <p className="font-serif text-stone-600 text-xs leading-relaxed italic">
                        {selectedRule.exceptionsOrCaveats}
                      </p>
                    </div>
                  )}

                  {/* Review Requirement Flag */}
                  <div className="border border-stone-200 bg-stone-100/60 p-3 rounded-xs flex items-center justify-between text-xs">
                    <span className="font-serif text-stone-700">Requires Certified Epigraphist Signoff:</span>
                    <span className="font-mono font-bold text-stone-900">
                      {selectedRule.expertReviewRequired ? 'Yes (Mandatory)' : 'No (Automated Rule)'}
                    </span>
                  </div>
                </div>
              ) : (
                /* Edit Mode (Local Prototype State Only) */
                <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                  <div className="bg-stone-100 border border-stone-300 p-2.5 rounded-xs flex items-center gap-2 text-stone-600 font-serif">
                    <Info className="w-4 h-4 text-heritage-ochre flex-shrink-0" />
                    <span>Modifications update local prototype state only. Persistent changes are decoupled from the backend.</span>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-stone-500 mb-1">
                      Rule Title:
                    </label>
                    <input
                      type="text"
                      value={editFormData.title || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-serif text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-stone-500 mb-1">
                      Kannada Title:
                    </label>
                    <input
                      type="text"
                      value={editFormData.kannadaTitle || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, kannadaTitle: e.target.value })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-kannada text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-stone-500 mb-1">
                      Modern Kannada Directive:
                    </label>
                    <textarea
                      rows={3}
                      value={editFormData.modernKannadaRule || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, modernKannadaRule: e.target.value })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-kannada text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-stone-500 mb-1">
                      Philological Description:
                    </label>
                    <textarea
                      rows={4}
                      value={editFormData.description || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-serif text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-stone-500 mb-1">
                        Review Status:
                      </label>
                      <select
                        value={editFormData.reviewStatus || 'verified_epigraphist'}
                        onChange={(e) => setEditFormData({ ...editFormData, reviewStatus: e.target.value as RuleReviewStatus })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xs text-xs font-mono"
                      >
                        <option value="verified_epigraphist">Verified by Epigraphist</option>
                        <option value="preliminary_draft">Preliminary Draft</option>
                        <option value="needs_peer_review">Needs Peer Review</option>
                        <option value="deprecated">Deprecated</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-stone-500 mb-1">
                        Applicability:
                      </label>
                      <input
                        type="text"
                        value={editFormData.applicability || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, applicability: e.target.value })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xs font-serif text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-heritage-border">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 border border-stone-300 rounded-xs bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-mono"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 border border-stone-900 rounded-xs bg-stone-900 text-white hover:bg-stone-800 text-xs font-mono flex items-center gap-1.5 shadow-subtle"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Prototype Rule</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Drawer Footer Actions */}
            {!isEditing && (
              <div className="border-t border-heritage-border pt-4 flex items-center justify-between">
                <span className="font-mono text-[10px] text-stone-400">
                  Updated: {selectedRule.lastUpdated}
                </span>

                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="flex items-center gap-1.5 text-xs font-mono bg-parchment-100 hover:bg-parchment-200 border border-stone-300 text-stone-800 px-3 py-1.5 rounded-xs shadow-subtle transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-heritage-ochre" />
                  <span>Edit Rule (Local Session)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
