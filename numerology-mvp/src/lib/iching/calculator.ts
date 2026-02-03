/**
 * I Ching Engine
 * Wrapper around the i-ching npm package
 */

export interface Hexagram {
    number: number;           // 1-64
    name: string;
    chineseName: string;
    meaning: string;
    judgment: string;
    image: string;
    lines: LineReading[];
    upperTrigram: Trigram;
    lowerTrigram: Trigram;
}

export interface Trigram {
    name: string;
    chineseName: string;
    attribute: string;
    image: string;
    family: string;
}

export interface LineReading {
    position: number;         // 1-6 (bottom to top)
    type: 'yang' | 'yin';
    changing: boolean;
    text: string;
}

export interface IChingReading {
    question: string;
    timestamp: Date;
    method: 'coins' | 'yarrow';
    primaryHexagram: Hexagram;
    relatedHexagram?: Hexagram; // if there are changing lines
    changingLines: number[];
    interpretation: string;
}

// Hexagram data - abbreviated for space, full data would be in separate file
const HEXAGRAMS: Partial<Record<number, { name: string; chinese: string; meaning: string; judgment: string }>> = {
    1: { name: 'The Creative', chinese: '乾', meaning: 'Heaven over Heaven', judgment: 'The Creative works sublime success, furthering through perseverance.' },
    2: { name: 'The Receptive', chinese: '坤', meaning: 'Earth over Earth', judgment: 'The Receptive brings about sublime success, furthering through the perseverance of a mare.' },
    3: { name: 'Difficulty at the Beginning', chinese: '屯', meaning: 'Water over Thunder', judgment: 'Difficulty at the beginning works supreme success. It furthers one to appoint helpers.' },
    11: { name: 'Peace', chinese: '泰', meaning: 'Earth over Heaven', judgment: 'Peace. The small departs, The great approaches. Good fortune. Success.' },
    12: { name: 'Standstill', chinese: '否', meaning: 'Heaven over Earth', judgment: 'Standstill. Evil people do not further. The perseverance of the superior man. The great departs, the small approaches.' },
    23: { name: 'Splitting Apart', chinese: '剝', meaning: 'Mountain over Earth', judgment: 'Splitting Apart. It does not further one to go anywhere.' },
    24: { name: 'Return', chinese: '復', meaning: 'Earth over Thunder', judgment: 'Return. Success. Going out and coming in without error. Friends come without blame.' },
    // Add more hexagrams as needed...
};

const TRIGRAMS = {
    heaven: { name: 'Heaven', chinese: '乾', attribute: 'Creative', image: 'Sky', family: 'Father' },
    earth: { name: 'Earth', chinese: '坤', attribute: 'Receptive', image: 'Ground', family: 'Mother' },
    thunder: { name: 'Thunder', chinese: '震', attribute: 'Arousing', image: 'Storm', family: 'Eldest Son' },
    water: { name: 'Water', chinese: '坎', attribute: 'Abysmal', image: 'Rain', family: 'Middle Son' },
    mountain: { name: 'Mountain', chinese: '艮', attribute: 'Keeping Still', image: 'Peak', family: 'Youngest Son' },
    wind: { name: 'Wind', chinese: '巽', attribute: 'Gentle', image: 'Breeze', family: 'Eldest Daughter' },
    fire: { name: 'Fire', chinese: '離', attribute: 'Clinging', image: 'Flame', family: 'Middle Daughter' },
    lake: { name: 'Lake', chinese: '兌', attribute: 'Joyous', image: 'Pool', family: 'Youngest Daughter' }
};

/**
 * Generate a random hexagram using the three-coin method
 */
export function castCoins(): { lines: number[]; changingLines: number[] } {
    const lines: number[] = [];
    const changingLines: number[] = [];

    for (let i = 0; i < 6; i++) {
        // Simulate 3 coin tosses
        // Heads = 3, Tails = 2
        let value = 0;
        for (let j = 0; j < 3; j++) {
            value += Math.random() < 0.5 ? 3 : 2;
        }

        // 6 = old yin (changing), 7 = yang, 8 = yin, 9 = old yang (changing)
        lines.push(value);
        if (value === 6 || value === 9) {
            changingLines.push(i + 1);
        }
    }

    return { lines, changingLines };
}

/**
 * Convert line values to binary for hexagram lookup
 */
function linesToBinary(lines: number[]): string {
    return lines.map(l => (l === 7 || l === 9) ? '1' : '0').join('');
}

/**
 * Get transformed hexagram (after changing lines flip)
 */
function getTransformedLines(lines: number[]): number[] {
    return lines.map(l => {
        if (l === 6) return 7;  // old yin -> young yang
        if (l === 9) return 8;  // old yang -> young yin
        return l;
    });
}

/**
 * Look up hexagram by its binary representation
 */
function lookupHexagram(binary: string): number {
    // This is a simplified lookup - real implementation needs full mapping
    const binaryToHexagram: Record<string, number> = {
        '111111': 1,  // The Creative
        '000000': 2,  // The Receptive
        '100010': 3,  // Difficulty at the Beginning
        '000111': 11, // Peace
        '111000': 12, // Standstill
        '000001': 23, // Splitting Apart
        '100000': 24, // Return
        // Add complete mapping...
    };

    return binaryToHexagram[binary] || 1;
}

/**
 * Cast an I Ching reading
 */
export function castIChingReading(question: string): {
    hexagramNumber: number;
    hexagramName: string;
    changingLines: number[];
    transformedHexagramNumber?: number;
    judgment: string;
} {
    const { lines, changingLines } = castCoins();
    const binary = linesToBinary(lines);
    const hexagramNumber = lookupHexagram(binary);
    const hexagram = HEXAGRAMS[hexagramNumber] || HEXAGRAMS[1]!;

    let transformedHexagramNumber: number | undefined;
    if (changingLines.length > 0) {
        const transformedLines = getTransformedLines(lines);
        const transformedBinary = linesToBinary(transformedLines);
        transformedHexagramNumber = lookupHexagram(transformedBinary);
    }

    return {
        hexagramNumber,
        hexagramName: hexagram.name,
        changingLines,
        transformedHexagramNumber,
        judgment: hexagram.judgment
    };
}

/**
 * Get hexagram info by number
 */
export function getHexagramInfo(number: number): { name: string; chinese: string; meaning: string; judgment: string } | null {
    return HEXAGRAMS[number] || null;
}

export { TRIGRAMS };
