/**
 * Numerology Constants
 * Letter mappings and master number definitions
 */

// Pythagorean Letter-to-Number Chart
export const PYTHAGOREAN_MAP: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

// Chaldean Letter-to-Number Chart (alternative system)
export const CHALDEAN_MAP: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
    s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7
};

// Vowels for Soul Urge calculation
export const VOWELS = ['a', 'e', 'i', 'o', 'u'];

// Y is sometimes a vowel (when it sounds like a vowel)
// For simplicity, we treat Y as consonant; can be enhanced later
export const SOMETIMES_VOWELS = ['y'];

// Master Numbers (not reduced further)
export const MASTER_NUMBERS = [11, 22, 33];

// Karmic Debt Numbers
export const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];

// Number meanings for interpretations
export const NUMBER_MEANINGS = {
    1: {
        title: 'The Leader',
        theme: 'Independence, new beginnings, originality',
        keywords: ['pioneer', 'individual', 'ambitious', 'self-starter'],
        strengths: ['Leadership', 'Innovation', 'Courage', 'Determination'],
        challenges: ['Stubbornness', 'Ego', 'Impatience', 'Selfishness'],
        element: 'Fire',
        planet: 'Sun'
    },
    2: {
        title: 'The Diplomat',
        theme: 'Partnership, balance, sensitivity',
        keywords: ['peacemaker', 'intuitive', 'cooperative', 'supportive'],
        strengths: ['Diplomacy', 'Patience', 'Intuition', 'Empathy'],
        challenges: ['Over-sensitivity', 'Indecision', 'Dependency', 'Timidity'],
        element: 'Water',
        planet: 'Moon'
    },
    3: {
        title: 'The Communicator',
        theme: 'Expression, creativity, joy',
        keywords: ['creative', 'expressive', 'social', 'optimistic'],
        strengths: ['Creativity', 'Communication', 'Enthusiasm', 'Inspiration'],
        challenges: ['Scattered energy', 'Superficiality', 'Exaggeration', 'Mood swings'],
        element: 'Fire',
        planet: 'Jupiter'
    },
    4: {
        title: 'The Builder',
        theme: 'Foundation, stability, hard work',
        keywords: ['practical', 'organized', 'reliable', 'disciplined'],
        strengths: ['Organization', 'Discipline', 'Loyalty', 'Practicality'],
        challenges: ['Rigidity', 'Stubbornness', 'Limitation', 'Workaholism'],
        element: 'Earth',
        planet: 'Uranus'
    },
    5: {
        title: 'The Freedom Seeker',
        theme: 'Change, adventure, freedom',
        keywords: ['adventurous', 'versatile', 'curious', 'dynamic'],
        strengths: ['Adaptability', 'Resourcefulness', 'Adventure', 'Freedom'],
        challenges: ['Restlessness', 'Inconsistency', 'Excess', 'Irresponsibility'],
        element: 'Air',
        planet: 'Mercury'
    },
    6: {
        title: 'The Nurturer',
        theme: 'Love, responsibility, family',
        keywords: ['caring', 'responsible', 'protective', 'harmonious'],
        strengths: ['Responsibility', 'Love', 'Service', 'Harmony'],
        challenges: ['Self-sacrifice', 'Worry', 'Control', 'Perfectionism'],
        element: 'Earth',
        planet: 'Venus'
    },
    7: {
        title: 'The Seeker',
        theme: 'Wisdom, spirituality, analysis',
        keywords: ['spiritual', 'analytical', 'introspective', 'wise'],
        strengths: ['Wisdom', 'Intuition', 'Analysis', 'Spirituality'],
        challenges: ['Isolation', 'Skepticism', 'Secrecy', 'Aloofness'],
        element: 'Water',
        planet: 'Neptune'
    },
    8: {
        title: 'The Powerhouse',
        theme: 'Abundance, power, achievement',
        keywords: ['ambitious', 'authoritative', 'successful', 'material'],
        strengths: ['Leadership', 'Achievement', 'Abundance', 'Executive ability'],
        challenges: ['Workaholism', 'Materialism', 'Control', 'Impatience'],
        element: 'Earth',
        planet: 'Saturn'
    },
    9: {
        title: 'The Humanitarian',
        theme: 'Completion, wisdom, universal love',
        keywords: ['compassionate', 'generous', 'idealistic', 'wise'],
        strengths: ['Compassion', 'Wisdom', 'Generosity', 'Universal love'],
        challenges: ['Martyrdom', 'Resentment', 'Emotional distance', 'Scattered focus'],
        element: 'Fire',
        planet: 'Mars'
    },
    11: {
        title: 'The Illuminator',
        theme: 'Spiritual insight, intuition, inspiration',
        keywords: ['visionary', 'intuitive', 'inspirational', 'sensitive'],
        strengths: ['Spiritual insight', 'Intuition', 'Inspiration', 'Vision'],
        challenges: ['Nervous energy', 'Impracticality', 'Self-doubt', 'Overwhelm'],
        element: 'Air',
        planet: 'Pluto',
        isMaster: true
    },
    22: {
        title: 'The Master Builder',
        theme: 'Manifestation, large-scale achievement, vision',
        keywords: ['master builder', 'practical visionary', 'powerful', 'disciplined'],
        strengths: ['Manifestation', 'Vision', 'Leadership', 'Practical idealism'],
        challenges: ['Overwhelm', 'Self-doubt', 'Workaholic tendencies', 'Pressure'],
        element: 'Earth',
        planet: 'Pluto',
        isMaster: true
    },
    33: {
        title: 'The Master Teacher',
        theme: 'Healing, blessing, spiritual service',
        keywords: ['master healer', 'teacher', 'selfless service', 'spiritual'],
        strengths: ['Healing', 'Teaching', 'Compassion', 'Spiritual mastery'],
        challenges: ['Martyrdom', 'Overwhelm', 'Self-sacrifice', 'Burden of responsibility'],
        element: 'Water',
        planet: 'Pluto',
        isMaster: true
    }
} as const;

