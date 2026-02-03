/**
 * Core Numerology Calculator
 * All calculation logic - pure functions, no side effects
 * Designed for reuse in web and mobile apps
 */

import {
    PYTHAGOREAN_MAP,
    VOWELS,
    MASTER_NUMBERS,
    KARMIC_DEBT_NUMBERS,
    NUMBER_MEANINGS,
    PERSONAL_YEAR_THEMES
} from './constants';
import type {
    NumerologyProfile,
    NumerologyNumber,
    Pinnacle,
    KarmicInfo,
    DailyReading,
    UserBirthData,
    PlaceEnergy
} from './types';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Reduce a number to a single digit (1-9) unless it's a master number
 */
export function reduceToSingleDigit(num: number, preserveMasters = true): number {
    if (preserveMasters && MASTER_NUMBERS.includes(num)) {
        return num;
    }

    while (num > 9 && !(preserveMasters && MASTER_NUMBERS.includes(num))) {
        num = String(num)
            .split('')
            .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }

    return num;
}

/**
 * Sum digits of a number
 */
export function sumDigits(num: number): number {
    return String(num)
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
}

/**
 * Convert a string to its numerological value
 */
export function stringToNumber(str: string, vowelsOnly = false, consonantsOnly = false): number {
    const normalized = str.toLowerCase().replace(/[^a-z]/g, '');

    let sum = 0;
    for (const char of normalized) {
        const isVowel = VOWELS.includes(char);

        if (vowelsOnly && !isVowel) continue;
        if (consonantsOnly && isVowel) continue;

        sum += PYTHAGOREAN_MAP[char] || 0;
    }

    return sum;
}

/**
 * Check if a number is a master number
 */
export function isMasterNumber(num: number): boolean {
    return MASTER_NUMBERS.includes(num);
}

/**
 * Check if a number is a karmic debt number
 */
export function isKarmicDebt(num: number): boolean {
    return KARMIC_DEBT_NUMBERS.includes(num);
}

/**
 * Get the meaning/interpretation for a number
 */
export function getNumberMeaning(num: number): typeof NUMBER_MEANINGS[keyof typeof NUMBER_MEANINGS] {
    const key = num as keyof typeof NUMBER_MEANINGS;
    return NUMBER_MEANINGS[key] || NUMBER_MEANINGS[reduceToSingleDigit(num, false) as keyof typeof NUMBER_MEANINGS];
}

/**
 * Create a NumerologyNumber object with meaning
 */
export function createNumerologyNumber(value: number): NumerologyNumber {
    const meaning = getNumberMeaning(value);
    return {
        value,
        isMaster: isMasterNumber(value),
        title: meaning.title,
        theme: meaning.theme,
        description: `${meaning.title}: ${meaning.theme}. Strengths: ${meaning.strengths.join(', ')}. Challenges: ${meaning.challenges.join(', ')}.`
    };
}

// ============================================
// CORE NUMBER CALCULATIONS
// ============================================

/**
 * Calculate Life Path Number from birth date
 * The most important number in numerology - represents your life's purpose
 */
export function calculateLifePath(birthDate: Date): number {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const year = birthDate.getFullYear();

    // Reduce each component first (traditional method)
    const monthReduced = reduceToSingleDigit(month);
    const dayReduced = reduceToSingleDigit(day);
    const yearReduced = reduceToSingleDigit(sumDigits(year));

    // Sum and reduce final result
    const sum = monthReduced + dayReduced + yearReduced;
    return reduceToSingleDigit(sum);
}

/**
 * Calculate Expression/Destiny Number from full name
 * Represents your natural talents and abilities
 */
export function calculateExpression(fullName: string): number {
    const sum = stringToNumber(fullName);
    return reduceToSingleDigit(sum);
}

/**
 * Calculate Soul Urge/Heart's Desire Number from vowels in name
 * Represents your inner self and what truly motivates you
 */
