import { Ingredient, ResearchPaper, ObservationEntry, FormulationStep } from '../types';

export const INGREDIENTS_DATA: Ingredient[] = [
  {
    id: 'aloe-vera',
    name: 'Aloe Vera Gel',
    botanicalName: 'Aloe barbadensis Miller',
    quantity: '20 g',
    numericValue: 20,
    unit: 'g',
    role: 'Primary Hydrating & Soothing Matrix',
    color: '#829477',
    description: 'Fresh, clear mucilaginous gel derived from inner leaf parenchyma. Rich in polymannans and acemannan.',
    scientificInsight: 'Known in dermatological literature for humectant and skin barrier support properties without greasy residue.',
    imageAlt: 'Succulent fresh cut aloe vera leaf showing crystalline hydrogel'
  },
  {
    id: 'rose-water',
    name: 'Rose Water',
    botanicalName: 'Rosa damascena distillate',
    quantity: '25 ml',
    numericValue: 25,
    unit: 'ml',
    role: 'Aromatic & Toning Floral Hydrosol',
    color: '#D9A7A0',
    description: 'Gentle steam-distilled hydrosol from hand-harvested petals providing delicate botanical scent and gentle astringency.',
    scientificInsight: 'Floral distillates contain volatile bioflavonoids that impart natural aroma while maintaining skin pH harmony.',
    imageAlt: 'Delicate pink rose petals resting beside pure crystal water'
  },
  {
    id: 'glycerin',
    name: 'Glycerin',
    botanicalName: 'Vegetable glycerol (1,2,3-propanetriol)',
    quantity: '4 ml',
    numericValue: 4,
    unit: 'ml',
    role: 'Hygroscopic Humectant',
    color: '#D9C6A0',
    description: 'High-purity botanical trivalent alcohol that draws and binds ambient atmospheric moisture to the stratum corneum.',
    scientificInsight: 'Extensively documented to facilitate aquaporin-3 water channels and accelerate barrier recovery.',
    imageAlt: 'Viscous glistening drop of vegetable glycerin'
  },
  {
    id: 'coconut-oil',
    name: 'Coconut Oil',
    botanicalName: 'Cocos nucifera (cold-pressed virgin)',
    quantity: '5 ml',
    numericValue: 5,
    unit: 'ml',
    role: 'Emollient Lipid Barrier',
    color: '#E8DCC4',
    description: 'Virgin unrefined cold-pressed lipid phase rich in medium-chain fatty acids, predominantly lauric acid (C12).',
    scientificInsight: 'Forms an occlusive lipid film that reduces transepidermal water loss (TEWL) and softens dry skin patches.',
    imageAlt: 'Pure silky virgin coconut oil with natural pearlescence'
  },
  {
    id: 'distilled-water',
    name: 'Distilled Water',
    botanicalName: 'Aqua purificata (deionized carrier)',
    quantity: '10 g',
    numericValue: 10,
    unit: 'g',
    role: 'Solvent & Viscosity Balance',
    color: '#B8C9C1',
    description: 'Multi-stage demineralized water ensuring zero mineral interference or microbial contaminants in formulation.',
    scientificInsight: 'Serves as the continuous aqueous vehicle enabling uniform dispersion of aloe polysaccharides and glycerin.',
    imageAlt: 'Crystal clear droplet of purified distilled water'
  },
  {
    id: 'vitamin-e',
    name: 'Vitamin E',
    botanicalName: 'd-alpha-Tocopherol',
    quantity: '2 capsules',
    numericValue: 2,
    unit: 'capsules',
    role: 'Antioxidant & Lipid Protector',
    color: '#E4A853',
    description: 'Pure oil-soluble tocopherol antioxidant protecting unsaturated lipid components against auto-oxidation.',
    scientificInsight: 'Acts as a chain-breaking peroxyl radical scavenger, helping maintain lipid stability over time.',
    imageAlt: 'Golden translucent Vitamin E liquid capsule catching morning sunlight'
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'loden-2001',
    citation: 'Lodén & Wessman (2001)',
    authors: 'Lodén, M. & Wessman, W.',
    year: 2001,
    title: 'The influence of a cream containing 20% glycerin and its vehicle on skin barrier properties',
    journal: 'International Journal of Cosmetic Science, 23(2), 115–119',
    focusIngredient: 'Glycerin',
    summary: 'Demonstrated that glycerin-enriched topical formulations improve stratum corneum hydration and accelerate restoration of compromised skin barrier integrity.',
    doiUrl: 'https://doi.org/10.1046/j.1467-2494.2001.00060.x',
    keyFinding: 'Measurable reduction in transepidermal water loss (TEWL) and enhanced skin softness.'
  },
  {
    id: 'dalbelo-2006',
    citation: "Dal'Belo, Gaspar & Maia Campos (2006)",
    authors: "Dal'Belo, C. A., Gaspar, L. R., & Maia Campos, P. M.",
    year: 2006,
    title: 'Moisturizing effect of cosmetic formulations containing Aloe vera extract in different concentrations assessed by skin bioengineering techniques',
    journal: 'Skin Research and Technology, 12(4), 241–246',
    focusIngredient: 'Aloe Vera Gel',
    summary: 'Evaluated the moisturization efficacy of aloe extract in topical vehicles using corneometry, confirming significant improvement in skin water content.',
    doiUrl: 'https://doi.org/10.1111/j.0909-752X.2006.00155.x',
    keyFinding: 'Dose-dependent increase in skin hydration without epidermal irritation.'
  },
  {
    id: 'agero-2004',
    citation: 'Agero & Verallo-Rowell (2004)',
    authors: 'Agero, A. L. & Verallo-Rowell, V. M.',
    year: 2004,
    title: 'A randomized double-blind controlled trial comparing extra virgin coconut oil with mineral oil as a moisturizer for mild to moderate xerosis',
    journal: 'Dermatitis, 15(3), 109–116',
    focusIngredient: 'Coconut Oil',
    summary: 'Clinical study verifying virgin coconut oil as an effective and safe moisturizer, showing superior improvement in skin surface lipid levels.',
    doiUrl: 'https://doi.org/10.2310/6620.2004.04006',
    keyFinding: 'Significant improvement in skin hydration and lipid barrier function.'
  },
  {
    id: 'fox-2014',
    citation: 'Fox et al. (2014)',
    authors: 'Fox, L. T., Gerber, M., du Plessis, J., & Hamman, J. H.',
    year: 2014,
    title: 'Transdermal drug delivery enhancement by Aloe vera: A review and comparison of skin hydration effects',
    journal: 'Pharmacognosy Magazine, 10(Suppl 2), S392–S403',
    focusIngredient: 'Aloe Vera Gel',
    summary: 'Comprehensive review analyzing the biophysical mechanisms through which aloe vera polysaccharides retain moisture in the stratum corneum.',
    doiUrl: 'https://doi.org/10.4103/0973-1296.133290',
    keyFinding: 'Polysaccharide network retains water and exhibits protective anti-erythema properties.'
  },
  {
    id: 'fluhr-2008',
    citation: 'Fluhr, Darlenski & Surber (2008)',
    authors: 'Fluhr, J. W., Darlenski, R., & Surber, C.',
    year: 2008,
    title: 'Glycerol and the skin: holistic approach to its multifarious actions',
    journal: 'British Journal of Dermatology, 159(1), 23–34',
    focusIngredient: 'Glycerin',
    summary: 'Detailed physiological review detailing how glycerol facilitates stratum corneum lipid lamellae organization and epidermal water retention.',
    doiUrl: 'https://doi.org/10.1111/j.1365-2133.2008.08643.x',
    keyFinding: 'Glycerol is critical for epidermal plasticity, desquamation, and barrier repair.'
  }
];

