# 🔮 SYNCHRONIC INTELLIGENCE PLATFORM - MASTER DOCUMENT
> **Last Updated**: February 3, 2026  
> **Version**: 2.1.0 (Place Energy Release)  
> **Repository**: https://github.com/richjunior/astrology

---

## 📋 TABLE OF CONTENTS

1. [Vision & Strategy](#vision--strategy)
2. [Project Status](#project-status)
3. [Architecture Overview](#architecture-overview)
4. [Core Engines](#core-engines)
5. [API Specification](#api-specification)
6. [Database & Data Layer](#database--data-layer)
7. [UI/UX Design System](#uiux-design-system)
8. [Page Routes](#page-routes)
9. [Components](#components)
10. [Development Workflow](#development-workflow)
11. [Deployment](#deployment)
12. [Roadmap](#roadmap)
13. [Technical Reference](#technical-reference)

---

## 🎯 VISION & STRATEGY

### Platform Vision
Synchronic Intelligence represents a shift from generalized spiritual entertainment to **high-precision life management**. It converges metaphysical calculations (astrology, numerology) with real-time personal data to optimize the present moment.

### Core Principles
| Principle | Implementation |
|-----------|----------------|
| **Privacy-First** | No data storage, no accounts, no tracking |
| **Zero-Cost** | All engines run locally, no paid APIs |
| **Multi-Tradition** | Western, Vedic, Chinese, and Western systems |
| **Mobile-Ready** | Pure TypeScript engines reusable in React Native |

### Target Modalities (13 Total)
| # | Modality | Status | Engine |
|---|----------|--------|--------|
| 1 | Western Numerology | ✅ Complete | Custom TS |
| 2 | Western Astrology | ✅ Complete | Custom TS |
| 3 | Vedic Astrology | ✅ Complete | Sidereal TS |
| 4 | Chinese Zodiac | ✅ Complete | Custom TS |
| 5 | I Ching | ✅ Complete | Custom TS |
| 6 | Tarot | ✅ Complete | tarotapi.dev |
| 7 | BaZi (Four Pillars) | ⏳ Planned | - |
| 8 | Human Design | ⏳ Planned | - |
| 9 | Kabbalistic Astrology | ⏳ Planned | - |
| 10 | Feng Shui | ⏳ Planned | - |
| 11 | Palmistry | ⏳ Planned | - |
| 12 | Solar/Progressed Astrology | ⏳ Planned | - |
| 13 | Jungian Archetypes | ⏳ Planned | - |

---

## 📊 PROJECT STATUS

### Current Phase: 2.1 (Place Energy Integration) ✅

| Milestone | Status | Date |
|-----------|--------|------|
| Phase 1: Numerology Core | ✅ Complete | Jan 2026 |
| Phase 2: Multi-Modal Engines | ✅ Complete | Feb 2026 |
| Phase 2.1: Place Energy | ✅ Complete | Feb 3, 2026 |
| Phase 3: AI Integration | 🏗️ In Progress | - |

### Feature Matrix

| Feature | Numerology | Astrology | Chinese | I Ching | Tarot |
|---------|------------|-----------|---------|---------|-------|
| Core Calculations | ✅ | ✅ | ✅ | ✅ | ✅ |
| API Endpoint | ✅ | ✅ | ✅ | ✅ | ✅ |
| UI Page | ✅ | ✅ | ✅ | ✅ | ✅ |
| Location Integration | ✅ | ✅ | ❌ | ❌ | ❌ |
| Birth Time Support | ✅ | ✅ | ❌ | ❌ | ❌ |
| Detailed Interpretations | ✅ | ⚠️ Partial | ✅ | ✅ | ✅ |

---

## 🏗️ ARCHITECTURE OVERVIEW

### Technology Stack
```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                                │
├─────────────────────────────────────────────────────────────┤
│  Next.js 15+  │  React 19  │  TypeScript  │  CSS Custom     │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      API LAYER                               │
├─────────────────────────────────────────────────────────────┤
│  /api/numerology  │  /api/astrology  │  /api/chinese-zodiac │
│  /api/iching      │  /api/tarot      │  /api/geocode        │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    CALCULATION ENGINES                       │
├─────────────────────────────────────────────────────────────┤
│  src/lib/numerology  │  src/lib/astrology                   │
│  src/lib/chinese-zodiac  │  src/lib/iching  │  src/lib/tarot│
└─────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      DATA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  src/data/cities.json (33k cities)                          │
│  Engine constants (interpretations, meanings)               │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure
```
numerology-mvp/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── numerology/    # POST /api/numerology
│   │   │   ├── astrology/     # POST /api/astrology
│   │   │   ├── chinese-zodiac/# POST /api/chinese-zodiac
│   │   │   ├── iching/        # POST /api/iching
│   │   │   ├── tarot/         # POST /api/tarot
│   │   │   └── geocode/       # GET /api/geocode?q=city
│   │   ├── astrology/         # /astrology page
│   │   ├── chinese-zodiac/    # /chinese-zodiac page
│   │   ├── iching/            # /iching page
│   │   ├── tarot/             # /tarot page
│   │   ├── globals.css        # Design system
│   │   ├── layout.tsx         # Root layout + nav
│   │   └── page.tsx           # Home (Numerology)
│   │
│   ├── components/            # Reusable components
│   │   ├── LocationSearch.tsx # City autocomplete
│   │   └── Navigation.tsx     # Tab navigation
│   │
│   ├── data/                  # Static data
│   │   └── cities.json        # 33,000 cities from GeoNames
│   │
│   └── lib/                   # Calculation engines
│       ├── numerology/        # 7 files, 597 lines
│       ├── astrology/         # 4 files, 498 lines
│       ├── chinese-zodiac/    # 2 files
│       ├── iching/            # 2 files
│       └── tarot/             # 2 files
│
├── scripts/                   # Utility scripts
│   └── process-cities.mjs     # GeoNames processor
│
├── public/                    # Static assets
├── package.json
├── tsconfig.json
└── MASTER_DOCUMENT.md         # This file
```

---

## ⚙️ CORE ENGINES

### 1. Numerology Engine (`src/lib/numerology/`)

**Files**: `types.ts`, `constants.ts`, `calculator.ts`, `interpretations.ts`, `index.ts`

#### Types
```typescript
interface NumerologyProfile {
  lifePath: NumerologyNumber;
  expression: NumerologyNumber;
  soulUrge: NumerologyNumber;
  personality: NumerologyNumber;
  personalYear: NumerologyNumber;
  personalMonth: NumerologyNumber;
  personalDay: NumerologyNumber;
  pinnacles: Pinnacle[];
  challenges: NumerologyNumber[];
  birthday: NumerologyNumber;
  maturity: NumerologyNumber;
  karmic: KarmicInfo;
  placeEnergy?: PlaceEnergy;  // NEW in 2.1
}

interface PlaceEnergy {
  placeName: string;
  coordinates: { latitude: number; longitude: number };
  timezone: string;
  placeVibration: NumerologyNumber;
  geographicResonance: NumerologyNumber;
  timezoneInfluence: NumerologyNumber;
  compatibility: {
    score: number;
    rating: 'excellent' | 'good' | 'neutral' | 'challenging';
    description: string;
  };
}

interface UserBirthData {
  fullName: string;
  birthDate: Date;
  birthTime?: string;
  birthPlace?: string;
  location?: {
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
}
```

#### Core Functions (36 total)
| Category | Functions |
|----------|-----------|
| **Utility** | `reduceToSingleDigit`, `sumDigits`, `stringToNumber`, `isMasterNumber`, `isKarmicDebt`, `getNumberMeaning`, `createNumerologyNumber` |
| **Core Numbers** | `calculateLifePath`, `calculateExpression`, `calculateSoulUrge`, `calculatePersonality`, `calculateBirthday`, `calculateMaturity` |
| **Timing Cycles** | `calculatePersonalYear`, `calculatePersonalMonth`, `calculatePersonalDay`, `calculateUniversalYear`, `calculateUniversalMonth`, `calculateUniversalDay` |
| **Life Phases** | `calculatePinnacles`, `calculateChallenges` |
| **Karmic** | `calculateKarmicInfo` |
| **Place Energy** | `calculatePlaceVibration`, `calculateGeographicResonance`, `calculateTimezoneInfluence`, `calculatePlaceCompatibility`, `calculatePlaceEnergy` |
| **Complete** | `calculateFullProfile`, `generateDailyReading` |

---

### 2. Astrology Engine (`src/lib/astrology/`)

**Files**: `types.ts`, `constants.ts`, `calculator.ts`, `index.ts`

#### Capabilities
- **Natal Charts**: 10 planets (Sun through Pluto + Nodes)
- **House Systems**: Placidus, Koch, Equal, Whole Sign, Porphyry, Regiomontanus, Campanus, Morinus, Alcabitius
- **Aspects**: Conjunction, Opposition, Trine, Square, Sextile, Quincunx, Semi-sextile
- **Vedic Mode**: Lahiri Ayanamsa, Nakshatras, Sidereal zodiac
- **Transits**: Real-time planetary positions vs natal

#### Core Functions (13 total)
| Function | Purpose |
|----------|---------|
| `dateToJulianDay` | Date conversion |
| `julianDayToDate` | Reverse conversion |
| `getZodiacSign` | Longitude to sign |
| `getSignDegree` | Degree within sign |
| `getHouseNumber` | Longitude to house |
| `calculateAspect` | Aspect between planets |
| `calculatePlanetPositions` | VSOP87 calculations |
| `calculateHouseCusps` | House system logic |
| `calculateAllAspects` | All planet pairs |
| `generateNatalChart` | Complete chart |
| `calculateTransits` | Current positions |
| `getNakshatra` | Vedic lunar mansions |
| `getCurrentAyanamsa` | Sidereal correction |

---

### 3. Chinese Zodiac Engine (`src/lib/chinese-zodiac/`)

**Capabilities**
- 12 animals with full personality traits
- 5 elements (Wood, Fire, Earth, Metal, Water)
- Yin/Yang classification
- Compatibility calculator (0-100%)
- Lucky numbers, colors, directions
- Element cycle and strength

---

### 4. I Ching Engine (`src/lib/iching/`)

**Capabilities**
- Three-coin method simulation
- 64 hexagrams with interpretations
- Changing lines detection
- Transformed hexagram calculation
- Question-based readings

---

### 5. Tarot Engine (`src/lib/tarot/`)

**Capabilities**
- Daily card draws
- 3-card spreads (Past/Present/Future)
- Celtic Cross (10 cards)
- Yes/No readings
- Reversed card interpretation
- External API: tarotapi.dev (free)

---

## 📡 API SPECIFICATION

### POST /api/numerology
```typescript
// Request
{
  fullName: string;          // Required
  birthDate: string;         // Required (YYYY-MM-DD)
  birthTime?: string;        // Optional (HH:MM)
  location?: {               // Optional (for Place Energy)
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }
}

// Response
{
  success: true,
  data: {
    input: { fullName, birthDate, birthTime?, birthPlace? },
    profile: NumerologyProfile,
    dailyReading: DailyReading,
    calculatedAt: string
  }
}
```

### POST /api/astrology
```typescript
// Request
{
  dateTime: string;          // ISO 8601
  latitude: number;
  longitude: number;
  houseSystem?: string;      // Default: Placidus
  isVedic?: boolean;         // Default: false
  includeTransits?: boolean; // Default: false
}

// Response
{
  chart: NatalChart,
  transits?: TransitData
}
```

### GET /api/geocode?q={query}
```typescript
// Response
{
  results: [{
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    timezone: string,
    country: string,
    population: number
  }],
  source: 'local'
}
```

### POST /api/chinese-zodiac
```typescript
// Request
{ birthYear: number, compareYear?: number }
```

### POST /api/iching
```typescript
// Request
{ question?: string }
```

### POST /api/tarot
```typescript
// Request
{
  readingType: 'spread' | 'daily' | 'yesno',
  spreadType?: 'single' | 'threeCard' | 'celticCross',
  question?: string
}
```

---

## 💾 DATABASE & DATA LAYER

### Current State: File-Based (Zero-Cost)

| Data Type | Storage | Size | Source |
|-----------|---------|------|--------|
| Cities | `src/data/cities.json` | ~2.5MB | GeoNames (cities15000) |
| Interpretations | TypeScript constants | ~50KB | Custom content |
| Hexagrams | TypeScript constants | ~20KB | Traditional texts |

### Cities Database Schema
```typescript
interface City {
  i: number;      // GeoNames ID
  n: string;      // Name
  a?: string;     // ASCII name
  t: string;      // Latitude
  g: string;      // Longitude
  c: string;      // Country code
  z: string;      // Timezone
  p: number;      // Population
  s?: string;     // State/Admin1
}
```

### Future Database (Phase 4+)
- **Supabase** (free tier): User profiles, saved readings
- **Redis** (free tier): Session caching
- **No data required for calculations** - all engines are stateless

---

## 🎨 UI/UX DESIGN SYSTEM

### CSS Variables (`globals.css`)
```css
:root {
  /* Primary Colors */
  --bg-dark: #0a0b14;
  --bg-card: rgba(255, 255, 255, 0.03);
  --border-subtle: rgba(255, 255, 255, 0.08);
  
  /* Accent Colors */
  --nebula-purple: #a78bfa;
  --celestial-blue: #60a5fa;
  --aurora-green: #34d399;
  --solar-gold: #fbbf24;
  --cosmic-pink: #f472b6;
  
  /* Text Colors */
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.4);
}
```

### Component Classes
| Class | Purpose |
|-------|---------|
| `.cosmic-bg` | Animated gradient background |
| `.glass-card` | Glassmorphism container |
| `.btn-cosmic` | Primary gradient button |
| `.btn-glass` | Secondary glass button |
| `.input-cosmic` | Form inputs |
| `.label-cosmic` | Form labels |
| `.number-glow` | Featured number display |
| `.gradient-text` | Gradient text effect |
| `.animate-float` | Floating animation |
| `.animate-fade-in-up` | Entrance animation |

### Design Principles
1. **Dark-First**: Deep space aesthetic (#0a0b14 base)
2. **Glassmorphism**: Frosted glass on all cards
3. **Gradient Accents**: Purple → Blue → Pink
4. **Master Number Glow**: Special effects for 11, 22, 33
5. **Responsive**: Mobile-first breakpoints

---

## 🗺️ PAGE ROUTES

| Route | Component | Status | Description |
|-------|-----------|--------|-------------|
| `/` | `page.tsx` | ✅ Complete | Numerology + Place Energy |
| `/astrology` | `astrology/page.tsx` | ✅ Complete | Natal chart + transits |
| `/chinese-zodiac` | `chinese-zodiac/page.tsx` | ✅ Complete | Year animal + compatibility |
| `/iching` | `iching/page.tsx` | ✅ Complete | Hexagram readings |
| `/tarot` | `tarot/page.tsx` | ✅ Complete | Card spreads |

---

## 🧩 COMPONENTS

### LocationSearch (`src/components/LocationSearch.tsx`)
```typescript
interface Props {
  initialValue: string;
  onLocationSelect: (location: {
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }) => void;
}
```
- Debounced search (300ms)
- Local city database (no external API)
- Prioritizes cities starting with query
- Sorted by population
- Shows timezone on selection

### Navigation (`src/components/Navigation.tsx`)
- Tab-based cosmic navigation
- 5 modality tabs
- Active tab highlighting
- Responsive layout

---

## 🔧 DEVELOPMENT WORKFLOW

### Local Development
```bash
cd numerology-mvp
npm install
npm run dev
# Open http://localhost:3000
```

### Scripts
| Script | Command | Purpose |
|--------|---------|---------|
| Dev Server | `npm run dev` | Start development |
| Build | `npm run build` | Production build |
| Lint | `npm run lint` | ESLint check |
| Process Cities | `node scripts/process-cities.mjs` | Regenerate cities.json |

### Git Workflow
```bash
# Feature branch
git checkout -b feature/new-feature

# Commit with conventional commits
git commit -m "feat(module): description"

# Push
git push origin feature/new-feature
```

### Protected Files (`.gitignore`)
- `.env*` - Environment variables
- `.agent/` - Local agent config
- `node_modules/` - Dependencies
- `.next/` - Build artifacts
- `*.pem` - Certificates

---

## 🚀 DEPLOYMENT

### Current: Local Development
- Running on `http://localhost:3000`
- Dev server: `npm run dev`

### Production Options (Free Tier)
| Platform | Status | Notes |
|----------|--------|-------|
| Vercel | ⏳ Ready | Automatic from GitHub |
| Netlify | ⏳ Ready | Alternative option |
| Railway | ⏳ Ready | Full-stack option |

### Environment Variables
```env
# None required for current features
# All engines run locally with no external APIs
# (Tarot uses free public API, no key needed)
```

---

## 🗓️ ROADMAP

### Phase 3: AI Integration (In Progress)
- [ ] Ollama local LLM integration
- [ ] Multi-modality synthesis
- [ ] Personalized interpretations
- [ ] Combined reading generator

### Phase 4: Enhanced Features
- [ ] PDF report generation
- [ ] User accounts (optional)
- [ ] Saved readings history
- [ ] Chart visualizations (SVG)
- [ ] Progressive Web App (PWA)

### Phase 5: Additional Modalities
- [ ] BaZi (Four Pillars)
- [ ] Human Design
- [ ] Feng Shui (Kua number)
- [ ] Kabbalah/Tikkun paths

### Phase 6: Mobile App
- [ ] React Native/Expo app
- [ ] Reuse all `src/lib/` engines
- [ ] iOS & Android deployment

---

## 📚 TECHNICAL REFERENCE

### Type Exports (from `src/lib/numerology`)
```typescript
export type {
  NumerologyProfile,
  NumerologyNumber,
  Pinnacle,
  KarmicInfo,
  DailyReading,
  UserBirthData,
  NumerologyCalculationResult,
  PlaceEnergy
}
```

### Function Exports (from `src/lib/numerology`)
```typescript
export {
  // Utility
  reduceToSingleDigit, sumDigits, stringToNumber,
  isMasterNumber, isKarmicDebt, getNumberMeaning,
  createNumerologyNumber,
  
  // Core
  calculateLifePath, calculateExpression,
  calculateSoulUrge, calculatePersonality,
  calculateBirthday, calculateMaturity,
  
  // Timing
  calculatePersonalYear, calculatePersonalMonth,
  calculatePersonalDay, calculateUniversalYear,
  calculateUniversalMonth, calculateUniversalDay,
  
  // Life Phases
  calculatePinnacles, calculateChallenges,
  
  // Karmic
  calculateKarmicInfo,
  
  // Place Energy
  calculatePlaceVibration, calculateGeographicResonance,
  calculateTimezoneInfluence, calculatePlaceCompatibility,
  calculatePlaceEnergy,
  
  // Complete
  calculateFullProfile, generateDailyReading
}
```

### Key Constants
| Constant | Location | Purpose |
|----------|----------|---------|
| `PYTHAGOREAN_MAP` | numerology/constants.ts | Letter → number |
| `MASTER_NUMBERS` | numerology/constants.ts | [11, 22, 33] |
| `NUMBER_MEANINGS` | numerology/constants.ts | 1-33 interpretations |
| `ZODIAC_SIGNS` | astrology/constants.ts | 12 signs metadata |
| `PLANETS` | astrology/constants.ts | 10 planets metadata |
| `HOUSE_SYSTEMS` | astrology/constants.ts | 9 systems supported |
| `HEXAGRAMS` | iching/calculator.ts | 64 I Ching meanings |

---

## 📝 CHANGELOG

### v2.1.0 (February 3, 2026)
- ✨ **Place Energy Profile**: Birthplace numerology integration
  - Place Vibration from city name
  - Geographic Resonance from coordinates
  - Timezone Influence calculation
  - Life Path + Place Compatibility scoring
- 🌍 Location search on numerology form
- 🗄️ Local cities database (33k cities, no API)

### v2.0.0 (February 2026)
- ✅ All 5 modalities complete
- ✅ Tab-based navigation
- ✅ Cosmic design system
- ✅ Location search component

### v1.0.0 (January 2026)
- 🎉 Initial numerology engine
- 📊 Full profile calculations
- 💜 Cosmic dark theme

---

## 🔗 RESOURCES

- **Repository**: https://github.com/richjunior/astrology
- **GeoNames Data**: https://download.geonames.org/export/dump/
- **Tarot API**: https://tarotapi.dev
- **Swiss Ephemeris**: https://www.astro.com/swisseph/

---

**Built with 💜 by the Synchronic Intelligence Team**