export function calculateSoulUrge(fullName: string): number {
    const sum = stringToNumber(fullName, true, false); // vowels only
    return reduceToSingleDigit(sum);
}

/**
 * Calculate Personality Number from consonants in name
 * Represents how others perceive you
 */
export function calculatePersonality(fullName: string): number {
    const sum = stringToNumber(fullName, false, true); // consonants only
    return reduceToSingleDigit(sum);
}

/**
 * Calculate Birthday Number (just the day you were born)
 * A minor influence representing particular talents
 */
export function calculateBirthday(birthDate: Date): number {
    return reduceToSingleDigit(birthDate.getDate());
}

/**
 * Calculate Maturity Number (Life Path + Expression)
 * Represents the person you will become in later life
 */
export function calculateMaturity(lifePath: number, expression: number): number {
    return reduceToSingleDigit(lifePath + expression);
}

// ============================================
// TIMING CYCLES
// ============================================

/**
 * Calculate Personal Year
 * The 9-year cycle that influences themes for the current year
 */
export function calculatePersonalYear(birthDate: Date, year: number = new Date().getFullYear()): number {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    const monthReduced = reduceToSingleDigit(month);
    const dayReduced = reduceToSingleDigit(day);
    const yearReduced = reduceToSingleDigit(sumDigits(year));

    return reduceToSingleDigit(monthReduced + dayReduced + yearReduced, false);
}

/**
 * Calculate Personal Month
 */
export function calculatePersonalMonth(personalYear: number, month: number = new Date().getMonth() + 1): number {
    return reduceToSingleDigit(personalYear + month, false);
}

/**
 * Calculate Personal Day
 */
export function calculatePersonalDay(personalMonth: number, day: number = new Date().getDate()): number {
    return reduceToSingleDigit(personalMonth + day, false);
}

/**
 * Calculate Universal Year (for everyone)
 */
export function calculateUniversalYear(year: number = new Date().getFullYear()): number {
    return reduceToSingleDigit(sumDigits(year), false);
}

/**
 * Calculate Universal Month
 */
export function calculateUniversalMonth(universalYear: number, month: number = new Date().getMonth() + 1): number {
    return reduceToSingleDigit(universalYear + month, false);
}

/**
 * Calculate Universal Day
 */
export function calculateUniversalDay(date: Date = new Date()): number {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return reduceToSingleDigit(sumDigits(month) + sumDigits(day) + sumDigits(year), false);
}

// ============================================
// PINNACLES & CHALLENGES
// ============================================

/**
 * Calculate the four Pinnacles (major life phases)
 * Each pinnacle represents a different phase of life with specific energies
 */
export function calculatePinnacles(birthDate: Date): Pinnacle[] {
    const month = reduceToSingleDigit(birthDate.getMonth() + 1);
    const day = reduceToSingleDigit(birthDate.getDate());
    const year = reduceToSingleDigit(sumDigits(birthDate.getFullYear()));
    const lifePath = calculateLifePath(birthDate);

    // Calculate when first pinnacle ends (36 - life path)
    const firstPinnacleEnd = 36 - lifePath;

    // Calculate pinnacle numbers
    const pinnacleNumbers = [
        reduceToSingleDigit(month + day),                   // First: Month + Day
        reduceToSingleDigit(day + year),                     // Second: Day + Year
        reduceToSingleDigit(month + day + day + year),       // Third: First + Second
        reduceToSingleDigit(month + year)                    // Fourth: Month + Year
    ];

    // Calculate current age to determine active pinnacle
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear() -
        (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);

    return pinnacleNumbers.map((num, index) => {
        let startAge: number;
        let endAge: number | null;

        switch (index) {
            case 0: startAge = 0; endAge = firstPinnacleEnd; break;
            case 1: startAge = firstPinnacleEnd; endAge = firstPinnacleEnd + 9; break;
            case 2: startAge = firstPinnacleEnd + 9; endAge = firstPinnacleEnd + 18; break;
            case 3: startAge = firstPinnacleEnd + 18; endAge = null; break;
            default: startAge = 0; endAge = null;
        }

        const isActive = age >= startAge && (endAge === null || age < endAge);

        return {
            number: createNumerologyNumber(num),
            startAge,
            endAge,
            phase: (index + 1) as 1 | 2 | 3 | 4,
            isActive
        };
    });
}

