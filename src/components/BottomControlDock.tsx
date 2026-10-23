import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCw, Eye, EyeOff, Sliders, Palette, Volume2, VolumeX } from 'lucide-react';

interface BottomControlDockProps {
  explodeValue: number;
  onExplodeChange: (val: number) => void;
  activeFinish: 'sage' | 'rose' | 'ivory';
  onFinishChange: (finish: 'sage' | 'rose' | 'ivory') => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  cameraPreset: 'hero' | 'ingredients' | 'exploded' | 'formulation' | 'reassembly';
  onSelectCameraPreset: (preset: 'hero' | 'ingredients' | 'exploded' | 'formulation' | 'reassembly') => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  visible?: boolean;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  explodeValue,
  onExplodeChange,
  activeFinish,
  onFinishChange,
  autoRotate,
  onToggleAutoRotate,
  cameraPreset,
  onSelectCameraPreset,
  reducedMotion,
  onToggleReducedMotion,
  isAudioPlaying,
  onToggleAudio,
  visible = true,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-[94vw] sm:max-w-2xl transition-all duration-500 ${
        !visible ? 'opacity-0 pointer-events-none translate-y-16' : 'opacity-100 pointer-events-auto'
      } ${collapsed && visible ? 'translate-y-[calc(100%-32px)]' : visible ? 'translate-y-0' : ''}`}
    >
      {/* Collapse / Expand Toggle Tab */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-t-xl bg-[#0E1611] text-[#00E599] text-[10px] uppercase tracking-widest font-mono hover:bg-[#121F17] transition-colors cursor-pointer shadow-[0_0_15px_rgba(0,229,153,0.2)] border-t border-x border-[#00E599]/30"
          aria-label={collapsed ? 'Show 3D Controls' : 'Hide 3D Controls'}
        >
          {collapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-[#00E599]" />
              <span>Show 3D Dock</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 text-[#00E599]" />
              <span>Zen View</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Control Dock in Dark Neon */}
      <div className="bg-[#0E1611]/95 border border-[#00E599]/35 rounded-2xl p-3.5 shadow-[0_4px_40px_rgba(0,0,0,0.8)] backdrop-blur-md text-xs text-[#F3F7F4]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* 1. Explode Slider */}
          <div className="flex items-center space-x-2.5 flex-1 min-w-[200px]">
            <Sliders className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8BDB0]">
              Explode:
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeValue}
              onChange={(e) => onExplodeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#121F17] rounded-lg appearance-none cursor-pointer accent-[#00E599]"
              aria-label="3D Exploded View Depth"
            />
            <span className="font-mono text-[10px] font-bold text-[#00E599] w-8 text-right">
              {Math.round(explodeValue * 100)}%
            </span>
          </div>

          {/* 2. Finish Swatches */}
          <div className="flex items-center space-x-2 border-l border-white/10 pl-3">
            <Palette className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => onFinishChange('sage')}
                title="Sage Classic Finish"
                aria-label="Sage Classic Finish"
                className={`w-5 h-5 rounded-full bg-[#829477] transition-transform cursor-pointer border ${
                  activeFinish === 'sage' ? 'ring-2 ring-[#00E599] scale-110 border-white' : 'border-black/40 opacity-70'
                }`}
              />
              <button
                onClick={() => onFinishChange('rose')}
                title="Frosted Rose Finish"
                aria-label="Frosted Rose Finish"
                className={`w-5 h-5 rounded-full bg-[#FF758F] transition-transform cursor-pointer border ${
                  activeFinish === 'rose' ? 'ring-2 ring-[#FF758F] scale-110 border-white shadow-[0_0_10px_rgba(255,117,143,0.5)]' : 'border-black/40 opacity-70'
                }`}
              />
              <button
                onClick={() => onFinishChange('ivory')}
                title="Pure Ivory Finish"
                aria-label="Pure Ivory Finish"
                className={`w-5 h-5 rounded-full bg-[#F5F1E4] transition-transform cursor-pointer border ${
                  activeFinish === 'ivory' ? 'ring-2 ring-white scale-110 border-black/30' : 'border-black/40 opacity-70'
                }`}
              />
            </div>
          </div>

          {/* 3. Camera Angle Pills */}
          <div className="flex items-center space-x-1 border-l border-white/10 pl-3">
            <button
              onClick={() => onSelectCameraPreset('hero')}
              className={`px-2 py-1 rounded-md text-[10px] font-mono tracking-wider transition-colors cursor-pointer ${
                cameraPreset === 'hero' ? 'bg-[#00E599] text-[#0A0E0B] font-bold' : 'bg-[#121F17] text-[#A8BDB0] hover:text-[#00E599]'
              }`}
            >
              Hero
            </button>
            <button
              onClick={() => onSelectCameraPreset('exploded')}
              className={`px-2 py-1 rounded-md text-[10px] font-mono tracking-wider transition-colors cursor-pointer ${
                cameraPreset === 'exploded' ? 'bg-[#00E599] text-[#0A0E0B] font-bold' : 'bg-[#121F17] text-[#A8BDB0] hover:text-[#00E599]'
              }`}
            >
              Layer
            </button>
            <button
              onClick={() => onSelectCameraPreset('formulation')}
              className={`px-2 py-1 rounded-md text-[10px] font-mono tracking-wider transition-colors cursor-pointer ${
                cameraPreset === 'formulation' ? 'bg-[#00E599] text-[#0A0E0B] font-bold' : 'bg-[#121F17] text-[#A8BDB0] hover:text-[#00E599]'
              }`}
            >
              Top-Down
            </button>
          </div>

          {/* 4. Motion, Auto-spin & Ambient Soundscape Toggles */}
          <div className="flex items-center space-x-2 border-l border-white/10 pl-3">
            <button
              onClick={onToggleAudio}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isAudioPlaying
                  ? 'bg-[#121F17] border-[#00E599] text-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.3)]'
                  : 'bg-[#121F17] border-white/10 text-white/40 hover:text-white'
              }`}
              title={isAudioPlaying ? 'Mute Ambient Nature Soundscape' : 'Enable Subtle Ambient Soundscape (Wind & Leaves)'}
              aria-label={isAudioPlaying ? 'Mute Ambient Soundscape' : 'Enable Ambient Soundscape'}
            >
              {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#00E599]" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onToggleAutoRotate}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                autoRotate
                  ? 'bg-[#121F17] border-[#00E599] text-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.3)]'
                  : 'bg-[#121F17] border-white/10 text-white/40 hover:text-white'
              }`}
              title={autoRotate ? 'Pause 3D Auto-Rotation' : 'Resume 3D Auto-Rotation'}
              aria-label={autoRotate ? 'Pause 3D Auto-Rotation' : 'Resume 3D Auto-Rotation'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
            </button>

            <button
              onClick={onToggleReducedMotion}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                reducedMotion
                  ? 'bg-[#121F17] border-[#00E599] text-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.3)]'
                  : 'bg-[#121F17] border-white/10 text-white/40 hover:text-white'
              }`}
              title={reducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
              aria-label={reducedMotion ? 'Disable reduced motion' : 'Enable reduced motion'}
            >
              {reducedMotion ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
