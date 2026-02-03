/**
 * Astrology Types - Core data structures for Western & Vedic astrology
 */

export type ZodiacSign =
    | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
    | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
    | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export type Planet =
    | 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars'
    | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto'
    | 'NorthNode' | 'SouthNode' | 'Chiron';

export type HouseSystem =
    | 'Placidus' | 'Koch' | 'Porphyrius' | 'Regiomontanus'
    | 'Campanus' | 'Equal' | 'WholeSign' | 'Meridian' | 'Morinus';

export type AspectType =
    | 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile'
    | 'quincunx' | 'semisextile' | 'semisquare' | 'sesquisquare'
    | 'quintile' | 'biquintile';

export interface PlanetPosition {
    planet: Planet;
    longitude: number;        // 0-360 degrees
    latitude: number;
    speed: number;            // degrees per day
    isRetrograde: boolean;
    sign: ZodiacSign;
    signDegree: number;       // degrees within sign (0-30)
    house: number;            // 1-12
}

export interface HouseCusp {
    house: number;            // 1-12
    longitude: number;
    sign: ZodiacSign;
    signDegree: number;
}

export interface Aspect {
    planet1: Planet;
    planet2: Planet;
    type: AspectType;
    angle: number;
    orb: number;              // deviation from exact
    isApplying: boolean;      // getting closer or separating
    strength: 'exact' | 'tight' | 'wide';
}

export interface NatalChart {
    birthData: BirthData;
    planets: PlanetPosition[];
    houses: HouseCusp[];
    ascendant: number;
    midheaven: number;
    aspects: Aspect[];
    calculatedAt: Date;
    houseSystem: HouseSystem;
    isVedic: boolean;         // true = sidereal, false = tropical
}

export interface BirthData {
    dateTime: Date;
    latitude: number;
    longitude: number;
    timezone: string;
    location?: string;
}

export interface TransitData {
    date: Date;
    planets: PlanetPosition[];
    aspectsToNatal: Aspect[];
}

export interface SolarReturn {
    year: number;
    exactDateTime: Date;
    chart: NatalChart;
}

export interface LunarReturn {
    month: number;
    year: number;
    exactDateTime: Date;
    chart: NatalChart;
}

// Vedic-specific types
export type Nakshatra =
    | 'Ashwini' | 'Bharani' | 'Krittika' | 'Rohini' | 'Mrigashira'
    | 'Ardra' | 'Punarvasu' | 'Pushya' | 'Ashlesha' | 'Magha'
    | 'PurvaPhalguni' | 'UttaraPhalguni' | 'Hasta' | 'Chitra' | 'Swati'
    | 'Vishakha' | 'Anuradha' | 'Jyeshtha' | 'Mula' | 'PurvaAshadha'
    | 'UttaraAshadha' | 'Shravana' | 'Dhanishta' | 'Shatabhisha'
    | 'PurvaBhadrapada' | 'UttaraBhadrapada' | 'Revati';

export interface VedicPlanetPosition extends PlanetPosition {
    nakshatra: Nakshatra;
    nakshatraPada: 1 | 2 | 3 | 4;
    nakshatraLord: Planet;
}

export interface DashaPeriod {
    planet: Planet;
    startDate: Date;
    endDate: Date;
    subPeriods?: DashaPeriod[];
}

export interface VedicChart extends NatalChart {
    planets: VedicPlanetPosition[];
    ayanamsa: number;         // precession correction
    dashas: DashaPeriod[];
    moonNakshatra: Nakshatra;
}
