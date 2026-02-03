/**
 * Chinese Zodiac API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    getChineseZodiacProfile,
    calculateChineseCompatibility,
    getCurrentChineseYear
} from '@/lib/chinese-zodiac/calculator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { birthYear, compareYear } = body;

        if (!birthYear) {
            return NextResponse.json(
                { error: 'Please provide birthYear' },
                { status: 400 }
            );
        }

        const profile = getChineseZodiacProfile(parseInt(birthYear));
        const currentYear = getCurrentChineseYear();

        let compatibility = null;
        if (compareYear) {
            compatibility = calculateChineseCompatibility(
                parseInt(birthYear),
                parseInt(compareYear)
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                profile,
                currentYear,
                compatibility
            }
        });

    } catch (error) {
        console.error('Chinese zodiac error:', error);
        return NextResponse.json(
            { error: 'Failed to calculate Chinese zodiac' },
            { status: 500 }
        );
    }
}

export async function GET() {
    const currentYear = getCurrentChineseYear();

    return NextResponse.json({
        message: 'Chinese Zodiac API - POST with birthYear to get profile',
        currentYear,
        example: {
            birthYear: 1990,
            compareYear: 1992 // optional - for compatibility
        }
    });
}