// Personal Year cycle descriptions for daily/monthly timing
export const PERSONAL_YEAR_THEMES = {
    1: {
        focus: 'New Beginnings',
        energy: 'Initiative and independence',
        action: 'Start new projects, take the lead, plant seeds for the future',
        avoid: 'Waiting for others, staying in comfort zone'
    },
    2: {
        focus: 'Patience & Partnerships',
        energy: 'Cooperation and diplomacy',
        action: 'Build relationships, wait for right timing, develop patience',
        avoid: 'Forcing outcomes, going it alone'
    },
    3: {
        focus: 'Self-Expression',
        energy: 'Creativity and joy',
        action: 'Express creatively, socialize, embrace joy and optimism',
        avoid: 'Scattering energy, superficial connections'
    },
    4: {
        focus: 'Building Foundations',
        energy: 'Discipline and hard work',
        action: 'Create structure, work steadily, build for the future',
        avoid: 'Shortcuts, neglecting responsibilities'
    },
    5: {
        focus: 'Change & Freedom',
        energy: 'Adventure and expansion',
        action: 'Embrace change, travel, take calculated risks',
        avoid: 'Stagnation, excess, recklessness'
    },
    6: {
        focus: 'Love & Responsibility',
        energy: 'Home, family, service',
        action: 'Focus on family, beautify surroundings, accept responsibility',
        avoid: 'Neglecting self, over-giving, controlling others'
    },
    7: {
        focus: 'Reflection & Wisdom',
        energy: 'Introspection and spiritual growth',
        action: 'Study, meditate, seek deeper truths, trust intuition',
        avoid: 'Isolation, over-analysis, skepticism'
    },
    8: {
        focus: 'Achievement & Abundance',
        energy: 'Power and manifestation',
        action: 'Focus on career, finances, step into leadership',
        avoid: 'Materialism, power struggles, workaholism'
    },
    9: {
        focus: 'Completion & Release',
        energy: 'Endings and transformation',
        action: 'Let go of what no longer serves, complete cycles, give back',
        avoid: 'Clinging to the past, starting new ventures'
    }
} as const;

export type NumberMeaning = typeof NUMBER_MEANINGS[keyof typeof NUMBER_MEANINGS];