/**
 * Calculate the four Challenges
 * Represent obstacles and lessons to overcome
 */
export function calculateChallenges(birthDate: Date): NumerologyNumber[] {
    const month = reduceToSingleDigit(birthDate.getMonth() + 1, false);
    const day = reduceToSingleDigit(birthDate.getDate(), false);
    const year = reduceToSingleDigit(sumDigits(birthDate.getFullYear()), false);

    const firstChallenge = Math.abs(month - day);
    const secondChallenge = Math.abs(day - year);
    const thirdChallenge = Math.abs(firstChallenge - secondChallenge);
    const fourthChallenge = Math.abs(month - year);

    return [
        createNumerologyNumber(firstChallenge || 0),
        createNumerologyNumber(secondChallenge || 0),
        createNumerologyNumber(thirdChallenge || 0),
        createNumerologyNumber(fourthChallenge || 0)
    ];
}

// ============================================
// KARMIC ANALYSIS
// ============================================

/**
 * Calculate Karmic Debts, Lessons, and Hidden Passions
 */
export function calculateKarmicInfo(fullName: string, birthDate: Date): KarmicInfo {
    // Check for karmic debt numbers in core calculations
    const lifePath = calculateLifePath(birthDate);
    const expression = calculateExpression(fullName);
    const soulUrge = calculateSoulUrge(fullName);

    const karmicDebts: number[] = [];

    // Check unreduced values for karmic debt
    const lifePathUnreduced = sumDigits(birthDate.getMonth() + 1) +
        sumDigits(birthDate.getDate()) + sumDigits(birthDate.getFullYear());

    if (KARMIC_DEBT_NUMBERS.includes(lifePathUnreduced)) {
        karmicDebts.push(lifePathUnreduced);
    }

    // Karmic Lessons: numbers 1-9 missing from name
    const nameNormalized = fullName.toLowerCase().replace(/[^a-z]/g, '');
    const presentNumbers = new Set<number>();

    for (const char of nameNormalized) {
        const num = PYTHAGOREAN_MAP[char];
        if (num) presentNumbers.add(num);
    }

    const karmicLessons: number[] = [];
    for (let i = 1; i <= 9; i++) {
        if (!presentNumbers.has(i)) {
            karmicLessons.push(i);
        }
    }

    // Hidden Passions: numbers appearing 3+ times
    const numberCounts: Record<number, number> = {};
    for (const char of nameNormalized) {
        const num = PYTHAGOREAN_MAP[char];
        if (num) {
            numberCounts[num] = (numberCounts[num] || 0) + 1;
        }
    }

    const hiddenPassions = Object.entries(numberCounts)
        .filter(([_, count]) => count >= 3)
        .map(([num, _]) => parseInt(num, 10));

    return {
        karmicDebts,
        karmicLessons,
        hiddenPassions
    };
}

// ============================================
// PLACE ENERGY CALCULATIONS
// ============================================

/**
 * Calculate Place Vibration Number from city name
 * Uses the same Pythagorean method as name numerology
 */
export function calculatePlaceVibration(placeName: string): number {
    const sum = stringToNumber(placeName);
    return reduceToSingleDigit(sum);
}

/**
 * Calculate Geographic Resonance from coordinates
 * Sums all digits from latitude and longitude
 */
