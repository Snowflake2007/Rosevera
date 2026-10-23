import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#070A08] border-t border-[#00E599]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl tracking-[0.2em] uppercase text-[#F3F7F4] font-semibold">
                Rosevera
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#121F17] text-[#00E599] border border-[#00E599]/30">
                Botanical Skincare
              </span>
            </div>
            <p className="text-xs text-[#A8BDB0] leading-relaxed max-w-sm">
              An interactive botanical study exploring the synergy of fresh aloe vera parenchyma, damask rose floral hydrosol, and restorative lipid matrices.
            </p>
            <p className="text-[11px] font-mono text-[#00E599]">
              Formulated by Siddhi Dhokale, Vaishnavi Kadam & Nidhi Chauhan.
            </p>
          </div>

          {/* Quick Formulation Reference */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E599] font-mono">
              Batch Formula Baseline
            </h4>
            <ul className="text-xs space-y-1.5 text-[#A8BDB0] font-mono">
              <li>• Aloe Vera Gel — 20 g</li>
              <li>• Rose Water — 25 ml</li>
              <li>• Glycerin — 4 ml</li>
              <li>• Coconut Oil — 5 ml</li>
              <li>• Distilled Water — 10 g</li>
              <li>• Vitamin E — 2 capsules</li>
            </ul>
          </div>

          {/* Academic Integrity */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E599] font-mono">
              Academic Integrity
            </h4>
            <p className="text-[11px] text-[#A8BDB0]/80 leading-relaxed">
              Formulation data and observations reflect direct student laboratory prototype logs. Citations reference peer-reviewed dermatological journals.
            </p>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A8BDB0]/60 gap-4">
          <p>© {new Date().getFullYear()} Rosevera Skincare Project. All rights reserved.</p>
          <p className="max-w-md text-center sm:text-right">
            Student academic prototype. Not for commercial distribution or therapeutic claim.
          </p>
        </div>
      </div>
    </footer>
  );
};
