/**
 * Chinese Zodiac Calculator
 * 100% custom implementation - no API needed
 */

export type ChineseAnimal =
    | 'Rat' | 'Ox' | 'Tiger' | 'Rabbit' | 'Dragon' | 'Snake'
    | 'Horse' | 'Goat' | 'Monkey' | 'Rooster' | 'Dog' | 'Pig';

export type ChineseElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

export type YinYang = 'Yin' | 'Yang';

export interface ChineseZodiacProfile {
    animal: ChineseAnimal;
    element: ChineseElement;
    yinYang: YinYang;
    year: number;

    // Meanings
    animalTraits: string[];
    elementTraits: string[];
    compatibility: {
        best: ChineseAnimal[];
        good: ChineseAnimal[];
        challenging: ChineseAnimal[];
    };

    luckyNumbers: number[];
    luckyColors: string[];
    luckyDirections: string[];
}

const ANIMALS: ChineseAnimal[] = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];

const ELEMENTS: ChineseElement[] = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

const ANIMAL_TRAITS: Record<ChineseAnimal, { traits: string[]; lucky: { numbers: number[]; colors: string[]; directions: string[] } }> = {
    Rat: {
        traits: ['Quick-witted', 'Resourceful', 'Versatile', 'Kind', 'Smart', 'Charming'],
        lucky: { numbers: [2, 3], colors: ['Blue', 'Gold', 'Green'], directions: ['Southeast', 'Northeast'] }
    },
    Ox: {
        traits: ['Diligent', 'Dependable', 'Strong', 'Determined', 'Honest', 'Patient'],
        lucky: { numbers: [1, 4], colors: ['White', 'Yellow', 'Green'], directions: ['North', 'South'] }
    },
    Tiger: {
        traits: ['Brave', 'Competitive', 'Confident', 'Unpredictable', 'Charming', 'Authoritative'],
        lucky: { numbers: [1, 3, 4], colors: ['Blue', 'Gray', 'Orange'], directions: ['East', 'South'] }
    },
    Rabbit: {
        traits: ['Quiet', 'Elegant', 'Kind', 'Responsible', 'Patient', 'Skillful'],
        lucky: { numbers: [3, 4, 6], colors: ['Red', 'Pink', 'Purple', 'Blue'], directions: ['East', 'South'] }
    },
    Dragon: {
        traits: ['Confident', 'Intelligent', 'Ambitious', 'Enthusiastic', 'Energetic', 'Brave'],
        lucky: { numbers: [1, 6, 7], colors: ['Gold', 'Silver', 'Gray'], directions: ['East', 'North', 'South'] }
    },
    Snake: {
        traits: ['Enigmatic', 'Intelligent', 'Wise', 'Charming', 'Intuitive', 'Elegant'],
        lucky: { numbers: [2, 8, 9], colors: ['Black', 'Red', 'Yellow'], directions: ['East', 'Southwest'] }
    },
    Horse: {
        traits: ['Animated', 'Active', 'Energetic', 'Independent', 'Impatient', 'Optimistic'],
        lucky: { numbers: [2, 3, 7], colors: ['Yellow', 'Green', 'Red'], directions: ['East', 'Southwest'] }
    },
    Goat: {
        traits: ['Calm', 'Gentle', 'Sympathetic', 'Creative', 'Resilient', 'Determined'],
        lucky: { numbers: [2, 7], colors: ['Brown', 'Red', 'Purple'], directions: ['North', 'Northwest'] }
    },
    Monkey: {
        traits: ['Sharp', 'Smart', 'Curious', 'Mischievous', 'Clever', 'Sociable'],
        lucky: { numbers: [4, 9], colors: ['White', 'Blue', 'Gold'], directions: ['North', 'Northwest', 'West'] }
    },
    Rooster: {
        traits: ['Observant', 'Hardworking', 'Courageous', 'Talented', 'Confident', 'Honest'],
        lucky: { numbers: [5, 7, 8], colors: ['Gold', 'Brown', 'Yellow'], directions: ['West', 'Southwest', 'Northeast'] }
    },
    Dog: {
        traits: ['Loyal', 'Honest', 'Prudent', 'Reliable', 'Kind', 'Helpful'],
        lucky: { numbers: [3, 4, 9], colors: ['Red', 'Green', 'Purple'], directions: ['East', 'South', 'Northeast'] }
    },
    Pig: {
        traits: ['Compassionate', 'Generous', 'Diligent', 'Easy-going', 'Honest', 'Optimistic'],
        lucky: { numbers: [2, 5, 8], colors: ['Yellow', 'Gray', 'Brown', 'Gold'], directions: ['East', 'Southwest'] }
    }
};

const ELEMENT_TRAITS: Record<ChineseElement, string[]> = {
    Wood: ['Growth-oriented', 'Generous', 'Cooperative', 'Idealistic', 'Expansive'],
    Fire: ['Passionate', 'Dynamic', 'Adventurous', 'Enthusiastic', 'Competitive'],
    Earth: ['Stable', 'Practical', 'Nurturing', 'Reliable', 'Patient'],
    Metal: ['Determined', 'Persistent', 'Ambitious', 'Independent', 'Self-reliant'],
    Water: ['Intuitive', 'Flexible', 'Diplomatic', 'Perceptive', 'Resourceful']
};

