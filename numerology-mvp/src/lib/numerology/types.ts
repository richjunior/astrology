/**
 * Numerology Types - Core data structures
 * Designed for reuse in web and mobile apps
 */

export interface NumerologyProfile {
  // Core Numbers
  lifePath: NumerologyNumber;
  expression: NumerologyNumber;
  soulUrge: NumerologyNumber;
  personality: NumerologyNumber;

  // Timing Cycles
  personalYear: NumerologyNumber;
  personalMonth: NumerologyNumber;
  personalDay: NumerologyNumber;

  // Life Phases
  pinnacles: Pinnacle[];
  challenges: NumerologyNumber[];

  // Additional
  birthday: NumerologyNumber;
  maturity: NumerologyNumber;
  karmic: KarmicInfo;

  // Place Energy (optional)
  placeEnergy?: PlaceEnergy;
}

export interface NumerologyNumber {
  value: number;
  isMaster: boolean;
  title: string;
  theme: string;
  description: string;
}

export interface Pinnacle {
  number: NumerologyNumber;
  startAge: number;
  endAge: number | null; // null = rest of life
  phase: 1 | 2 | 3 | 4;
  isActive: boolean;
}

export interface KarmicInfo {
  karmicDebts: number[];
  karmicLessons: number[];
  hiddenPassions: number[];
}

// Place Energy Profile - birthplace numerology
export interface PlaceEnergy {
  placeName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;

  // Calculated numbers
  placeVibration: NumerologyNumber;      // From place name
  geographicResonance: NumerologyNumber; // From coordinates
  timezoneInfluence: NumerologyNumber;   // From timezone offset

  // Compatibility analysis
  compatibility: {
    score: number;           // 0-100
    rating: 'excellent' | 'good' | 'neutral' | 'challenging';
    description: string;
  };
}

export interface DailyReading {
  date: Date;
  personalDay: NumerologyNumber;
  personalMonth: NumerologyNumber;
  personalYear: NumerologyNumber;
  universalDay: number;
  universalMonth: number;
  universalYear: number;
  energyFocus: string;
  actionItems: string[];
  timing: {
    bestFor: string[];
    avoid: string[];
  };
}

export interface UserBirthData {
  fullName: string;
  birthDate: Date;
  birthTime?: string;
  birthPlace?: string;
  // Location details (optional)
  location?: {
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
}

export interface NumerologyCalculationResult {
  input: UserBirthData;
  profile: NumerologyProfile;
  dailyReading: DailyReading;
  calculatedAt: Date;
}

