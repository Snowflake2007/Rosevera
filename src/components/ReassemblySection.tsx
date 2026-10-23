import React from 'react';
import { Sparkles, Beaker, Users, ArrowUp } from 'lucide-react';

interface ReassemblySectionProps {
  onExploreFormulation: () => void;
  onMeetTeam: () => void;
  onScrollToTop: () => void;
}

export const ReassemblySection: React.FC<ReassemblySectionProps> = ({
  onExploreFormulation,
  onMeetTeam,
  onScrollToTop
}) => {
  return (
    <section id="reassembly" className="min-h-screen py-28 relative z-10 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Botanical Crest */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#121F17] border border-[#00E599]/40 mb-8 shadow-[0_0_20px_rgba(0,229,153,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#00E599] font-mono font-medium">
            The Complete Product Harmony
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#F3F7F4] leading-[1.1] mb-6">
          Rooted in Nature. <br />
          <span className="italic font-light text-[#00E599] drop-shadow-[0_0_25px_rgba(0,229,153,0.4)]">
            Crafted with Care.
          </span>
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-[#A8BDB0] font-sans font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Discover the story, ingredients, and formulation behind Rosevera. A mindful union of Damask rose hydrosol, fresh aloe vera, and restorative lipids.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreFormulation}
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#00E599] text-[#0A0E0B] text-xs font-mono uppercase tracking-[0.16em] font-semibold hover:bg-[#2CEAA3] transition-all shadow-[0_0_25px_rgba(0,229,153,0.35)] cursor-pointer"
          >
            <Beaker className="w-3.5 h-3.5 text-[#0A0E0B]" />
            <span>Explore the Formulation</span>
          </button>

          <button
            onClick={onMeetTeam}
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#121F17] border border-[#00E599]/40 text-[#E5F0E8] text-xs font-mono uppercase tracking-[0.16em] font-medium hover:border-[#00E599] hover:bg-[#16271D] transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#00E599]" />
            <span>Meet Our Team</span>
          </button>
        </div>

        {/* Back to top button */}
        <div>
          <button
            onClick={onScrollToTop}
            className="inline-flex items-center space-x-2 text-xs uppercase font-mono tracking-[0.16em] text-[#00E599] hover:text-[#2CEAA3] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Return to Top</span>
          </button>
        </div>
      </div>
    </section>
  );
};
