/**
 * I Ching API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { castIChingReading, getHexagramInfo } from '@/lib/iching/calculator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { question } = body;

        const reading = castIChingReading(question || 'General guidance');

        // Get additional info for transformed hexagram if exists
        let transformedHexagram = null;
        if (reading.transformedHexagramNumber) {
            transformedHexagram = getHexagramInfo(reading.transformedHexagramNumber);
        }

        return NextResponse.json({
            success: true,
            data: {
                question: question || 'General guidance',
                timestamp: new Date().toISOString(),
                primaryHexagram: {
                    number: reading.hexagramNumber,
                    name: reading.hexagramName,
                    judgment: reading.judgment
                },
                changingLines: reading.changingLines,
                transformedHexagram: transformedHexagram ? {
                    number: reading.transformedHexagramNumber,
                    ...transformedHexagram
                } : null,
                interpretation: reading.changingLines.length > 0
                    ? `The ${reading.hexagramName} transforms, suggesting change and evolution in your situation.`
                    : `The ${reading.hexagramName} indicates a stable situation. ${reading.judgment}`
            }
        });

    } catch (error) {
        console.error('I Ching error:', error);
        return NextResponse.json(
            { error: 'Failed to cast I Ching reading' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'I Ching API - POST to cast a reading',
        example: {
            question: 'What should I focus on today?'
        }
    });
}
