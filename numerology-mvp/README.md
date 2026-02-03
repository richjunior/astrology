# 🔮 Synchronic Intelligence Platform - MVP

A comprehensive metaphysical calculation platform with **9 modalities** built on Next.js 16, TypeScript, and **100% FREE/Open Source engines**.

## ✅ Implementation Status

| Modality | Status | Engine | Cost |
|----------|--------|--------|------|
| **Numerology** | ✅ Complete | Custom TypeScript | $0 |
| **Western Astrology** | ✅ Complete | Custom (Swiss Eph formulas) | $0 |
| **Vedic Astrology** | ✅ Complete | Sidereal mode + Nakshatras | $0 |
| **Transits** | ✅ Complete | Real-time planetary aspects | $0 |
| **House Systems** | ✅ Complete | 9 systems (Placidus, Koch, etc.) | $0 |
| **Chinese Zodiac** | ✅ Complete | Custom TypeScript | $0 |
| **I Ching** | ✅ Complete | Custom coin-casting | $0 |
| **Tarot** | ✅ Complete | tarotapi.dev (free API) | $0 |

**Total Monthly Cost: $0** 🎉

---

## 🚀 Quick Start

```bash
cd numerology-mvp
npm install
npm run dev
# Open http://localhost:3000
```

---

## 📡 API Endpoints

### Numerology
```bash
POST /api/numerology
{ "fullName": "John Doe", "birthDate": "1990-05-15" }
```

### Daily Reading
```bash
POST /api/daily
{ "fullName": "John Doe", "birthDate": "1990-05-15" }
```

### Astrology (Natal Chart + Transits)
```bash
POST /api/astrology
{
  "dateTime": "1990-05-15T14:30:00Z",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "houseSystem": "Placidus",
  "isVedic": false,
  "includeTransits": true
}
```

### Chinese Zodiac
```bash
POST /api/chinese-zodiac
{ "birthYear": 1990, "compareYear": 1992 }
```

### I Ching
```bash
POST /api/iching
{ "question": "What should I focus on today?" }
```

### Tarot
```bash
POST /api/tarot
{
  "readingType": "spread",      // spread | daily | yesno
  "spreadType": "threeCard",    // single | threeCard | celticCross
  "question": "What do I need to know?"
}
```

---

## 📁 Project Structure

```
numerology-mvp/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── numerology/      # Full profile calculation
│   │   │   ├── daily/           # Daily reading
│   │   │   ├── astrology/       # Natal chart + transits
│   │   │   ├── chinese-zodiac/  # Chinese zodiac profile
│   │   │   ├── iching/          # I Ching divination
│   │   │   └── tarot/           # Tarot readings
│   │   ├── globals.css          # Cosmic theme
│   │   ├── layout.tsx           # Root layout + SEO
│   │   └── page.tsx             # Numerology UI
│   │
│   └── lib/
│       ├── numerology/          # ✅ Complete engine
│       │   ├── types.ts         # TypeScript types
│       │   ├── constants.ts     # Number meanings
│       │   ├── calculator.ts    # All calculations
│       │   └── interpretations.ts
│       │
│       ├── astrology/           # ✅ Complete engine
│       │   ├── types.ts         # Chart types
│       │   ├── constants.ts     # Signs, planets, aspects
│       │   └── calculator.ts    # Natal, transits, houses
│       │
│       ├── chinese-zodiac/      # ✅ Complete engine
│       │   └── calculator.ts    # Animals, elements, compat
│       │
│       ├── iching/              # ✅ Complete engine
│       │   └── calculator.ts    # Coin casting, hexagrams
│       │
│       └── tarot/               # ✅ Complete engine
│           └── client.ts        # tarotapi.dev wrapper
│
└── package.json
```

---

## 🎨 Frontend Features

- **Cosmic Dark Theme** - Deep space aesthetics with nebula colors
- **Glassmorphism** - Frosted glass effects on all cards
- **Gradient Typography** - Eye-catching number displays
- **Master Number Glow** - Special effects for 11, 22, 33
- **Smooth Animations** - Fade-ins, floats, shimmers
- **Responsive Design** - Works on all devices
- **SEO Optimized** - Meta tags, Open Graph, Twitter cards

---

## 🔧 Available Calculations

### Numerology
- Life Path, Expression, Soul Urge, Personality
- Birthday, Maturity numbers
- Personal Year/Month/Day cycles
- Pinnacles (4 life phases with ages)
- Challenges (4 lessons)
- Karmic Debts (13, 14, 16, 19)
- Karmic Lessons (missing numbers)
- Hidden Passions

### Astrology
- Natal Chart with 10 planets
- Ascendant & Midheaven calculation
- House cusps (9 systems available)
- All major/minor aspects
- Vedic: Nakshatras, Ayanamsa correction
- Real-time transits to natal
- Retrograde detection

### Chinese Zodiac
- 12 animals with full traits
- 5 elements with meanings
- Yin/Yang classification
- Compatibility calculator
- Lucky numbers/colors/directions

### I Ching
- Three-coin method simulation
- 64 hexagrams (7 initial, expandable)
- Changing lines detection
- Transformed hexagram calculation

### Tarot
- Daily card draw
- 3-card spread (Past/Present/Future)
- Celtic Cross (10 cards)
- Yes/No readings
- Reversed card interpretation

---

## 📱 Mobile Compatibility

The `/lib/` engines are **100% reusable** in React Native/Expo:
- Pure TypeScript functions
- No browser dependencies
- TypeScript types for consistency

---

## 🚧 Roadmap

### Phase 2: Enhanced UI
- [ ] Astrology page with chart visualization
- [ ] Chinese Zodiac page
- [ ] I Ching page with hexagram display
- [ ] Tarot page with card images

### Phase 3: More Modalities
- [ ] Feng Shui (Kua number)
- [ ] BaZi (Four Pillars)
- [ ] Human Design
- [ ] Kabbalah/Tikkun

### Phase 4: AI Integration
- [ ] Ollama for personalized interpretations
- [ ] Combined multi-modality readings
- [ ] PDF report generation

---

## 🔒 Privacy

- No data storage - all calculations real-time
- No accounts required
- No tracking
- Tarot API is the only external call

---

## 📄 License

MIT - Free for personal and commercial use.

---

**Built with 💜 by the Synchronic Intelligence Team**
