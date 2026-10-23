import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Harvesting botanical essences...');
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setProgress(100);
      setIsComplete(true);
      setShouldRender(false);
      onLoaded();
      return;
    }

    const milestones = [
      { threshold: 15, message: 'Harvesting Damask rose petals & aloe mucilage...' },
      { threshold: 40, message: 'Infusing cold-pressed virgin coconut lipids...' },
      { threshold: 65, message: 'Calibrating trivalent glycerol humectant balance...' },
      { threshold: 85, message: 'Purifying aqueous hydrogel matrix...' },
      { threshold: 100, message: 'Nature, refined into skincare.' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.max(1, Math.floor((100 - current) * 0.12) + (Math.random() > 0.5 ? 2 : 1));
      current = Math.min(100, current + increment);
      setProgress(current);

      const activeMilestone = milestones.find((m) => current <= m.threshold) || milestones[milestones.length - 1];
      setStatusMessage(activeMilestone.message);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            setShouldRender(false);
            onLoaded();
          }, 800);
        }, 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (!shouldRender) return null;

  return (
    <div
      data-testid="loading-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0E0B] transition-all duration-1000 ease-out select-none ${
        isComplete ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Soft Neon Light and Dark Ambient Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-radial from-[#00E599]/15 via-[#FF758F]/5 to-transparent blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Slowly Blooming Botanical Rose & Water Ripple Emblem with Neon Glow */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border border-[#00E599]/30 animate-ping opacity-35"
            style={{ animationDuration: '3.5s' }}
          />
          <div
            className="absolute -inset-3 rounded-full border border-[#FF758F]/25 animate-pulse opacity-45"
            style={{ animationDuration: '2.5s' }}
          />

          <div className="w-20 h-20 rounded-full bg-[#121F17] flex items-center justify-center backdrop-blur-xs border border-[#00E599]/40 shadow-[0_0_25px_rgba(0,229,153,0.3)]">
            <svg
              className="w-12 h-12 text-[#00E599]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 15 C35 15 25 30 25 45 C25 65 50 85 50 85 C50 85 75 65 75 45 C75 30 65 15 50 15 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="transition-all duration-700"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: 200 - (progress / 100) * 200,
                }}
              />
              <path
                d="M50 28 C42 28 35 38 35 48 C35 60 50 72 50 72 C50 72 65 60 65 48 C65 38 58 28 50 28 Z"
                stroke="#FF758F"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 140,
                  strokeDashoffset: 140 - (progress / 100) * 140,
                }}
              />
              <circle
                cx="50"
                cy="46"
                r="6"
                fill="#00E599"
                className="transition-transform duration-500 shadow-[0_0_10px_#00E599]"
                style={{
                  transform: `scale(${0.3 + (progress / 100) * 0.7})`,
                  transformOrigin: '50px 46px',
                }}
              />
            </svg>
          </div>
        </div>

        {/* Brand Wordmark */}
        <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.25em] uppercase text-[#F3F7F4] font-normal mb-1">
          Rosevera
        </h2>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#00E599] font-mono font-medium mb-8">
          Moisturizer
        </p>

        {/* Refined Hairline Neon Progress Bar */}
        <div className="w-56 h-[2px] bg-[#121F17] rounded-full overflow-hidden mb-3.5 relative border border-[#00E599]/20">
          <div
            className="h-full bg-gradient-to-r from-[#00E599] via-[#2CEAA3] to-[#FF758F] transition-all duration-200 ease-out rounded-full shadow-[0_0_10px_rgba(0,229,153,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter & Status Milestone */}
        <div className="flex items-center justify-between w-56 text-[11px] font-mono mb-2">
          <span className="text-[#00E599] font-bold">{progress}%</span>
          <span className="text-[#A8BDB0]/60 uppercase tracking-widest text-[9px]">Loaded</span>
        </div>

        <p className="text-xs italic text-[#A8BDB0] font-serif h-5 transition-all duration-300">
          {statusMessage}
        </p>

        <button
          onClick={() => {
            setProgress(100);
            setIsComplete(true);
            setTimeout(() => {
              setShouldRender(false);
              onLoaded();
            }, 300);
          }}
          className="mt-8 text-[10px] uppercase font-mono tracking-[0.2em] text-[#00E599]/60 hover:text-[#00E599] transition-colors cursor-pointer"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};
