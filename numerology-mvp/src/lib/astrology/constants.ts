/**
 * Astrology Constants
 */

export const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

export const PLANETS = {
    Sun: { id: 0, symbol: '☉', element: 'Fire', ruler: 'Leo' },
    Moon: { id: 1, symbol: '☽', element: 'Water', ruler: 'Cancer' },
    Mercury: { id: 2, symbol: '☿', element: 'Air', ruler: 'Gemini/Virgo' },
    Venus: { id: 3, symbol: '♀', element: 'Earth', ruler: 'Taurus/Libra' },
    Mars: { id: 4, symbol: '♂', element: 'Fire', ruler: 'Aries' },
    Jupiter: { id: 5, symbol: '♃', element: 'Fire', ruler: 'Sagittarius' },
    Saturn: { id: 6, symbol: '♄', element: 'Earth', ruler: 'Capricorn' },
    Uranus: { id: 7, symbol: '♅', element: 'Air', ruler: 'Aquarius' },
    Neptune: { id: 8, symbol: '♆', element: 'Water', ruler: 'Pisces' },
    Pluto: { id: 9, symbol: '♇', element: 'Water', ruler: 'Scorpio' },
    NorthNode: { id: 10, symbol: '☊', element: 'N/A', ruler: 'N/A' },
    Chiron: { id: 15, symbol: '⚷', element: 'N/A', ruler: 'N/A' }
} as const;

export const HOUSE_SYSTEMS = {
    Placidus: 'P',
    Koch: 'K',
    Porphyrius: 'O',
    Regiomontanus: 'R',
    Campanus: 'C',
    Equal: 'E',
    WholeSign: 'W',
    Meridian: 'X',
    Morinus: 'M'
} as const;

export const ASPECTS = {
    conjunction: { angle: 0, orb: 8, symbol: '☌', nature: 'major' },
    opposition: { angle: 180, orb: 8, symbol: '☍', nature: 'major' },
    trine: { angle: 120, orb: 8, symbol: '△', nature: 'major' },
    square: { angle: 90, orb: 7, symbol: '□', nature: 'major' },
    sextile: { angle: 60, orb: 6, symbol: '⚹', nature: 'major' },
    quincunx: { angle: 150, orb: 3, symbol: '⚻', nature: 'minor' },
    semisextile: { angle: 30, orb: 2, symbol: '⚺', nature: 'minor' },
    semisquare: { angle: 45, orb: 2, symbol: '∠', nature: 'minor' },
    sesquisquare: { angle: 135, orb: 2, symbol: '⚼', nature: 'minor' },
    quintile: { angle: 72, orb: 2, symbol: 'Q', nature: 'minor' },
    biquintile: { angle: 144, orb: 2, symbol: 'bQ', nature: 'minor' }
} as const;

export const NAKSHATRAS = [
    { name: 'Ashwini', lord: 'Ketu', degrees: [0, 13.333] },
    { name: 'Bharani', lord: 'Venus', degrees: [13.333, 26.667] },
    { name: 'Krittika', lord: 'Sun', degrees: [26.667, 40] },
    { name: 'Rohini', lord: 'Moon', degrees: [40, 53.333] },
    { name: 'Mrigashira', lord: 'Mars', degrees: [53.333, 66.667] },
    { name: 'Ardra', lord: 'Rahu', degrees: [66.667, 80] },
    { name: 'Punarvasu', lord: 'Jupiter', degrees: [80, 93.333] },
    { name: 'Pushya', lord: 'Saturn', degrees: [93.333, 106.667] },
    { name: 'Ashlesha', lord: 'Mercury', degrees: [106.667, 120] },
    { name: 'Magha', lord: 'Ketu', degrees: [120, 133.333] },
    { name: 'PurvaPhalguni', lord: 'Venus', degrees: [133.333, 146.667] },
    { name: 'UttaraPhalguni', lord: 'Sun', degrees: [146.667, 160] },
    { name: 'Hasta', lord: 'Moon', degrees: [160, 173.333] },
    { name: 'Chitra', lord: 'Mars', degrees: [173.333, 186.667] },
    { name: 'Swati', lord: 'Rahu', degrees: [186.667, 200] },
    { name: 'Vishakha', lord: 'Jupiter', degrees: [200, 213.333] },
    { name: 'Anuradha', lord: 'Saturn', degrees: [213.333, 226.667] },
    { name: 'Jyeshtha', lord: 'Mercury', degrees: [226.667, 240] },
    { name: 'Mula', lord: 'Ketu', degrees: [240, 253.333] },
    { name: 'PurvaAshadha', lord: 'Venus', degrees: [253.333, 266.667] },
    { name: 'UttaraAshadha', lord: 'Sun', degrees: [266.667, 280] },
    { name: 'Shravana', lord: 'Moon', degrees: [280, 293.333] },
    { name: 'Dhanishta', lord: 'Mars', degrees: [293.333, 306.667] },
    { name: 'Shatabhisha', lord: 'Rahu', degrees: [306.667, 320] },
    { name: 'PurvaBhadrapada', lord: 'Jupiter', degrees: [320, 333.333] },
    { name: 'UttaraBhadrapada', lord: 'Saturn', degrees: [333.333, 346.667] },
    { name: 'Revati', lord: 'Mercury', degrees: [346.667, 360] }
] as const;

