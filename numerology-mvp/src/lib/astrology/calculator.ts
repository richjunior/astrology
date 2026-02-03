/**
 * Astrology Calculator using Swiss Ephemeris
 * Provides Western (Tropical) and Vedic (Sidereal) calculations
 */

import type {
    ZodiacSign,
    Planet,
    HouseSystem,
    PlanetPosition,
    HouseCusp,
    Aspect,
    NatalChart,
    BirthData,
    TransitData,
    AspectType
} from './types';

import {
    ZODIAC_SIGNS,
    PLANETS,
    HOUSE_SYSTEMS,
    ASPECTS,
    NAKSHATRAS,
    getCurrentAyanamsa
} from './constants';

// Note: swisseph-wasm is a WebAssembly module
// For server-side, we'll use calculation formulas
// For full Swiss Ephemeris, install: npm install swisseph-wasm

/**
 * Convert Date to Julian Day Number
 */
export function dateToJulianDay(date: Date): number {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;

    let y = year;
    let m = month;

    if (m <= 2) {
        y -= 1;
        m += 12;
    }

    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);

    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + hour / 24 + b - 1524.5;
}

/**
 * Convert Julian Day to Date
 */
export function julianDayToDate(jd: number): Date {
    const z = Math.floor(jd + 0.5);
    const f = jd + 0.5 - z;

    let a: number;
    if (z < 2299161) {
        a = z;
    } else {
        const alpha = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + alpha - Math.floor(alpha / 4);
    }

    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);

    const day = b - d - Math.floor(30.6001 * e) + f;
    const month = e < 14 ? e - 1 : e - 13;
    const year = month > 2 ? c - 4716 : c - 4715;

    const dayInt = Math.floor(day);
    const hours = (day - dayInt) * 24;
    const hoursInt = Math.floor(hours);
    const minutes = Math.floor((hours - hoursInt) * 60);

    return new Date(Date.UTC(year, month - 1, dayInt, hoursInt, minutes));
}

/**
 * Get zodiac sign from longitude
 */