export const DEFAULT_FORMULATION_STEPS: FormulationStep[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'Measure the ingredients',
    description: 'Precision measurement of Aloe vera gel (20 g), Rose water (25 ml), Glycerin (4 ml), Coconut oil (5 ml), Distilled water (10 g), and 2 capsules of Vitamin E using clean laboratory instruments.',
    duration: '10 mins',
    criticalNotes: 'Ensure separate glass beakers to prevent premature cross-phase contact before emulsification.'
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'Combine the ingredients',
    description: 'First blend the aqueous phase (Distilled water, Rose water, Glycerin) with Aloe vera gel, then introduce the warm melted coconut oil and freshly opened Vitamin E oil droplet by droplet.',
    duration: '15 mins',
    criticalNotes: 'Keep coconut oil gently warmed to ~28°C so it remains liquid during initial dispersion.'
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: 'Mix the experimental batch',
    description: 'Continuous controlled manual and shear whisking to form a smooth, uniform, whipped emulsion until a creamy, glossy off-white texture is achieved.',
    duration: '20 mins',
    criticalNotes: 'Aerate gently to create a featherlight mousse feel without excessive bubble entrapment.'
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: 'Record observations',
    description: 'Transfer freshly whipped Rosevera cream into sanitized frosted jars. Document initial appearance, scent profile, tactile absorption, and check stability after 24 hours, 7 days, and 14 days.',
    duration: 'Ongoing',
    criticalNotes: 'Preserve samples in amber glass at room temperature away from direct sunlight.'
  }
];

