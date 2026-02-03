/**
 * Tarot API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    performReading,
    getDailyCard,
    yesNoReading,
    type SpreadType
} from '@/lib/tarot/client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            spreadType = 'threeCard',
            question,
            readingType = 'spread' // 'spread' | 'daily' | 'yesno'
        } = body;

        let result;

        switch (readingType) {
            case 'daily':
                const dailyCard = await getDailyCard();
                result = {
                    type: 'daily',
                    card: dailyCard,
                    message: dailyCard.isReversed
                        ? dailyCard.meaningRev
                        : dailyCard.meaningUp
                };
                break;

            case 'yesno':
                if (!question) {
                    return NextResponse.json(
                        { error: 'Please provide a question for yes/no reading' },
                        { status: 400 }
                    );
                }
                result = await yesNoReading(question);
                result = { type: 'yesno', ...result };
                break;

            default:
                const reading = await performReading(
                    spreadType as SpreadType,
                    question
                );
                result = { type: 'spread', ...reading };
        }

        return NextResponse.json({
            success: true,
            data: {
                ...result,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Tarot error:', error);
        return NextResponse.json(
            { error: 'Failed to perform tarot reading' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Tarot API - POST to get a reading',
        readingTypes: ['spread', 'daily', 'yesno'],
        spreadTypes: ['single', 'threeCard', 'celticCross'],
        example: {
            readingType: 'spread',
            spreadType: 'threeCard',
            question: 'What do I need to know about my career path?'
        }
    });
}
