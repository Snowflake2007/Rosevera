import React, { useState, useEffect } from 'react';
import { RESEARCH_PAPERS, INITIAL_OBSERVATIONS, validateObservationEntry } from '../utils/formulation';
import { ObservationEntry, ResearchPaper } from '../types';
import { BookOpen, ExternalLink, Plus, Trash2, Edit2, AlertCircle, Calendar, UserCheck } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const [observations, setObservations] = useState<ObservationEntry[]>(() => {
    try {
      const saved = localStorage.getItem('rosevera_observations');
      return saved ? JSON.parse(saved) : INITIAL_OBSERVATIONS;
    } catch {
      return INITIAL_OBSERVATIONS;
    }
  });

  const [activeTab, setActiveTab] = useState<'papers' | 'journal'>('papers');
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper>(RESEARCH_PAPERS[0]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ObservationEntry>>({
    date: new Date().toISOString().split('T')[0],
    batchNumber: 'BATCH-RV-01',
    appearance: '',
    colour: '',
    texture: '',
    consistency: '',
    separation: 'None observed',
    odour: '',
    notes: '',
    recorder: 'Siddhi Dhokale'
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('rosevera_observations', JSON.stringify(observations));
    } catch (err) {
      console.error('Failed to save observations', err);
    }
  }, [observations]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      batchNumber: 'BATCH-RV-01',
      appearance: '',
      colour: '',
      texture: '',
      consistency: '',
      separation: 'None observed',
      odour: '',
      notes: '',
      recorder: 'Siddhi Dhokale'
    });
    setFormErrors([]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (entry: ObservationEntry) => {
    setEditingId(entry.id);
    setFormData(entry);
    setFormErrors([]);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setObservations((prev) => prev.filter((o) => o.id !== id));
  };

  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateObservationEntry(formData);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    if (editingId) {
      setObservations((prev) =>
        prev.map((o) => (o.id === editingId ? ({ ...formData, id: editingId } as ObservationEntry) : o))
      );
    } else {
      const newEntry: ObservationEntry = {
        ...(formData as ObservationEntry),
        id: `obs-${Date.now()}`
      };
      setObservations((prev) => [newEntry, ...prev]);
    }

    setIsModalOpen(false);
  };

  return (
    <section id="research" className="min-h-screen py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121F17] border border-[#00E599]/40 mb-4 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-mono font-medium">
              05 / 07 Research & Observation Journal
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F7F4] leading-tight mb-4">
            Evidence-Based Formulation. <br />
            <span className="italic font-light text-[#FF758F] drop-shadow-[0_0_20px_rgba(255,117,143,0.35)]">
              Empirical Observation.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8BDB0] font-sans leading-relaxed">
            Examine the academic dermatological literature informing our constituent choices, and explore our live laboratory observation logs recorded during experimental batch creation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-3 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('papers')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] font-medium transition-all cursor-pointer ${
              activeTab === 'papers'
                ? 'bg-[#00E599] text-[#0A0E0B] shadow-[0_0_20px_rgba(0,229,153,0.35)] font-bold'
                : 'bg-[#0E1611] text-[#A8BDB0] hover:text-[#F3F7F4] border border-[#00E599]/25'
            }`}
          >
            Academic Research ({RESEARCH_PAPERS.length})
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] font-medium transition-all cursor-pointer ${
              activeTab === 'journal'
                ? 'bg-[#00E599] text-[#0A0E0B] shadow-[0_0_20px_rgba(0,229,153,0.35)] font-bold'
                : 'bg-[#0E1611] text-[#A8BDB0] hover:text-[#F3F7F4] border border-[#00E599]/25'
            }`}
          >
            Lab Observation Journal ({observations.length})
          </button>
        </div>

        {/* View 1: Academic Research Papers */}
        {activeTab === 'papers' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              {RESEARCH_PAPERS.map((paper) => {
                const isSelected = selectedPaper.id === paper.id;
                return (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    className={`w-full text-left p-6 rounded-3xl transition-all duration-300 border cursor-pointer ${
                      isSelected
                        ? 'bg-[#142319] border-[#00E599] shadow-[0_0_25px_rgba(0,229,153,0.25)] ring-1 ring-[#00E599]/40'
                        : 'bg-[#0E1611]/85 hover:bg-[#121E16] border-[#00E599]/20 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#00E599]">
                        {paper.citation}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#121F17] text-[#00E599] font-mono border border-[#00E599]/30">
                        {paper.focusIngredient}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-[#F3F7F4] mb-2 font-medium leading-snug">
                      {paper.title}
                    </h3>

                    <p className="text-xs text-[#A8BDB0] italic mb-2">
                      {paper.journal}
                    </p>

                    <p className="text-xs text-[#A8BDB0]/80 line-clamp-2 leading-relaxed">
                      {paper.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-5 bg-[#0E1611]/95 border border-[#00E599]/35 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-md sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-[#00E599]/20 mb-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#00E599]" />
                  <span className="text-xs uppercase font-mono tracking-[0.16em] text-[#00E599] font-semibold">
                    Research Abstract
                  </span>
                </div>
                <span className="text-xs font-mono text-[#00E599] font-bold">
                  {selectedPaper.year}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#F3F7F4] mb-3 leading-snug">
                {selectedPaper.title}
              </h3>

              <div className="text-xs text-[#A8BDB0] mb-6 space-y-1">
                <p><strong>Authors:</strong> {selectedPaper.authors}</p>
                <p><strong>Source:</strong> {selectedPaper.journal}</p>
                <p><strong>Focus Compound:</strong> {selectedPaper.focusIngredient}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121F17] border border-[#00E599]/25 mb-6 space-y-2">
                <h4 className="text-xs font-mono font-semibold text-[#00E599] uppercase tracking-wider">
                  Key Documented Finding:
                </h4>
                <p className="text-xs sm:text-sm text-[#F3F7F4] leading-relaxed">
                  {selectedPaper.keyFinding}
                </p>
              </div>

              <div className="text-xs text-[#A8BDB0] leading-relaxed mb-6">
                <h4 className="font-semibold text-[#F3F7F4] mb-1">Study Summary:</h4>
                <p>{selectedPaper.summary}</p>
              </div>

              <a
                href={selectedPaper.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#00E599] text-[#0A0E0B] text-xs font-mono uppercase tracking-[0.14em] font-semibold hover:bg-[#2CEAA3] transition-colors shadow-[0_0_15px_rgba(0,229,153,0.3)]"
              >
                <span>Read Full Journal Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* View 2: Project Observation Journal */}
        {activeTab === 'journal' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs sm:text-sm text-[#A8BDB0]">
                Physical stability and organoleptic records logged locally for this prototype.
              </p>
              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#00E599] text-[#0A0E0B] text-xs font-mono uppercase tracking-[0.14em] font-semibold hover:bg-[#2CEAA3] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,153,0.3)]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Observation Entry</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {observations.map((entry) => (
                <div
                  key={entry.id}
                  className="p-6 rounded-3xl bg-[#0E1611]/85 border border-[#00E599]/25 shadow-sm hover:border-[#00E599]/50 transition-all relative group"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-[#00E599]" />
                      <span className="font-mono text-xs font-semibold text-[#F3F7F4]">
                        {entry.date}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#121F17] text-[#00E599] border border-[#00E599]/30">
                        {entry.batchNumber}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEdit(entry)}
                        className="p-1.5 text-[#00E599] hover:bg-[#121F17] rounded-lg transition-colors cursor-pointer"
                        title="Edit Entry"
                        aria-label={`Edit observation from ${entry.date}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Delete Entry"
                        aria-label={`Delete observation from ${entry.date}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <div className="p-2.5 rounded-xl bg-[#121F17]">
                      <span className="text-[10px] uppercase font-mono font-semibold text-[#00E599] block">Colour</span>
                      <span className="text-[#F3F7F4] font-medium">{entry.colour}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#121F17]">
                      <span className="text-[10px] uppercase font-mono font-semibold text-[#00E599] block">Texture</span>
                      <span className="text-[#F3F7F4] font-medium">{entry.texture}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#121F17]">
                      <span className="text-[10px] uppercase font-mono font-semibold text-[#00E599] block">Consistency</span>
                      <span className="text-[#F3F7F4] font-medium">{entry.consistency}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#121F17]">
                      <span className="text-[10px] uppercase font-mono font-semibold text-[#00E599] block">Separation</span>
                      <span className="text-[#F3F7F4] font-medium">{entry.separation}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#A8BDB0] mb-4">
                    <p><strong className="text-[#F3F7F4]">Appearance:</strong> {entry.appearance}</p>
                    <p><strong className="text-[#F3F7F4]">Odour / Scent:</strong> {entry.odour}</p>
                    {entry.notes && <p className="italic text-[#A8BDB0]/80"><strong className="text-[#F3F7F4]">Notes:</strong> {entry.notes}</p>}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A8BDB0]">
                    <div className="flex items-center space-x-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#00E599]" />
                      <span>Recorded by: <strong className="text-[#F3F7F4]">{entry.recorder}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-[#0E1611] border border-[#00E599]/30 flex items-start space-x-3 text-xs text-[#A8BDB0]">
              <AlertCircle className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#F3F7F4]">Scientific Authenticity:</strong> All journal entries represent direct team laboratory observations. Rosevera does not claim clinical verification, dermatological trial testing, or commercial therapeutic readiness.
              </p>
            </div>
          </div>
        )}

        {/* Observation Entry Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#0A0E0B]/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0E1611] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#00E599]/40 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="font-serif text-2xl text-[#F3F7F4]">
                  {editingId ? 'Edit Observation Entry' : 'Log New Observation'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs uppercase font-mono text-[#00E599] hover:text-[#2CEAA3]"
                >
                  Cancel
                </button>
              </div>

              {formErrors.length > 0 && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs mb-4 space-y-1">
                  {formErrors.map((err, i) => (
                    <p key={i}>• {err}</p>
                  ))}
                </div>
              )}

              <form onSubmit={handleSaveObservation} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#00E599] mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#00E599] mb-1">Batch Code</label>
                    <input
                      type="text"
                      value={formData.batchNumber || ''}
                      onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#00E599] mb-1">Appearance Profile</label>
                  <input
                    type="text"
                    placeholder="e.g. Smooth glossy whipped emulsion"
                    value={formData.appearance || ''}
                    onChange={(e) => setFormData({ ...formData, appearance: e.target.value })}
                    className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#00E599] mb-1">Colour Observation</label>
                    <input
                      type="text"
                      placeholder="e.g. Pale pearl ivory"
                      value={formData.colour || ''}
                      onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#00E599] mb-1">Texture / Skin Feel</label>
                    <input
                      type="text"
                      placeholder="e.g. Velvety, fast absorbing"
                      value={formData.texture || ''}
                      onChange={(e) => setFormData({ ...formData, texture: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#00E599] mb-1">Consistency</label>
                    <input
                      type="text"
                      placeholder="e.g. Medium whipped cream"
                      value={formData.consistency || ''}
                      onChange={(e) => setFormData({ ...formData, consistency: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#00E599] mb-1">Phase Separation</label>
                    <input
                      type="text"
                      placeholder="e.g. None observed"
                      value={formData.separation || ''}
                      onChange={(e) => setFormData({ ...formData, separation: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#00E599] mb-1">Odour / Aroma</label>
                  <input
                    type="text"
                    placeholder="e.g. Subtle fresh Damask rose"
                    value={formData.odour || ''}
                    onChange={(e) => setFormData({ ...formData, odour: e.target.value })}
                    className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#00E599] mb-1">Additional Lab Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Physical storage conditions, ambient temperature, absorption rate..."
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#00E599] mb-1">Team Member (Recorder)</label>
                  <select
                    value={formData.recorder || 'Siddhi Dhokale'}
                    onChange={(e) => setFormData({ ...formData, recorder: e.target.value })}
                    className="w-full p-2 rounded-lg border border-[#00E599]/30 bg-[#121F17] text-[#F3F7F4] text-xs"
                  >
                    <option value="Siddhi Dhokale">Siddhi Dhokale</option>
                    <option value="Vaishnavi Kadam">Vaishnavi Kadam</option>
                    <option value="Nidhi Chauhan">Nidhi Chauhan</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-white/20 text-[#A8BDB0] text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#00E599] text-[#0A0E0B] text-xs font-mono uppercase font-semibold hover:bg-[#2CEAA3] transition-colors"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
