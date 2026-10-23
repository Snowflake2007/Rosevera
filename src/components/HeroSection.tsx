import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Compass, Droplets, ChevronDown, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface HeroSectionProps {
  scrollProgress: number;
  onExplore: () => void;
  onMeetIngredients: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollProgress,
  onExplore,
  onMeetIngredients,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handled silently for autoplay policies
      });
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Scroll expansion factor (0 to 1 as scrollProgress goes from 0 to 0.15)
  const expandProgress = Math.min(1, Math.max(0, scrollProgress / 0.12));
  // Scale from 0.88 to 1.0, border radius from 2rem to 1rem
  const videoScale = 0.88 + expandProgress * 0.12;
  const videoBorderRadius = `${Math.max(12, 32 - expandProgress * 20)}px`;

  return (
    <section id="hero" className="min-h-screen relative flex flex-col items-center justify-start pt-28 pb-16 px-4 sm:px-6">
      {/* Top Editorial Headline (riy3.com style minimal dark typography) */}
      <div className="max-w-4xl w-full text-center mb-8 relative z-20">
        {/* Neon Chapter Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#121F17] border border-[#00E599]/40 mb-6 shadow-[0_0_20px_rgba(0,229,153,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-mono font-medium">
            01 / 07 Prologue
          </span>
          <span className="text-[#00E599]/40">•</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A6BFB0] font-sans">
            Botanical Skincare Reveal
          </span>
        </div>

        {/* Hero Title with Neon Rose and Soft Glow */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F3F7F4] leading-[1.08] tracking-tight mb-4">
          Nature, <span className="italic font-light text-[#FF758F] drop-shadow-[0_0_25px_rgba(255,117,143,0.4)]">Refined</span> into Skincare.
        </h1>

        <p className="text-sm sm:text-base text-[#A8BDB0] max-w-xl mx-auto font-sans font-light leading-relaxed mb-6">
          Scroll down to unfold the Rosevera moisturizer reveal. Experience Damascus rose hydrosol, fresh aloe vera mucilage, and biomimetic lipids in motion.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExplore}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#00E599] text-[#0A0E0B] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#2CEAA3] transition-all duration-300 shadow-[0_0_25px_rgba(0,229,153,0.4)] cursor-pointer"
          >
            <span>Unfold Experience</span>
            <Compass className="w-3.5 h-3.5 text-[#0A0E0B]" />
          </button>

          <button
            onClick={onMeetIngredients}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#121A14]/80 border border-[#00E599]/30 text-[#E5F0E8] text-xs uppercase tracking-[0.16em] font-medium hover:border-[#00E599] hover:bg-[#16221A] transition-all duration-300 cursor-pointer"
          >
            <Droplets className="w-3.5 h-3.5 text-[#00E599]" />
            <span>Meet 6 Botanicals</span>
          </button>
        </div>
      </div>

      {/* 
        HERO LANDING CINEMATIC VIDEO PORTAL (riy3.com Reference)
        Appears directly on the landing page and opens/unfolds as the user scrolls down!
      */}
      <div className="w-full max-w-5xl relative z-10 my-4 flex flex-col items-center">
        <div
          className="relative w-full aspect-16/9 overflow-hidden transition-all duration-500 shadow-[0_0_60px_-10px_rgba(0,229,153,0.25)] border border-[#00E599]/35 group cursor-pointer"
          style={{
            transform: `scale(${videoScale})`,
            borderRadius: videoBorderRadius,
          }}
          onClick={togglePlay}
        >
          {/* Neon Border Glow */}
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-[#00E599]/40 opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Video Element */}
          <video
            ref={videoRef}
            src="/assets/aistudio/Rosovera_mp4_e1f41069.mp4"
            loop
            muted={isMuted}
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />

          {/* Ambient Dark Gradient Vignette for Editorial Depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0E0B]/80 via-transparent to-transparent opacity-60" />

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 z-20 pointer-events-auto">
            <div className="flex items-center space-x-3 bg-[#0A0E0B]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <button
                onClick={togglePlay}
                className="hover:text-[#00E599] transition-colors flex items-center space-x-1.5 cursor-pointer"
                aria-label={isPlaying ? 'Pause Reveal Video' : 'Play Reveal Video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#00E599]" />}
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  {isPlaying ? 'Pause' : 'Play Reveal'}
                </span>
              </button>

              <span className="text-white/20">|</span>

              <button
                onClick={toggleAudio}
                className="hover:text-[#00E599] transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/60" /> : <Volume2 className="w-3.5 h-3.5 text-[#00E599]" />}
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-2 bg-[#0A0E0B]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#00E599]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#00E599]" />
              <span className="text-[10px] font-mono tracking-widest text-[#00E599] uppercase">
                Official Cinematic Reveal
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="mt-8 flex flex-col items-center cursor-pointer animate-bounce">
          <button
            onClick={onExplore}
            className="flex flex-col items-center text-[#A6BFB0] hover:text-[#00E599] transition-colors"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] font-mono mb-1 text-[#00E599]">
              Scroll to Unfold Content
            </span>
            <ChevronDown className="w-4 h-4 text-[#00E599]" />
          </button>
        </div>
      </div>
    </section>
  );
};
