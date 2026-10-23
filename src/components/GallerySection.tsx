import React, { useState } from 'react';
import { Image as ImageIcon, FileText, CheckCircle2, Sparkles, Beaker } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  return (
    <section id="gallery" className="min-h-screen py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121F17] border border-[#00E599]/40 mb-4 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-mono font-medium">
              06 / 07 Visual Archive & Documentation
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F7F4] leading-tight mb-4">
            Project Visual Gallery. <br />
            <span className="italic font-light text-[#00E599] drop-shadow-[0_0_20px_rgba(0,229,153,0.35)]">
              From Concept to Reality.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8BDB0] font-sans leading-relaxed">
            Authentic documentation of the Rosevera formulation journey. Featuring our master campaign photograph captured in studio sunlight.
          </p>
        </div>

        {/* Master Still Photograph Showcase */}
        <div className="bg-[#0E1611]/90 border border-[#00E599]/35 rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-md mb-12">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#00E599]/20">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#00E599]">
              <ImageIcon className="w-4 h-4 text-[#00E599]" />
              <span>Master Campaign Presentation Still</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#121F17] text-[#00E599] border border-[#00E599]/30">
              Verified Project Visual
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div
              className="lg:col-span-8 relative rounded-2xl overflow-hidden aspect-16/9 bg-[#0A0E0B] cursor-pointer group border border-[#00E599]/30 shadow-[0_0_40px_rgba(0,229,153,0.15)]"
              onClick={() => setActiveMedia('/assets/aistudio/image_6c1ab0a57f24fa87fc2139896a_5c71e027.jpg')}
            >
              <img
                src="/assets/aistudio/image_6c1ab0a57f24fa87fc2139896a_5c71e027.jpg"
                alt="Rosevera Moisturizer luxury presentation on carved natural stone"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0E0B]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#00E599] text-xs font-mono uppercase tracking-widest">
                Click to Expand Master Still
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4 text-xs text-[#A8BDB0] leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#121F17] border border-[#00E599]/20 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#00E599] tracking-wider block font-semibold">
                  Botanical Composition
                </span>
                <p className="text-xs text-[#F3F7F4]">
                  Damascus rose blossom, freshly sliced succulent aloe vera leaf sections, and suspended moisture droplets on hand-carved stone.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121F17] border border-[#00E599]/20 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#00E599] tracking-wider block font-semibold">
                  Packaging Architecture
                </span>
                <p className="text-xs text-[#F3F7F4]">
                  Heavy-wall recyclable frosted glass container with a precision-machined sage metallic cap and airtight hygienic pull-tab seal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Categories Cards (100% Pure Skincare Formulation - No Tech Stack) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#0E1611]/85 border border-[#00E599]/20 shadow-sm hover:border-[#00E599]/40 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#121F17] border border-[#00E599]/30 flex items-center justify-center text-[#00E599] mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#F3F7F4] mb-2 font-medium">
              Ingredient Measurement
            </h3>
            <p className="text-xs text-[#A8BDB0] leading-relaxed">
              Analytical balance weighing of 20 g Aloe vera gel, 10 g deionized water, and micro-volumetric pipetting of floral hydrosol.
            </p>
            <div className="mt-3 flex items-center text-[11px] text-[#00E599] font-mono space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Laboratory Documented</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0E1611]/85 border border-[#00E599]/20 shadow-sm hover:border-[#00E599]/40 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#121F17] border border-[#00E599]/30 flex items-center justify-center text-[#00E599] mb-4">
              <Beaker className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#F3F7F4] mb-2 font-medium">
              Emulsion Whipping
            </h3>
            <p className="text-xs text-[#A8BDB0] leading-relaxed">
              Low-shear aqueous-lipid phase dispersion followed by controlled manual whisking to achieve a light, non-greasy mousse feel.
            </p>
            <div className="mt-3 flex items-center text-[11px] text-[#00E599] font-mono space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Texture Verified</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0E1611]/85 border border-[#00E599]/20 shadow-sm hover:border-[#00E599]/40 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-[#121F17] border border-[#00E599]/30 flex items-center justify-center text-[#00E599] mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#F3F7F4] mb-2 font-medium">
              Stability & Organoleptics
            </h3>
            <p className="text-xs text-[#A8BDB0] leading-relaxed">
              Monitoring 24-hour, 7-day, and 14-day sample consistency, natural damask rose aroma retention, and phase stability at 22°C.
            </p>
            <div className="mt-3 flex items-center text-[11px] text-[#00E599] font-mono space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Syneresis</span>
            </div>
          </div>
        </div>

        {/* Media Lightbox Modal */}
        {activeMedia && (
          <div
            className="fixed inset-0 z-50 bg-[#0A0E0B]/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setActiveMedia(null)}
          >
            <div className="max-w-4xl max-h-[90vh] bg-[#0E1611] rounded-3xl p-3 shadow-[0_0_60px_rgba(0,229,153,0.3)] border border-[#00E599]/40 overflow-hidden">
              <img
                src={activeMedia}
                alt="Enlarged Project Visual"
                className="w-full h-full max-h-[82vh] object-contain rounded-2xl"
              />
              <p className="text-center text-xs text-[#00E599] py-2 font-mono uppercase tracking-widest">
                Rosevera Moisturizer — Master Visual Documentation
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