export function calculateGeographicResonance(latitude: number, longitude: number): number {
    // Get absolute values and extract digits
    const latDigits = Math.abs(latitude).toString().replace('.', '').split('');
    const lngDigits = Math.abs(longitude).toString().replace('.', '').split('');

    const latSum = latDigits.reduce((acc, d) => acc + (parseInt(d, 10) || 0), 0);
    const lngSum = lngDigits.reduce((acc, d) => acc + (parseInt(d, 10) || 0), 0);

    return reduceToSingleDigit(latSum + lngSum, false);
}

/**
 * Calculate Timezone Influence from timezone offset
 * Extracts the numeric offset and reduces it
 */
export function calculateTimezoneInfluence(timezone: string): number {
    // Try to extract hours from timezone (e.g., "America/Los_Angeles" -> -8, "Europe/London" -> 0)
    // For named timezones, we'll use the string itself
    const tzSum = stringToNumber(timezone.replace(/[^a-zA-Z]/g, ''));
    return reduceToSingleDigit(tzSum, false);
}

/**
 * Calculate compatibility between Life Path and Place Vibration
 */
export function calculatePlaceCompatibility(lifePath: number, placeVibration: number): {
    score: number;
    rating: 'excellent' | 'good' | 'neutral' | 'challenging';
    description: string;
} {
    // Reduce master numbers for comparison
    const lp = lifePath > 9 ? reduceToSingleDigit(lifePath, false) : lifePath;
    const pv = placeVibration > 9 ? reduceToSingleDigit(placeVibration, false) : placeVibration;

    // Compatibility matrix based on numerological harmony
    const harmonious: Record<number, number[]> = {
        1: [1, 3, 5, 9],
        2: [2, 4, 6, 8],
        3: [1, 3, 5, 6, 9],
        4: [2, 4, 6, 8],
        5: [1, 3, 5, 7, 9],
        6: [2, 3, 4, 6, 9],
        7: [5, 7],
        8: [2, 4, 6, 8],
        9: [1, 3, 5, 6, 9]
    };

    const challenging: Record<number, number[]> = {
        1: [4, 8],
        2: [5, 9],
        3: [4, 7],
        4: [1, 3, 5],
        5: [2, 4, 6],
        6: [5, 7],
        7: [3, 6, 8],
        8: [1, 7],
        9: [2, 4]
    };

    if (harmonious[lp]?.includes(pv)) {
        return {
            score: 85 + Math.floor(Math.random() * 10), // 85-94
            rating: 'excellent',
            description: `Your Life Path ${lifePath} resonates beautifully with the ${placeVibration} energy of your birthplace. This harmonious alignment suggests you were born in a place that naturally supports your life purpose.`
        };
    }

    if (challenging[lp]?.includes(pv)) {
        return {
            score: 40 + Math.floor(Math.random() * 15), // 40-54
            rating: 'challenging',
            description: `Your Life Path ${lifePath} faces growth opportunities with the ${placeVibration} energy of your birthplace. This creates dynamic tension that pushes you to evolve and adapt.`
        };
    }

    if (lp === pv) {
        return {
            score: 90 + Math.floor(Math.random() * 10), // 90-99
            rating: 'excellent',
            description: `A perfect match! Your Life Path ${lifePath} mirrors the vibration of your birthplace. This rare alignment amplifies your natural gifts and life purpose.`
        };
    }

    // Neutral
    return {
        score: 60 + Math.floor(Math.random() * 15), // 60-74
        rating: 'good',
        description: `Your Life Path ${lifePath} has a balanced relationship with the ${placeVibration} energy of your birthplace. This provides a stable foundation while allowing room for growth.`
    };
}

/**
 * Calculate full Place Energy profile
 */
