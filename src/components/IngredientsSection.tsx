import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INGREDIENTS_DATA } from '../utils/formulation';
import { Ingredient } from '../types';
import { Info, Sparkles, X, ChevronRight, Droplets, Leaf, Flower2, CircleDot, ShieldCheck } from 'lucide-react';

interface IngredientsSectionProps {
  onHoverIngredient?: (id: string | null) => void;
  onSelectIngredient?: (id: string | null) => void;
}

const IngredientIcon: React.FC<{ id: string; color: string; isHovered?: boolean }> = ({ id, color, isHovered }) => {
  switch (id) {
    case 'aloe-vera':
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-[#00E599]/30"
          style={{ backgroundColor: '#12251A', color: '#00E599' }}
        >
          <Leaf className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-115 rotate-6' : ''}`} />
        </div>
      );
    case 'rose-water':
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-[#FF758F]/40"
          style={{ backgroundColor: '#261218', color: '#FF758F' }}
        >
          <Flower2 className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-115 rotate-12' : ''}`} />
        </div>
      );
    case 'glycerin':
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-[#FFD166]/30"
          style={{ backgroundColor: '#241E12', color: '#FFD166' }}
        >
          <Droplets className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-115' : ''}`} />
        </div>
      );
    case 'coconut-oil':
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-[#E8DCC4]/30"
          style={{ backgroundColor: '#201D17', color: '#E8DCC4' }}
        >
          <CircleDot className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-115' : ''}`} />
        </div>
      );
    case 'distilled-water':
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-[#48CAE4]/30"
          style={{ backgroundColor: '#0F2026', color: '#48CAE4' }}
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-115' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
      );
    case 'vitamin-e':
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-[#F4A261]/30"
          style={{ backgroundColor: '#261B0F', color: '#F4A261' }}
        >
          <Sparkles className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'scale-115 rotate-45' : ''}`} />
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-full bg-[#121F17] text-[#00E599] flex items-center justify-center">
          <Leaf className="w-4 h-4" />
        </div>
      );
  }
};

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  onHoverIngredient,
  onSelectIngredient,
}) => {
  const [selectedId, setSelectedId] = useState<string>(INGREDIENTS_DATA[0].id);
  const [forefrontId, setForefrontId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedIngredient = INGREDIENTS_DATA.find((i) => i.id === selectedId) || INGREDIENTS_DATA[0];
  const forefrontIngredient = INGREDIENTS_DATA.find((i) => i.id === forefrontId);

  const handleCardClick = (id: string) => {
    if (forefrontId === id) {
      setForefrontId(null);
      onSelectIngredient?.(null);
    } else {
      setSelectedId(id);
      setForefrontId(id);
      onSelectIngredient?.(id);
    }
  };

  const handleCloseForefront = () => {
    setForefrontId(null);
    onSelectIngredient?.(null);
  };

  return (
    <section id="ingredients" className="min-h-screen py-24 relative z-10 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="max-w-2xl">
          {/* Section Header */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121F17] border border-[#00E599]/40 mb-3 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-mono font-medium">
                02 / 07 Botanical Matrix
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F7F4] leading-tight mb-3">
              Six Pure Elements. <br />
              <span className="italic font-light text-[#00E599] drop-shadow-[0_0_20px_rgba(0,229,153,0.35)]">
                Recorded with Precision.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A8BDB0] font-sans leading-relaxed">
              Hover over an ingredient to observe its gentle botanical pulse. Click any card to animate it to the forefront for in-depth laboratory quantities and dermatological insights.
            </p>
          </div>

          {/* 6 Interactive Ingredient Cards Grid with Dark Neon Styling */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 relative">
            {INGREDIENTS_DATA.map((item, idx) => {
              const isSelected = item.id === selectedId;
              const isHovered = hoveredId === item.id;
              const isForefront = forefrontId === item.id;

              return (
                <motion.div
                  key={item.id}
                  layoutId={`ingredient-card-${item.id}`}
                  whileHover={{
                    scale: 1.045,
                    y: -4,
                    transition: { type: 'spring', stiffness: 400, damping: 20 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => {
                    setHoveredId(item.id);
                    onHoverIngredient?.(item.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    onHoverIngredient?.(null);
                  }}
                  onClick={() => handleCardClick(item.id)}
                  className={`text-left p-4 rounded-2xl border cursor-pointer relative overflow-hidden transition-all duration-300 select-none ${
                    isSelected
                      ? 'bg-[#142319] border-[#00E599] shadow-[0_0_25px_rgba(0,229,153,0.3)] ring-1 ring-[#00E599]/40'
                      : 'bg-[#0E1611]/85 hover:bg-[#121E16] border-[#00E599]/20 hover:border-[#00E599]/50 shadow-sm'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect ${item.name}, ${item.quantity}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(item.id);
                    }
                  }}
                >
                  {/* Neon Glow on hover */}
                  <motion.div
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl pointer-events-none"
                    animate={{
                      opacity: isHovered || isSelected ? 0.35 : 0.08,
                      scale: isHovered ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ backgroundColor: item.color }}
                  />

                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-2">
                    <IngredientIcon id={item.id} color={item.color} isHovered={isHovered} />
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#121F17] text-[#00E599] border border-[#00E599]/30 font-mono tracking-tight shadow-xs">
                      {item.quantity}
                    </span>
                  </div>

                  <h3 className="font-serif text-base text-[#F3F7F4] leading-snug mb-0.5 font-medium group-hover:text-[#00E599] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-[10px] italic text-[#A6BFB0] line-clamp-1 font-serif mb-2">
                    {item.botanicalName}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#00E599] pt-1.5 border-t border-[#00E599]/15">
                    <span className="font-mono text-[#A8BDB0]">0{idx + 1}</span>
                    <span className="flex items-center text-[9px] uppercase tracking-wider font-semibold opacity-85">
                      {isForefront ? 'Close' : 'Details'} <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Spotlight Card in Dark Mode */}
          {!forefrontId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0E1611]/90 border border-[#00E599]/30 rounded-2xl p-5 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#00E599]/20 mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#FF758F]" />
                  <span className="text-xs uppercase font-mono tracking-[0.14em] text-[#00E599] font-semibold">
                    Formula Focus: {selectedIngredient.name}
                  </span>
                </div>
                <button
                  onClick={() => handleCardClick(selectedIngredient.id)}
                  className="text-[11px] font-mono text-[#00E599] hover:text-[#2CEAA3] flex items-center space-x-1 cursor-pointer"
                >
                  <span>Animate to Forefront</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                <div className="p-2.5 rounded-xl bg-[#121F17] border border-[#00E599]/20">
                  <span className="text-[10px] uppercase font-semibold text-[#00E599] block mb-0.5">
                    Formulation Role
                  </span>
                  <span className="font-medium text-[#F3F7F4]">
                    {selectedIngredient.role}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121F17] border border-[#00E599]/20">
                  <span className="text-[10px] uppercase font-semibold text-[#00E599] block mb-0.5">
                    Botanical Origin
                  </span>
                  <span className="font-medium text-[#F3F7F4] italic font-serif">
                    {selectedIngredient.botanicalName}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#A8BDB0] leading-relaxed mb-3">
                {selectedIngredient.description}
              </p>

              <div className="p-3 rounded-xl bg-[#121F17] border border-[#00E599]/30 flex items-start space-x-2.5 text-xs text-[#A8BDB0]">
                <Info className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong className="text-[#F3F7F4]">Scientific Context:</strong> {selectedIngredient.scientificInsight}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Forefront Modal in Dark Mode */}
      <AnimatePresence>
        {forefrontIngredient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseForefront}
              className="absolute inset-0 bg-[#0A0E0B]/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              layoutId={`ingredient-card-${forefrontIngredient.id}`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0E1611] border border-[#00E599]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,229,153,0.25)] backdrop-blur-md overflow-hidden text-left z-10"
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: forefrontIngredient.color }}
              />

              <button
                onClick={handleCloseForefront}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#121F17] text-[#00E599] hover:bg-[#00E599] hover:text-[#0A0E0B] transition-all cursor-pointer border border-[#00E599]/30"
                aria-label="Return to grid"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <IngredientIcon id={forefrontIngredient.id} color={forefrontIngredient.color} isHovered={true} />
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#00E599] block font-semibold">
                    Botanical Constituent
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#121F17] text-[#00E599] border border-[#00E599]/30 inline-block mt-0.5">
                    Batch Record: {forefrontIngredient.quantity}
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#F3F7F4] leading-tight mb-1">
                {forefrontIngredient.name}
              </h3>
              <p className="text-sm italic font-serif text-[#00E599] mb-6">
                {forefrontIngredient.botanicalName}
              </p>

              <div className="p-4 rounded-2xl bg-[#121F17] border border-[#00E599]/20 mb-5">
                <span className="text-[11px] uppercase font-semibold text-[#00E599] tracking-wider block mb-1">
                  Primary Functional Role
                </span>
                <p className="text-sm font-medium text-[#F3F7F4]">
                  {forefrontIngredient.role}
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#A8BDB0] leading-relaxed mb-6">
                <div>
                  <h4 className="font-semibold text-[#F3F7F4] mb-1">Botanical Profile:</h4>
                  <p>{forefrontIngredient.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#F3F7F4] mb-1">Research Insight:</h4>
                  <p>{forefrontIngredient.scientificInsight}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-[#00E599]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Preserved unit: <strong>{forefrontIngredient.unit}</strong></span>
                </div>

                <button
                  onClick={handleCloseForefront}
                  className="px-5 py-2.5 rounded-full bg-[#00E599] text-[#0A0E0B] text-xs font-mono uppercase tracking-[0.14em] font-semibold hover:bg-[#2CEAA3] transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,153,0.3)]"
                >
                  Return to Grid
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