export const SIGN_MEANINGS = {
    Aries: { element: 'Fire', quality: 'Cardinal', ruler: 'Mars', symbol: '♈', keywords: ['action', 'initiative', 'courage', 'leadership'] },
    Taurus: { element: 'Earth', quality: 'Fixed', ruler: 'Venus', symbol: '♉', keywords: ['stability', 'sensuality', 'values', 'persistence'] },
    Gemini: { element: 'Air', quality: 'Mutable', ruler: 'Mercury', symbol: '♊', keywords: ['communication', 'curiosity', 'adaptability', 'wit'] },
    Cancer: { element: 'Water', quality: 'Cardinal', ruler: 'Moon', symbol: '♋', keywords: ['nurturing', 'emotion', 'home', 'protection'] },
    Leo: { element: 'Fire', quality: 'Fixed', ruler: 'Sun', symbol: '♌', keywords: ['creativity', 'pride', 'generosity', 'drama'] },
    Virgo: { element: 'Earth', quality: 'Mutable', ruler: 'Mercury', symbol: '♍', keywords: ['analysis', 'service', 'health', 'perfectionism'] },
    Libra: { element: 'Air', quality: 'Cardinal', ruler: 'Venus', symbol: '♎', keywords: ['balance', 'partnership', 'harmony', 'diplomacy'] },
    Scorpio: { element: 'Water', quality: 'Fixed', ruler: 'Pluto', symbol: '♏', keywords: ['transformation', 'intensity', 'depth', 'power'] },
    Sagittarius: { element: 'Fire', quality: 'Mutable', ruler: 'Jupiter', symbol: '♐', keywords: ['expansion', 'philosophy', 'adventure', 'truth'] },
    Capricorn: { element: 'Earth', quality: 'Cardinal', ruler: 'Saturn', symbol: '♑', keywords: ['ambition', 'structure', 'discipline', 'achievement'] },
    Aquarius: { element: 'Air', quality: 'Fixed', ruler: 'Uranus', symbol: '♒', keywords: ['innovation', 'humanity', 'freedom', 'originality'] },
    Pisces: { element: 'Water', quality: 'Mutable', ruler: 'Neptune', symbol: '♓', keywords: ['intuition', 'compassion', 'dreams', 'spirituality'] }
} as const;

// Alias for type compatibility
export const ZODIAC_SIGN_INFO = SIGN_MEANINGS;

export const PLANET_MEANINGS = {
    Sun: { domain: 'Identity & Ego', represents: 'Core self, vitality, purpose, father', keywords: ['self', 'ego', 'will', 'creativity'] },
    Moon: { domain: 'Emotions & Subconscious', represents: 'Emotions, instincts, mother, home', keywords: ['feelings', 'needs', 'nurturing', 'habits'] },
    Mercury: { domain: 'Communication & Intellect', represents: 'Mind, communication, learning, siblings', keywords: ['thinking', 'speaking', 'writing', 'travel'] },
    Venus: { domain: 'Love & Values', represents: 'Love, beauty, pleasure, money, relationships', keywords: ['attraction', 'harmony', 'art', 'pleasure'] },
    Mars: { domain: 'Action & Drive', represents: 'Energy, aggression, sex drive, courage', keywords: ['assertion', 'passion', 'competition', 'anger'] },
    Jupiter: { domain: 'Growth & Expansion', represents: 'Luck, growth, philosophy, higher learning', keywords: ['expansion', 'optimism', 'wisdom', 'abundance'] },
    Saturn: { domain: 'Structure & Limitation', represents: 'Discipline, karma, time, authority', keywords: ['restriction', 'responsibility', 'lessons', 'maturity'] },
    Uranus: { domain: 'Revolution & Awakening', represents: 'Sudden change, innovation, rebellion', keywords: ['freedom', 'originality', 'disruption', 'genius'] },
    Neptune: { domain: 'Dreams & Spirituality', represents: 'Illusion, spirituality, creativity, escapism', keywords: ['imagination', 'intuition', 'dissolution', 'transcendence'] },
    Pluto: { domain: 'Transformation & Power', represents: 'Death/rebirth, power, hidden depths', keywords: ['transformation', 'intensity', 'regeneration', 'obsession'] }
} as const;

// Lahiri Ayanamsa for Vedic calculations (2000.0 epoch)
export const AYANAMSA_LAHIRI_2000 = 23.856;
export const AYANAMSA_YEARLY_RATE = 0.0139; // degrees per year

export function getCurrentAyanamsa(year: number): number {
    return AYANAMSA_LAHIRI_2000 + (year - 2000) * AYANAMSA_YEARLY_RATE;
}
