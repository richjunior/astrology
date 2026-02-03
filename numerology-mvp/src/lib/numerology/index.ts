/**
 * Numerology Engine - Main Export
 * Single entry point for all numerology functionality
 */

// Export all types
export type {
    NumerologyProfile,
    NumerologyNumber,
    Pinnacle,
    KarmicInfo,
    DailyReading,
    UserBirthData,
    NumerologyCalculationResult,
    PlaceEnergy
} from './types';

// Export constants
export {
    PYTHAGOREAN_MAP,
    CHALDEAN_MAP,
    VOWELS,
    MASTER_NUMBERS,
    KARMIC_DEBT_NUMBERS,
    NUMBER_MEANINGS,
    PERSONAL_YEAR_THEMES
} from './constants';

// Export all calculation functions
export {
    // Utility functions
    reduceToSingleDigit,
    sumDigits,
    stringToNumber,
    isMasterNumber,
    isKarmicDebt,
    getNumberMeaning,
    createNumerologyNumber,

    // Core number calculations
    calculateLifePath,
    calculateExpression,
    calculateSoulUrge,
    calculatePersonality,
    calculateBirthday,
    calculateMaturity,

    // Timing cycles
    calculatePersonalYear,
    calculatePersonalMonth,
    calculatePersonalDay,
    calculateUniversalYear,
    calculateUniversalMonth,
    calculateUniversalDay,

    // Life phases
    calculatePinnacles,
    calculateChallenges,

    // Karmic analysis
    calculateKarmicInfo,

    // Place Energy calculations
    calculatePlaceVibration,
    calculateGeographicResonance,
    calculateTimezoneInfluence,
    calculatePlaceCompatibility,
    calculatePlaceEnergy,

    // Complete calculations
    calculateFullProfile,
    generateDailyReading
} from './calculator';

// Export interpretations
export { DETAILED_INTERPRETATIONS, getDetailedInterpretation } from './interpretations';
