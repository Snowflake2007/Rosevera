import React, { useState } from 'react';
import { DEFAULT_FORMULATION_STEPS, scaleBatchQuantities } from '../utils/formulation';
import { FormulationStep } from '../types';
import { Edit3, Check, Scale, Beaker, Clock, AlertCircle } from 'lucide-react';

export const FormulationSection: React.FC = () => {
  const [steps, setSteps] = useState<FormulationStep[]>(DEFAULT_FORMULATION_STEPS);
  const [isEditing, setIsEditing] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [batchMultiplier, setBatchMultiplier] = useState(1);

  const scaledIngredients = scaleBatchQuantities(batchMultiplier);

  const handleStepChange = (idx: number, field: keyof FormulationStep, value: string) => {
    const updated = [...steps];
    updated[idx] = { ...updated[idx], [field]: value };
    setSteps(updated);
  };

  return (
    <section id="formulation" className="min-h-screen py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121F17] border border-[#00E599]/40 mb-4 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-mono font-medium">
                04 / 07 Laboratory Formulation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F7F4] leading-tight mb-4">
              The Formulation Story. <br />
              <span className="italic font-light text-[#00E599] drop-shadow-[0_0_20px_rgba(0,229,153,0.35)]">
                From Beaker to Emulsion.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#A8BDB0] font-sans leading-relaxed">
              These stages represent our experimental laboratory workflow. The protocol below is fully editable to reflect the exact procedure recorded by our team.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.14em] font-medium transition-all cursor-pointer ${
                isEditing
                  ? 'bg-[#00E599] text-[#0A0E0B] shadow-[0_0_20px_rgba(0,229,153,0.4)]'
                  : 'bg-[#121F17] border border-[#00E599]/40 text-[#00E599] hover:bg-[#16271D]'
              }`}
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Lab Protocol</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Lab Protocol</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Formulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 4-Step Interactive Process */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-6 rounded-3xl transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-[#142319] border-[#00E599] shadow-[0_0_25px_rgba(0,229,153,0.25)] ring-1 ring-[#00E599]/40'
                      : 'bg-[#0E1611]/85 hover:bg-[#121E16] border-[#00E599]/20 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#121F17] text-[#00E599] border border-[#00E599]/30">
                        {step.stepNumber}
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                          className="font-serif text-xl text-[#F3F7F4] bg-[#0A0E0B] border border-[#00E599]/40 px-2 py-1 rounded-lg w-full focus:outline-none"
                        />
                      ) : (
                        <h3 className="font-serif text-xl text-[#F3F7F4] font-medium">
                          {step.title}
                        </h3>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs text-[#00E599] font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{step.duration}</span>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-3 mt-3">
                      <div>
                        <label className="text-[11px] font-mono font-semibold text-[#00E599] uppercase block mb-1">
                          Step Description
                        </label>
                        <textarea
                          rows={3}
                          value={step.description}
                          onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                          className="w-full text-xs p-2.5 rounded-lg border border-[#00E599]/40 bg-[#0A0E0B] text-[#F3F7F4] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono font-semibold text-[#00E599] uppercase block mb-1">
                          Critical Laboratory Note
                        </label>
                        <input
                          type="text"
                          value={step.criticalNotes || ''}
                          onChange={(e) => handleStepChange(idx, 'criticalNotes', e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-[#00E599]/40 bg-[#0A0E0B] text-[#F3F7F4] focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs sm:text-sm text-[#A8BDB0] leading-relaxed mb-3">
                        {step.description}
                      </p>
                      {step.criticalNotes && (
                        <div className="p-3 rounded-xl bg-[#121F17] border border-[#00E599]/20 flex items-start space-x-2 text-xs text-[#A8BDB0]">
                          <AlertCircle className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" />
                          <span><strong className="text-[#F3F7F4]">Note:</strong> {step.criticalNotes}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Formulation Batch Panel */}
          <div className="lg:col-span-5 bg-[#0E1611]/90 border border-[#00E599]/35 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-md sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#00E599]/20 mb-6">
              <div className="flex items-center space-x-2">
                <Beaker className="w-4 h-4 text-[#00E599]" />
                <h3 className="text-xs uppercase font-mono tracking-[0.16em] text-[#00E599] font-semibold">
                  Recorded Batch Quantities
                </h3>
              </div>
              <span className="text-[11px] font-mono bg-[#121F17] text-[#00E599] border border-[#00E599]/30 px-2.5 py-0.5 rounded-full font-medium">
                Prototype Scale
              </span>
            </div>

            {/* Batch Scale Multiplier */}
            <div className="mb-6 bg-[#121F17] p-4 rounded-2xl border border-[#00E599]/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#F3F7F4]">
                  <Scale className="w-3.5 h-3.5 text-[#00E599]" />
                  <span>Batch Scaling Factor:</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#00E599]">
                  {batchMultiplier}x
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {[0.5, 1, 2, 3].map((mult) => (
                  <button
                    key={mult}
                    onClick={() => setBatchMultiplier(mult)}
                    className={`flex-1 py-1.5 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${
                      batchMultiplier === mult
                        ? 'bg-[#00E599] text-[#0A0E0B] shadow-[0_0_15px_rgba(0,229,153,0.3)] font-bold'
                        : 'bg-[#0E1611] border border-[#00E599]/25 text-[#A8BDB0] hover:bg-[#121F17]'
                    }`}
                  >
                    {mult}x
                  </button>
                ))}
              </div>
            </div>

            {/* Preserved Units List */}
            <div className="space-y-3 mb-6">
              {scaledIngredients.map((ing) => (
                <div
                  key={ing.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#121F17] border border-[#00E599]/15 hover:border-[#00E599]/40 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-medium text-[#F3F7F4]">
                    {ing.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="font-mono text-xs font-bold text-[#00E599] bg-[#0E1611] px-2.5 py-1 rounded-md border border-[#00E599]/25">
                      {ing.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#121F17] border border-[#00E599]/20 text-[11px] text-[#A8BDB0] leading-relaxed">
              <p>
                <strong className="text-[#F3F7F4]">Unit Integrity:</strong> Original laboratory units (g, ml, capsules) are preserved exactly as logged. Mixed units are not aggregated into an unverified total weight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