export const INITIAL_OBSERVATIONS: ObservationEntry[] = [
  {
    id: 'obs-001',
    date: '2026-10-18',
    batchNumber: 'BATCH-RV-01',
    appearance: 'Smooth, light whipped cream with soft natural sheen',
    colour: 'Ivory / pale pearl blush with botanical undertone',
    texture: 'Velvety, lightweight, fast-melting upon skin contact',
    consistency: 'Semi-viscous whipped lotion, holds soft peaks',
    separation: 'None observed at 24 hours; stable emulsion',
    odour: 'Delicate floral damask rose with subtle fresh aloe freshness',
    notes: 'Initial test batch created in clean lab setting. Absorbs within 45 seconds without sticky film.',
    recorder: 'Siddhi Dhokale'
  },
  {
    id: 'obs-002',
    date: '2026-10-21',
    batchNumber: 'BATCH-RV-01',
    appearance: 'Uniform homogeneous surface, no syneresis',
    colour: 'Consistent pale ivory, no discoloration',
    texture: 'Smooth and silky, cooling on application',
    consistency: 'Stable viscosity maintained at 22°C ambient',
    separation: 'Zero phase separation or oil weeping observed',
    odour: 'Pleasant gentle rose aroma remains fresh and subtle',
    notes: 'Day 3 stability check. Hydration feeling noted immediately on patch area.',
    recorder: 'Vaishnavi Kadam'
  }
];

/**
 * Validates an observation journal entry
 */
export function validateObservationEntry(entry: Partial<ObservationEntry>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!entry.date || entry.date.trim() === '') errors.push('Date is required.');
  if (!entry.appearance || entry.appearance.trim() === '') errors.push('Appearance description is required.');
  if (!entry.colour || entry.colour.trim() === '') errors.push('Colour observation is required.');
  if (!entry.texture || entry.texture.trim() === '') errors.push('Texture observation is required.');
  if (!entry.recorder || entry.recorder.trim() === '') errors.push('Recorder name is required.');
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Scales batch ingredient quantities while preserving exact distinct units
 */
export function scaleBatchQuantities(multiplier: number): Array<{ id: string; name: string; quantity: string; originalUnit: string }> {
  const safeMultiplier = Math.max(0.5, Math.min(10, multiplier));
  return INGREDIENTS_DATA.map((item) => {
    const scaledVal = item.numericValue * safeMultiplier;
    // Format nicely
    const formatted = Number.isInteger(scaledVal) ? scaledVal.toString() : scaledVal.toFixed(1);
    return {
      id: item.id,
      name: item.name,
      quantity: `${formatted} ${item.unit}`,
      originalUnit: item.unit
    };
  });
}

/**
 * Math helpers
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Maps global scroll progress (0.0 to 1.0) to specific section progress (0.0 to 1.0)
 */
export function getSectionProgress(scrollProgress: number, start: number, end: number): number {
  if (scrollProgress <= start) return 0;
  if (scrollProgress >= end) return 1;
  return (scrollProgress - start) / (end - start);
}