const COMPATIBILITY: Record<ChineseAnimal, { best: ChineseAnimal[]; good: ChineseAnimal[]; challenging: ChineseAnimal[] }> = {
    Rat: { best: ['Dragon', 'Monkey', 'Ox'], good: ['Rat', 'Tiger', 'Snake', 'Dog', 'Pig'], challenging: ['Horse', 'Rooster'] },
    Ox: { best: ['Rat', 'Snake', 'Rooster'], good: ['Ox', 'Monkey', 'Pig'], challenging: ['Tiger', 'Dragon', 'Horse', 'Goat'] },
    Tiger: { best: ['Dragon', 'Horse', 'Pig'], good: ['Rat', 'Rabbit', 'Rooster', 'Dog'], challenging: ['Ox', 'Tiger', 'Snake', 'Monkey'] },
    Rabbit: { best: ['Goat', 'Dog', 'Pig'], good: ['Tiger', 'Rabbit', 'Snake', 'Monkey', 'Horse'], challenging: ['Rat', 'Dragon', 'Rooster'] },
    Dragon: { best: ['Rat', 'Tiger', 'Snake'], good: ['Monkey', 'Rooster', 'Pig'], challenging: ['Ox', 'Rabbit', 'Dragon', 'Dog'] },
    Snake: { best: ['Ox', 'Rooster'], good: ['Rat', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'], challenging: ['Tiger', 'Pig'] },
    Horse: { best: ['Tiger', 'Goat', 'Dog'], good: ['Rabbit', 'Dragon', 'Snake', 'Monkey', 'Rooster', 'Pig'], challenging: ['Rat', 'Ox', 'Horse'] },
    Goat: { best: ['Rabbit', 'Horse', 'Pig'], good: ['Snake', 'Goat', 'Monkey', 'Rooster'], challenging: ['Ox', 'Tiger', 'Dog'] },
    Monkey: { best: ['Rat', 'Dragon'], good: ['Ox', 'Rabbit', 'Horse', 'Goat', 'Rooster, Dog'], challenging: ['Tiger', 'Snake', 'Pig'] },
    Rooster: { best: ['Ox', 'Snake'], good: ['Tiger', 'Horse', 'Goat', 'Monkey', 'Pig'], challenging: ['Rat', 'Rabbit', 'Rooster', 'Dog'] },
    Dog: { best: ['Rabbit', 'Tiger', 'Horse'], good: ['Rat', 'Snake', 'Monkey', 'Dog', 'Pig'], challenging: ['Ox', 'Dragon', 'Goat', 'Rooster'] },
    Pig: { best: ['Tiger', 'Rabbit', 'Goat'], good: ['Rat', 'Ox', 'Dragon', 'Horse', 'Rooster', 'Dog'], challenging: ['Snake', 'Monkey'] }
};

/**
 * Calculate Chinese zodiac animal from birth year
 */
export function getChineseAnimal(year: number): ChineseAnimal {
    // Chinese zodiac cycle starts from 4 AD with Rat
    return ANIMALS[(year - 4) % 12];
}

/**
 * Calculate Chinese element from birth year
 * Each element rules for 2 years (yang then yin)
 */
export function getChineseElement(year: number): ChineseElement {
    return ELEMENTS[Math.floor(((year - 4) % 10) / 2)];
}

/**
 * Get Yin or Yang based on year
 */
export function getYinYang(year: number): YinYang {
    return year % 2 === 0 ? 'Yang' : 'Yin';
}

/**
 * Get complete Chinese zodiac profile
 */
export function getChineseZodiacProfile(birthYear: number): ChineseZodiacProfile {
    const animal = getChineseAnimal(birthYear);
    const element = getChineseElement(birthYear);
    const yinYang = getYinYang(birthYear);

    const animalData = ANIMAL_TRAITS[animal];
    const elementTraits = ELEMENT_TRAITS[element];
    const compat = COMPATIBILITY[animal];

    return {
        animal,
        element,
        yinYang,
        year: birthYear,
        animalTraits: animalData.traits,
        elementTraits,
        compatibility: compat,
        luckyNumbers: animalData.lucky.numbers,
        luckyColors: animalData.lucky.colors,
        luckyDirections: animalData.lucky.directions
    };
}

/**
 * Calculate compatibility between two people
 */
export function calculateChineseCompatibility(year1: number, year2: number): {
    animal1: ChineseAnimal;
    animal2: ChineseAnimal;
    rating: 'Excellent' | 'Good' | 'Neutral' | 'Challenging';
    description: string;
} {
    const animal1 = getChineseAnimal(year1);
    const animal2 = getChineseAnimal(year2);
    const compat = COMPATIBILITY[animal1];

    let rating: 'Excellent' | 'Good' | 'Neutral' | 'Challenging';
    let description: string;

    if (compat.best.includes(animal2)) {
        rating = 'Excellent';
        description = `${animal1} and ${animal2} are highly compatible. This is one of the best matches in Chinese astrology.`;
    } else if (compat.good.includes(animal2)) {
        rating = 'Good';
        description = `${animal1} and ${animal2} have good compatibility. With understanding, this can be a harmonious relationship.`;
    } else if (compat.challenging.includes(animal2)) {
        rating = 'Challenging';
        description = `${animal1} and ${animal2} may face challenges. Extra effort and understanding are needed.`;
    } else {
        rating = 'Neutral';
        description = `${animal1} and ${animal2} have neutral compatibility. The relationship depends on other factors.`;
    }

    return { animal1, animal2, rating, description };
}

/**
 * Get current Chinese year info
 */
export function getCurrentChineseYear(): { animal: ChineseAnimal; element: ChineseElement; year: number } {
    const now = new Date();
    let year = now.getFullYear();

    // Chinese New Year is typically late Jan/early Feb
    // This is a simplification - actual date varies
    if (now.getMonth() === 0 && now.getDate() < 22) {
        year -= 1;
    }

    return {
        year,
        animal: getChineseAnimal(year),
        element: getChineseElement(year)
    };
}