export function calculatePlaceEnergy(
    placeName: string,
    latitude: number,
    longitude: number,
    timezone: string,
    lifePath: number
): PlaceEnergy {
    const placeVibration = calculatePlaceVibration(placeName);
    const geographicResonance = calculateGeographicResonance(latitude, longitude);
    const timezoneInfluence = calculateTimezoneInfluence(timezone);
    const compatibility = calculatePlaceCompatibility(lifePath, placeVibration);

    return {
        placeName,
        coordinates: { latitude, longitude },
        timezone,
        placeVibration: createNumerologyNumber(placeVibration),
        geographicResonance: createNumerologyNumber(geographicResonance),
        timezoneInfluence: createNumerologyNumber(timezoneInfluence),
        compatibility
    };
}

// ============================================
// COMPLETE PROFILE CALCULATION
// ============================================

/**
 * Calculate complete numerology profile for a user
 */
export function calculateFullProfile(userData: UserBirthData): NumerologyProfile {
    const { fullName, birthDate, location } = userData;
    const today = new Date();

    // Core numbers
    const lifePath = calculateLifePath(birthDate);
    const expression = calculateExpression(fullName);
    const soulUrge = calculateSoulUrge(fullName);
    const personality = calculatePersonality(fullName);
    const birthday = calculateBirthday(birthDate);
    const maturity = calculateMaturity(lifePath, expression);

    // Timing cycles
    const personalYear = calculatePersonalYear(birthDate, today.getFullYear());
    const personalMonth = calculatePersonalMonth(personalYear, today.getMonth() + 1);
    const personalDay = calculatePersonalDay(personalMonth, today.getDate());

    // Life phases
    const pinnacles = calculatePinnacles(birthDate);
    const challenges = calculateChallenges(birthDate);

    // Karmic info
    const karmic = calculateKarmicInfo(fullName, birthDate);

    // Place Energy (optional - only if location is provided)
    const placeEnergy = location
        ? calculatePlaceEnergy(
            location.name,
            location.latitude,
            location.longitude,
            location.timezone,
            lifePath
        )
        : undefined;

    return {
        lifePath: createNumerologyNumber(lifePath),
        expression: createNumerologyNumber(expression),
        soulUrge: createNumerologyNumber(soulUrge),
        personality: createNumerologyNumber(personality),
        personalYear: createNumerologyNumber(personalYear),
        personalMonth: createNumerologyNumber(personalMonth),
        personalDay: createNumerologyNumber(personalDay),
        pinnacles,
        challenges,
        birthday: createNumerologyNumber(birthday),
        maturity: createNumerologyNumber(maturity),
        karmic,
        placeEnergy
    };
}

/**
 * Generate daily reading for a user
 */
export function generateDailyReading(userData: UserBirthData, date: Date = new Date()): DailyReading {
    const personalYear = calculatePersonalYear(userData.birthDate, date.getFullYear());
    const personalMonth = calculatePersonalMonth(personalYear, date.getMonth() + 1);
    const personalDay = calculatePersonalDay(personalMonth, date.getDate());

    const universalYear = calculateUniversalYear(date.getFullYear());
    const universalMonth = calculateUniversalMonth(universalYear, date.getMonth() + 1);
    const universalDay = calculateUniversalDay(date);

    const yearTheme = PERSONAL_YEAR_THEMES[personalYear as keyof typeof PERSONAL_YEAR_THEMES];
    const dayMeaning = getNumberMeaning(personalDay);

    return {
        date,
        personalDay: createNumerologyNumber(personalDay),
        personalMonth: createNumerologyNumber(personalMonth),
        personalYear: createNumerologyNumber(personalYear),
        universalDay,
        universalMonth,
        universalYear,
        energyFocus: `${dayMeaning.title} energy within a ${yearTheme?.focus || 'transformative'} year`,
        actionItems: [
            yearTheme?.action || 'Follow your intuition today',
            `Embrace ${dayMeaning.keywords[0]} energy`,
            `Focus on ${dayMeaning.strengths[0].toLowerCase()}`
        ],
        timing: {
            bestFor: dayMeaning.strengths.slice(0, 2),
            avoid: dayMeaning.challenges.slice(0, 2)
        }
    };
}