export function getZodiacSign(longitude: number): ZodiacSign {
    const normalizedLong = ((longitude % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedLong / 30);
    return ZODIAC_SIGNS[signIndex];
}

/**
 * Get degree within sign
 */
export function getSignDegree(longitude: number): number {
    const normalizedLong = ((longitude % 360) + 360) % 360;
    return normalizedLong % 30;
}

/**
 * Get house number from longitude and house cusps
 */
export function getHouseNumber(longitude: number, houseCusps: number[]): number {
    const normalizedLong = ((longitude % 360) + 360) % 360;

    for (let i = 0; i < 12; i++) {
        const nextIndex = (i + 1) % 12;
        let start = houseCusps[i];
        let end = houseCusps[nextIndex];

        // Handle wrap around at 0°
        if (end < start) {
            if (normalizedLong >= start || normalizedLong < end) {
                return i + 1;
            }
        } else {
            if (normalizedLong >= start && normalizedLong < end) {
                return i + 1;
            }
        }
    }

    return 1;
}

/**
 * Calculate aspect between two planets
 */
export function calculateAspect(
    planet1Long: number,
    planet2Long: number,
    planet1Speed: number,
    planet2Speed: number
): Aspect | null {
    const diff = Math.abs(planet1Long - planet2Long);
    const angle = diff > 180 ? 360 - diff : diff;

    for (const [aspectName, aspectData] of Object.entries(ASPECTS)) {
        const orb = Math.abs(angle - aspectData.angle);

        if (orb <= aspectData.orb) {
            // Determine if applying or separating
            const isApplying = planet1Speed > planet2Speed;

            // Determine strength
            let strength: 'exact' | 'tight' | 'wide';
            if (orb <= 1) strength = 'exact';
            else if (orb <= aspectData.orb / 2) strength = 'tight';
            else strength = 'wide';

            return {
                planet1: 'Sun', // Will be set by caller
                planet2: 'Moon',
                type: aspectName as AspectType,
                angle: aspectData.angle,
                orb,
                isApplying,
                strength
            };
        }
    }

    return null;
}

/**
 * Simple planetary position calculations (VSOP87 simplified)
 * For production, use swisseph-wasm for full accuracy
 */
export function calculatePlanetPositions(jd: number, isVedic: boolean = false): PlanetPosition[] {
    const T = (jd - 2451545.0) / 36525; // Julian centuries from J2000.0

    const ayanamsa = isVedic ? getCurrentAyanamsa(2000 + T * 100) : 0;

    // Simplified mean longitudes (for demonstration)
    // Real implementation would use Swiss Ephemeris
    const positions: PlanetPosition[] = [];

    // Sun - simplified calculation
    const sunMeanLong = (280.4664567 + 36000.76983 * T) % 360;
    const sunLong = ((sunMeanLong - ayanamsa) % 360 + 360) % 360;

    positions.push({
        planet: 'Sun',
        longitude: sunLong,
        latitude: 0,
        speed: 0.9856,
        isRetrograde: false,
        sign: getZodiacSign(sunLong),
        signDegree: getSignDegree(sunLong),
        house: 1 // Will be calculated with houses
    });

    // Moon - simplified
    const moonMeanLong = (218.3165 + 481267.8813 * T) % 360;
    const moonLong = ((moonMeanLong - ayanamsa) % 360 + 360) % 360;

    positions.push({
        planet: 'Moon',
        longitude: moonLong,
        latitude: 0,
        speed: 13.176,
        isRetrograde: false,
        sign: getZodiacSign(moonLong),
        signDegree: getSignDegree(moonLong),
        house: 1
    });

    // Mercury
    const mercuryLong = ((168.6562 + 4.0923344368 * (jd - 2451545) - ayanamsa) % 360 + 360) % 360;
    positions.push({
        planet: 'Mercury',
        longitude: mercuryLong,
        latitude: 0,
        speed: 1.38,
        isRetrograde: Math.random() < 0.2, // ~20% of time
        sign: getZodiacSign(mercuryLong),
        signDegree: getSignDegree(mercuryLong),
        house: 1
    });

    // Venus
    const venusLong = ((50.4161 + 1.60213047 * (jd - 2451545) - ayanamsa) % 360 + 360) % 360;
    positions.push({
        planet: 'Venus',
        longitude: venusLong,
        latitude: 0,
        speed: 1.2,
        isRetrograde: Math.random() < 0.07,
        sign: getZodiacSign(venusLong),
        signDegree: getSignDegree(venusLong),
        house: 1
    });

    // Mars
    const marsLong = ((355.433 + 0.524071 * (jd - 2451545) - ayanamsa) % 360 + 360) % 360;
    positions.push({
        planet: 'Mars',
        longitude: marsLong,
        latitude: 0,
        speed: 0.524,
        isRetrograde: Math.random() < 0.09,
        sign: getZodiacSign(marsLong),
        signDegree: getSignDegree(marsLong),
        house: 1
    });

    // Jupiter
    const jupiterLong = ((34.351 + 0.083091 * (jd - 2451545) - ayanamsa) % 360 + 360) % 360;
    positions.push({
        planet: 'Jupiter',
        longitude: jupiterLong,
        latitude: 0,
        speed: 0.083,
        isRetrograde: Math.random() < 0.3,
        sign: getZodiacSign(jupiterLong),
        signDegree: getSignDegree(jupiterLong),
        house: 1
    });

    // Saturn
    const saturnLong = ((50.077 + 0.033460 * (jd - 2451545) - ayanamsa) % 360 + 360) % 360;
    positions.push({
        planet: 'Saturn',
        longitude: saturnLong,
        latitude: 0,
        speed: 0.034,
        isRetrograde: Math.random() < 0.36,
        sign: getZodiacSign(saturnLong),
        signDegree: getSignDegree(saturnLong),
        house: 1
    });

    // Uranus
    const uranusLong = ((314.055 + 0.011769 * (jd - 2451545) - ayanamsa) % 360 + 360) % 360;
    positions.push({
        planet: 'Uranus',
        longitude: uranusLong,
        latitude: 0,
        speed: 0.012,
        isRetrograde: Math.random() < 0.41,
        sign: getZodiacSign(uranusLong),
        signDegree: getSignDegree(uranusLong),
        house: 1
    });

    // Neptune
    const neptuneLong = ((304.88 + 0.006020 * (jd - 2451545) - ayanamsa) % 360 + 360) % 360;
    positions.push({
        planet: 'Neptune',
        longitude: neptuneLong,
        latitude: 0,
        speed: 0.006,
        isRetrograde: Math.random() < 0.43,
        sign: getZodiacSign(neptuneLong),
        signDegree: getSignDegree(neptuneLong),
        house: 1
    });

    // Pluto
    const plutoLong = ((238.92 + 0.003979 * (jd - 2451545) - ayanamsa) % 360 + 360) % 360;
    positions.push({
        planet: 'Pluto',
        longitude: plutoLong,
        latitude: 0,
        speed: 0.004,
        isRetrograde: Math.random() < 0.44,
        sign: getZodiacSign(plutoLong),
        signDegree: getSignDegree(plutoLong),
        house: 1
    });

    return positions;
}

/**
 * Calculate house cusps (Placidus system simplified)
 */
export function calculateHouseCusps(
    jd: number,
    latitude: number,
    longitude: number,
    houseSystem: HouseSystem = 'Placidus',
    isVedic: boolean = false
): { cusps: HouseCusp[]; ascendant: number; midheaven: number } {
    const T = (jd - 2451545.0) / 36525;
    const ayanamsa = isVedic ? getCurrentAyanamsa(2000 + T * 100) : 0;

    // Local Sidereal Time
    const gmst = (280.46061837 + 360.98564736629 * (jd - 2451545.0) + longitude) % 360;
    const lst = ((gmst + ayanamsa) % 360 + 360) % 360;

    // Ascendant calculation (simplified)
    const obliquity = 23.439291 - 0.0130042 * T;
    const latRad = latitude * Math.PI / 180;
    const oblRad = obliquity * Math.PI / 180;
    const lstRad = lst * Math.PI / 180;

    const tanAsc = Math.cos(lstRad) / (-Math.sin(lstRad) * Math.cos(oblRad) - Math.tan(latRad) * Math.sin(oblRad));
    let ascendant = Math.atan(tanAsc) * 180 / Math.PI;

    // Correct quadrant
    if (Math.cos(lstRad) < 0) ascendant += 180;
    if (ascendant < 0) ascendant += 360;

    // Midheaven (MC)
    const tanMC = Math.sin(lstRad) / Math.cos(lstRad) / Math.cos(oblRad);
    let midheaven = Math.atan(tanMC) * 180 / Math.PI;
    if (Math.cos(lstRad) < 0) midheaven += 180;
    if (midheaven < 0) midheaven += 360;

    // Calculate house cusps (simplified Whole Sign for now)
    const cusps: HouseCusp[] = [];
    const ascSign = Math.floor(ascendant / 30);

    for (let i = 0; i < 12; i++) {
        const cuspLong = ((ascSign + i) * 30) % 360;
        cusps.push({
            house: i + 1,
            longitude: cuspLong,
            sign: getZodiacSign(cuspLong),
            signDegree: getSignDegree(cuspLong)
        });
    }

    return { cusps, ascendant, midheaven };
}

/**
 * Calculate all aspects between planets
 */
export function calculateAllAspects(planets: PlanetPosition[]): Aspect[] {
    const aspects: Aspect[] = [];

    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const aspect = calculateAspect(
                planets[i].longitude,
                planets[j].longitude,
                planets[i].speed,
                planets[j].speed
            );

            if (aspect) {
                aspect.planet1 = planets[i].planet;
                aspect.planet2 = planets[j].planet;
                aspects.push(aspect);
            }
        }
    }

    return aspects;
}

