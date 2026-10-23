import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenExploded: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenExploded }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01 Story', target: 'hero' },
    { label: '02 Ingredients', target: 'ingredients' },
    { label: '03 Exploded', target: 'exploded' },
    { label: '04 Formulation', target: 'formulation' },
    { label: '05 Research', target: 'research' },
    { label: '06 Gallery', target: 'gallery' },
    { label: '07 Team', target: 'team' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0E0B]/90 border-b border-[#00E599]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <button
          onClick={() => onNavigate('hero')}
          className="group flex items-center space-x-2.5 text-left focus:outline-none cursor-pointer"
          aria-label="Rosevera Home"
        >
          {/* Delicate Botanical Emblem with Neon Glow */}
          <div className="w-8 h-8 rounded-full bg-[#121F17] border border-[#00E599]/40 flex items-center justify-center text-[#00E599] transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(0,229,153,0.3)]">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22C12 22 17 18 17 12C17 7 12 2 12 2C12 2 7 7 7 12C7 18 12 22 12 22Z" />
              <path d="M12 2V22" />
              <path d="M12 12L16 9" />
              <path d="M12 15L8 12" />
            </svg>
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-lg font-medium text-[#F3F7F4] block uppercase leading-none group-hover:text-[#00E599] transition-colors">
              Rosevera
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#00E599] font-mono font-medium">
              Moisturizer
            </span>
          </div>
        </button>

        {/* Center: Chapter Navigation (riy3.com style chapter links) */}
        <nav className="hidden lg:flex items-center space-x-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => onNavigate(link.target)}
              className="text-xs uppercase tracking-[0.16em] font-mono text-[#A6BFB0] hover:text-[#00E599] transition-colors duration-200 py-1 border-b border-transparent hover:border-[#00E599]/50 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Exploded 3D CTA */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenExploded}
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#121F17] border border-[#00E599]/40 text-[#00E599] text-xs font-mono tracking-[0.14em] uppercase hover:bg-[#00E599] hover:text-[#0A0E0B] transition-all duration-300 shadow-[0_0_20px_rgba(0,229,153,0.25)] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exploded 3D</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#00E599] rounded-lg focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0E0B] border-b border-[#00E599]/20 px-6 py-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  onNavigate(link.target);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm uppercase font-mono tracking-[0.16em] text-[#E5F0E8] hover:text-[#00E599] py-2 border-b border-white/10"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenExploded();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 rounded-full bg-[#00E599] text-[#0A0E0B] text-xs font-mono uppercase tracking-[0.16em] font-semibold text-center shadow-[0_0_20px_rgba(0,229,153,0.3)]"
            >
              Inspect Exploded 3D
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
