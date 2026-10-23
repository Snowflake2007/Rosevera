import React from 'react';
import { Sliders, RefreshCw } from 'lucide-react';

interface ExplodedSectionProps {
  explodeValue: number;
  onExplodeChange: (val: number) => void;
  onResetExplode: () => void;
}

export const ExplodedSection: React.FC<ExplodedSectionProps> = ({
  explodeValue,
  onExplodeChange,
  onResetExplode,
}) => {
  const layers = [
    {
      name: 'Sage Green Precision Cap',
      desc: 'Brushed metallic lid with soft chamfered champagne-gold seal trim.',
      elevation: '+3.6 Y Elevation',
    },
    {
      name: 'Translucent Protection Seal',
      desc: 'Hygienic pull-tab disc preserving emulsion moisture and volatile aromas.',
      elevation: '+2.1 Y Elevation',
    },
    {
      name: 'Whipped Botanical Emulsion',
      desc: 'Suspended whipped cream swirl of Aloe Vera, Rose hydrosol, and nourishing lipids.',
      elevation: '+1.05 Y Elevation',
    },
    {
      name: 'Frosted Glass Body & Base',
      desc: 'Recyclable frosted heavy-wall cosmetic jar resting securely on natural carved stone.',
      elevation: '-0.55 Y Grounded',
    },
  ];

  return (
    <section id="exploded" className="min-h-screen py-24 relative z-10 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="max-w-xl">
          {/* Header */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121F17] border border-[#00E599]/40 mb-4 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-mono font-medium">
              03 / 07 Exploded Architecture
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F7F4] leading-tight mb-4">
            Deconstructed Form. <br />
            <span className="italic font-light text-[#FF758F] drop-shadow-[0_0_20px_rgba(255,117,143,0.35)]">
              Seamless Alignment.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A8BDB0] font-sans leading-relaxed mb-6">
            As you scroll, the Rosevera moisturizer separates smoothly along its vertical axis into distinct functional layers—revealing the inner protection disc, the whipped cream surface, and the frosted glass vessel.
          </p>

          {/* Compact Layer Breakdown */}
          <div className="space-y-3 mb-6">
            {layers.map((layer, idx) => (
              <div
                key={layer.name}
                className="p-3.5 rounded-2xl bg-[#0E1611]/85 border border-[#00E599]/20 backdrop-blur-xs hover:border-[#00E599]/50 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#121F17] text-[#00E599] text-xs flex items-center justify-center font-mono font-medium border border-[#00E599]/30">
                      {idx + 1}
                    </span>
                    <h3 className="font-serif text-base text-[#F3F7F4] font-medium">
                      {layer.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#00E599] bg-[#121F17] px-2 py-0.5 rounded-full border border-[#00E599]/30 shadow-[0_0_10px_rgba(0,229,153,0.15)]">
                    {layer.elevation}
                  </span>
                </div>
                <p className="text-xs text-[#A8BDB0] pl-7">
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Manual Explode Controller Box */}
          <div className="bg-[#0E1611]/90 border border-[#00E599]/35 rounded-2xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <div className="flex items-center justify-between pb-2 border-b border-[#00E599]/20 mb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-3.5 h-3.5 text-[#00E599]" />
                <span className="text-xs uppercase font-mono tracking-[0.14em] text-[#00E599] font-semibold">
                  Explosion Depth Scrubber
                </span>
              </div>
              <button
                onClick={onResetExplode}
                className="text-[10px] font-mono text-[#00E599] hover:text-[#2CEAA3] flex items-center space-x-1 cursor-pointer transition-colors"
                title="Reset to Scroll Control"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Follow Scroll</span>
              </button>
            </div>

            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-[#A8BDB0] font-medium">
                Separation Level
              </span>
              <span className="text-xs font-mono font-bold text-[#00E599]">
                {Math.round(explodeValue * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeValue}
              onChange={(e) => onExplodeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#121F17] rounded-lg appearance-none cursor-pointer accent-[#00E599]"
              aria-label="Exploded View Separation Slider"
            />
            <div className="flex justify-between text-[9px] text-[#A8BDB0]/60 mt-1 uppercase tracking-wider font-mono">
              <span>Assembled (0%)</span>
              <span>Fully Exploded (100%)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