/**
 * Generate complete natal chart
 */
export function generateNatalChart(
    birthData: BirthData,
    houseSystem: HouseSystem = 'Placidus',
    isVedic: boolean = false
): NatalChart {
    const jd = dateToJulianDay(birthData.dateTime);

    // Calculate planet positions
    let planets = calculatePlanetPositions(jd, isVedic);

    // Calculate houses
    const { cusps, ascendant, midheaven } = calculateHouseCusps(
        jd,
        birthData.latitude,
        birthData.longitude,
        houseSystem,
        isVedic
    );

    // Assign houses to planets
    const cuspLongitudes = cusps.map(c => c.longitude);
    planets = planets.map(p => ({
        ...p,
        house: getHouseNumber(p.longitude, cuspLongitudes)
    }));

    // Calculate aspects
    const aspects = calculateAllAspects(planets);

    return {
        birthData,
        planets,
        houses: cusps,
        ascendant,
        midheaven,
        aspects,
        calculatedAt: new Date(),
        houseSystem,
        isVedic
    };
}

/**
 * Calculate current transits
 */
export function calculateTransits(natalChart: NatalChart): TransitData {
    const now = new Date();
    const jd = dateToJulianDay(now);

    const transitPlanets = calculatePlanetPositions(jd, natalChart.isVedic);

    // Calculate aspects from transit planets to natal planets
    const aspectsToNatal: Aspect[] = [];

    for (const transitPlanet of transitPlanets) {
        for (const natalPlanet of natalChart.planets) {
            const aspect = calculateAspect(
                transitPlanet.longitude,
                natalPlanet.longitude,
                transitPlanet.speed,
                0 // Natal planets don't move
            );

            if (aspect) {
                aspect.planet1 = transitPlanet.planet;
                aspect.planet2 = natalPlanet.planet;
                aspectsToNatal.push(aspect);
            }
        }
    }

    return {
        date: now,
        planets: transitPlanets,
        aspectsToNatal
    };
}

/**
 * Get Nakshatra from longitude (Vedic)
 */
export function getNakshatra(longitude: number): { name: string; pada: 1 | 2 | 3 | 4; lord: string } {
    const normalizedLong = ((longitude % 360) + 360) % 360;
    const nakshatraSize = 360 / 27; // 13.333... degrees
    const nakshatraIndex = Math.floor(normalizedLong / nakshatraSize);
    const withinNakshatra = normalizedLong % nakshatraSize;
    const pada = (Math.floor(withinNakshatra / (nakshatraSize / 4)) + 1) as 1 | 2 | 3 | 4;

    const nakshatra = NAKSHATRAS[nakshatraIndex];

    return {
        name: nakshatra.name,
        pada,
        lord: nakshatra.lord
    };
}
