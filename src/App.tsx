import React, { useState, useEffect, useRef } from 'react';
import { JarCanvas } from './components/3d/JarCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { ExplodedSection } from './components/ExplodedSection';
import { FormulationSection } from './components/FormulationSection';
import { ResearchSection } from './components/ResearchSection';
import { GallerySection } from './components/GallerySection';
import { TeamSection } from './components/TeamSection';
import { ReassemblySection } from './components/ReassemblySection';
import { Footer } from './components/Footer';
import { BottomControlDock } from './components/BottomControlDock';
import { LoadingScreen } from './components/LoadingScreen';
import { ambientSoundscape } from './utils/audioSoundscape';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualExplode, setManualExplode] = useState<number | null>(null);
  const [activeFinish, setActiveFinish] = useState<'sage' | 'rose' | 'ivory'>('sage');
  const [autoRotate, setAutoRotate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<'hero' | 'ingredients' | 'exploded' | 'formulation' | 'reassembly'>('hero');
  const [activeIngredient, setActiveIngredient] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const scrollRef = useRef<number>(0);

  // Subtle ambient nature soundscape initiated on first user gesture
  useEffect(() => {
    let initiated = false;
    const handleFirstInteraction = () => {
      if (initiated) return;
      initiated = true;
      ambientSoundscape.start().then(() => {
        setIsAudioPlaying(ambientSoundscape.getIsPlaying());
      });
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      ambientSoundscape.dispose();
    };
  }, []);

  const handleToggleAudio = () => {
    const active = ambientSoundscape.toggleMute();
    setIsAudioPlaying(active);
  };

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
        scrollRef.current = progress;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section navigation helper
  const scrollToSection = (id: string) => {
    setManualExplode(null); // Return to scroll-driven explosion
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open exploded view helper
  const handleOpenExploded = () => {
    scrollToSection('exploded');
    setManualExplode(0.85);
    setCameraPreset('exploded');
  };

  return (
    <div className="relative min-h-screen bg-[#0A0E0B] text-[#F3F7F4] font-sans selection:bg-[#00E599]/30 selection:text-[#00E599]">
      {/* SOPHISTICATED BOTANICAL LOADING SCREEN */}
      <LoadingScreen onLoaded={() => setIsLoading(false)} />
      {/* 
        PREMIUM DARK NEON BACKGROUND ATMOSPHERE (riy3.com inspiration)
        Deep obsidian canvas illuminated by balanced neon emerald and rose auroras
      */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Neon Emerald Aurora (top-right) */}
        <div className="absolute -top-[20%] -right-[15%] w-[65vw] h-[65vw] rounded-full bg-radial from-[#00E599]/18 via-[#00E599]/5 to-transparent blur-3xl" />
        
        {/* Luminescent Rose Neon Aurora (bottom-left) */}
        <div className="absolute -bottom-[20%] -left-[15%] w-[60vw] h-[60vw] rounded-full bg-radial from-[#FF758F]/14 via-[#FF758F]/4 to-transparent blur-3xl" />

        {/* Soft Champagne Neon Glow (center-right) */}
        <div className="absolute top-[40%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-radial from-[#FFD166]/10 via-transparent to-transparent blur-3xl" />

        {/* Stippled dark grid overlay for editorial digital precision */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#00E599_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* FIXED FULL-SCREEN 3D CANVAS */}
      <div
        className="fixed inset-0 z-0 pointer-events-auto transition-opacity duration-700"
        style={{
          opacity: manualExplode !== null || activeIngredient !== null ? 1 : Math.min(1, Math.max(0, (scrollProgress - 0.05) / 0.10)),
          visibility: (manualExplode !== null || activeIngredient !== null || scrollProgress > 0.05) ? 'visible' : 'hidden',
          pointerEvents: scrollProgress > 0.12 || manualExplode !== null ? 'auto' : 'none',
        }}
      >
        <JarCanvas
          scrollProgress={scrollProgress}
          manualExplodeOverride={manualExplode}
          activeFinish={activeFinish}
          reducedMotion={reducedMotion}
          autoRotate={autoRotate}
          cameraPreset={cameraPreset}
          activeIngredient={activeIngredient}
          onInteractionStart={() => setAutoRotate(false)}
        />
      </div>

      {/* TOP NAVIGATION */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenExploded={handleOpenExploded}
      />

      {/* SCROLLABLE STORYTELLING SECTIONS */}
      <main className="relative z-10">
        {/* 1. Hero Landing Page with Scroll-Unfolding Reveal Video */}
        <HeroSection
          scrollProgress={scrollProgress}
          onExplore={() => scrollToSection('ingredients')}
          onMeetIngredients={() => scrollToSection('ingredients')}
        />

        {/* 2. Botanical Ingredients Reveal (15–35%) */}
        <IngredientsSection
          onHoverIngredient={(id) => setActiveIngredient(id)}
          onSelectIngredient={(id) => setActiveIngredient(id)}
        />

        {/* 3. Exploded Product View (35–55%) */}
        <ExplodedSection
          explodeValue={manualExplode !== null ? manualExplode : Math.max(0, Math.min(1, (scrollProgress - 0.35) / 0.20))}
          onExplodeChange={(val) => setManualExplode(val)}
          onResetExplode={() => setManualExplode(null)}
        />

        {/* 4. Formulation Story (55–70%) */}
        <FormulationSection />

        {/* 5. Research & Observations Journal (70–85%) */}
        <ResearchSection />

        {/* Documentation & Visual Archive */}
        <GallerySection />

        {/* Team Section */}
        <TeamSection />

        {/* 6. Final Reassembly & Brand Reveal (85–100%) */}
        <ReassemblySection
          onExploreFormulation={() => scrollToSection('formulation')}
          onMeetTeam={() => scrollToSection('team')}
          onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* COLLAPSIBLE 3D BOTTOM CONTROL DOCK */}
      <BottomControlDock
        visible={manualExplode !== null || scrollProgress > 0.12}
        explodeValue={manualExplode !== null ? manualExplode : Math.max(0, Math.min(1, (scrollProgress - 0.35) / 0.20))}
        onExplodeChange={(val) => setManualExplode(val)}
        activeFinish={activeFinish}
        onFinishChange={(finish) => setActiveFinish(finish)}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        cameraPreset={cameraPreset}
        onSelectCameraPreset={(preset) => {
          setCameraPreset(preset);
          if (preset === 'exploded') setManualExplode(0.9);
          if (preset === 'hero') setManualExplode(0);
        }}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />
    </div>
  );
}
