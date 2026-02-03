/**
 * Tarot API Client
 * Uses the free tarotapi.dev API
 */

export interface TarotCard {
    name: string;
    nameShort: string;
    value: string;
    valueInt: number;
    suit?: string;
    type: 'major' | 'minor';
    meaningUp: string;
    meaningRev: string;
    desc: string;
    isReversed: boolean;
}

export interface TarotReading {
    question?: string;
    timestamp: Date;
    spreadType: SpreadType;
    cards: TarotCardPosition[];
    interpretation: string;
}

export interface TarotCardPosition {
    position: number;
    positionName: string;
    positionMeaning: string;
    card: TarotCard;
}

export type SpreadType = 'single' | 'threeCard' | 'celticCross';

const TAROT_API_BASE = 'https://tarotapi.dev/api/v1';

// Position meanings for different spreads
const SPREAD_POSITIONS = {
    single: [
        { position: 1, name: 'The Answer', meaning: 'The core message for your question' }
    ],
    threeCard: [
        { position: 1, name: 'Past', meaning: 'Influences from the past affecting the situation' },
        { position: 2, name: 'Present', meaning: 'Current state and immediate influences' },
        { position: 3, name: 'Future', meaning: 'Potential outcome if current path continues' }
    ],
    celticCross: [
        { position: 1, name: 'Present', meaning: 'Your current situation' },
        { position: 2, name: 'Challenge', meaning: 'Immediate challenge or obstacle' },
        { position: 3, name: 'Past', meaning: 'Recent past influences' },
        { position: 4, name: 'Future', meaning: 'Near future events' },
        { position: 5, name: 'Above', meaning: 'Your goal or best outcome' },
        { position: 6, name: 'Below', meaning: 'Subconscious influences' },
        { position: 7, name: 'Advice', meaning: 'Suggested approach' },
        { position: 8, name: 'External', meaning: 'External influences and environment' },
        { position: 9, name: 'Hopes/Fears', meaning: 'Your hopes and fears' },
        { position: 10, name: 'Outcome', meaning: 'Final outcome' }
    ]
};

/**
 * Fetch random cards from the Tarot API
 */
export async function drawCards(count: number = 1): Promise<TarotCard[]> {
    try {
        const response = await fetch(`${TAROT_API_BASE}/cards/random?n=${count}`);

        if (!response.ok) {
            throw new Error('Failed to fetch tarot cards');
        }

        const data = await response.json();

        return data.cards.map((card: {
            name: string;
            name_short: string;
            value: string;
            value_int: number;
            suit?: string;
            type: string;
            meaning_up: string;
            meaning_rev: string;
            desc: string;
        }) => ({
            name: card.name,
            nameShort: card.name_short,
            value: card.value,
            valueInt: card.value_int,
            suit: card.suit,
            type: card.type === 'major' ? 'major' : 'minor',
            meaningUp: card.meaning_up,
            meaningRev: card.meaning_rev,
            desc: card.desc,
            isReversed: Math.random() < 0.3 // 30% chance of reversal
        }));
    } catch (error) {
        console.error('Tarot API error:', error);
        // Return fallback card
        return [{
            name: 'The Fool',
            nameShort: 'ar00',
            value: '0',
            valueInt: 0,
            type: 'major',
            meaningUp: 'New beginnings, innocence, spontaneity, free spirit',
            meaningRev: 'Holding back, recklessness, risk-taking',
            desc: 'The Fool represents new beginnings and adventures.',
            isReversed: false
        }];
    }
}

/**
 * Get all tarot cards (for reference)
 */
export async function getAllCards(): Promise<TarotCard[]> {
    try {
        const response = await fetch(`${TAROT_API_BASE}/cards`);
        const data = await response.json();

        return data.cards.map((card: {
            name: string;
            name_short: string;
            value: string;
            value_int: number;
            suit?: string;
            type: string;
            meaning_up: string;
            meaning_rev: string;
            desc: string;
        }) => ({
            name: card.name,
            nameShort: card.name_short,
            value: card.value,
            valueInt: card.value_int,
            suit: card.suit,
            type: card.type === 'major' ? 'major' : 'minor',
            meaningUp: card.meaning_up,
            meaningRev: card.meaning_rev,
            desc: card.desc,
            isReversed: false
        }));
    } catch (error) {
        console.error('Tarot API error:', error);
        return [];
    }
}

/**
 * Perform a tarot reading with a specific spread
 */
export async function performReading(
    spreadType: SpreadType = 'threeCard',
    question?: string
): Promise<TarotReading> {
    const positions = SPREAD_POSITIONS[spreadType];
    const cards = await drawCards(positions.length);

    const cardPositions: TarotCardPosition[] = positions.map((pos, index) => ({
        position: pos.position,
        positionName: pos.name,
        positionMeaning: pos.meaning,
        card: cards[index]
    }));

    // Generate interpretation
    const interpretation = generateInterpretation(cardPositions, question);

    return {
        question,
        timestamp: new Date(),
        spreadType,
        cards: cardPositions,
        interpretation
    };
}

/**
 * Generate a basic interpretation for the reading
 */
function generateInterpretation(cards: TarotCardPosition[], question?: string): string {
    const parts: string[] = [];

    if (question) {
        parts.push(`Regarding your question: "${question}"\n`);
    }

    cards.forEach(({ positionName, positionMeaning, card }) => {
        const meaning = card.isReversed ? card.meaningRev : card.meaningUp;
        const reverseNote = card.isReversed ? ' (Reversed)' : '';

        parts.push(`**${positionName}**: ${card.name}${reverseNote}`);
        parts.push(`${positionMeaning}: ${meaning}`);
        parts.push('');
    });

    return parts.join('\n');
}

/**
 * Get a single daily card
 */
export async function getDailyCard(): Promise<TarotCard> {
    const cards = await drawCards(1);
    return cards[0];
}

/**
 * Perform a Yes/No reading (single card)
 */
export async function yesNoReading(question: string): Promise<{
    card: TarotCard;
    answer: 'Yes' | 'No' | 'Maybe';
    explanation: string;
}> {
    const cards = await drawCards(1);
    const card = cards[0];

    // Major arcana and upright generally lean positive
    // This is a simplified interpretation
    let answer: 'Yes' | 'No' | 'Maybe';

    if (card.isReversed) {
        answer = 'No';
    } else if (card.type === 'major') {
        answer = 'Yes';
    } else {
        // Minor arcana - depends on suit
        const positiveSuits = ['cups', 'pentacles'];
        answer = card.suit && positiveSuits.includes(card.suit.toLowerCase()) ? 'Yes' : 'Maybe';
    }

    return {
        card,
        answer,
        explanation: `${card.name}${card.isReversed ? ' (Reversed)' : ''}: ${card.isReversed ? card.meaningRev : card.meaningUp}`
    };
}
