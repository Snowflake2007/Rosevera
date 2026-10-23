# Rosevera Moisturizer — Botanical Skincare 🌸✨

An interactive, cinematic 3D scrollytelling luxury skincare web showcase featuring the Rosevera Botanical Moisturizer. Built with React 19, Three.js, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🌟 Features

- **Interactive 3D Experience (Three.js)**:
  - Real-time procedural rendering with realistic glass, cream suspension, and brushed metal finishes.
  - Interactive camera angles, auto-rotation, and orbit controls.
  - Exploded-view animation demonstrating product construction and layered formulation.
  - 3 luxury aesthetic finishes: *Sage Mist*, *Rose Petal*, and *Ivory Cloud*.
- **Scrollytelling Journey**:
  - Seamless scroll-driven storytelling through Hero, Bioactive Ingredients, Exploded Anatomy, Formulation Lab, Clinical Research, and Artisan Gallery.
- **Interactive Formulation Lab**:
  - Live bioactive concentration adjustments (Damask Rose distillate, Plant Squalane, Ceramide NP, Sea Buckthorn, Centella Asiatica) with real-time efficacy metrics calculation.
- **Ambient Soundscape**:
  - Subtle spatial nature audio synthesized via Web Audio API, responsive to user interaction.
- **Modern Performance & Stack**:
  - React 19 + TypeScript + Vite 8
  - Tailwind CSS v4 + Motion (Framer Motion)
  - Full mobile responsiveness & reduced-motion accessibility mode

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/rosevera-skincare.git
   cd rosevera-skincare
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Deployment

### Build for Production
```bash
npm run build
```
Output will be generated in the `dist/` directory.

### Deploy to Vercel
This repository is pre-configured with `vercel.json` and `.npmrc`:
1. Push to GitHub.
2. Import the repository on [Vercel](https://vercel.com/new).
3. Click **Deploy** (framework and output directory are auto-detected).

---

## 📂 Project Structure

```text
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── 3d/             # Three.js 3D Jar model and procedural shaders
│   │   ├── BottomControlDock.tsx
│   │   ├── ExplodedSection.tsx
│   │   ├── FormulationSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── IngredientsSection.tsx
│   │   ├── ResearchSection.tsx
│   │   └── ...
│   ├── utils/              # Soundscape audio engine & formulation calculators
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main scrollytelling composition
│   └── main.tsx            # Application entrypoint
├── vercel.json             # Vercel deployment configuration
├── .npmrc                  # Dependency resolution settings
└── vite.config.ts          # Vite configuration
```

---
