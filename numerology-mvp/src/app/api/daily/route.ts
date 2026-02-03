/**
 * Daily Reading API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateDailyReading, type UserBirthData } from '@/lib/numerology';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, birthDate, targetDate } = body;

        if (!fullName || !birthDate) {
            return NextResponse.json(
                { error: 'Please provide fullName and birthDate' },
                { status: 400 }
            );
        }

        const parsedBirthDate = new Date(birthDate);
        const parsedTargetDate = targetDate ? new Date(targetDate) : new Date();

        if (isNaN(parsedBirthDate.getTime())) {
            return NextResponse.json(
                { error: 'Invalid birth date format' },
                { status: 400 }
            );
        }

        const userData: UserBirthData = {
            fullName: fullName.trim(),
            birthDate: parsedBirthDate
        };

        const dailyReading = generateDailyReading(userData, parsedTargetDate);

        return NextResponse.json({
            success: true,
            data: dailyReading
        });

    } catch (error) {
        console.error('Daily reading error:', error);
        return NextResponse.json(
            { error: 'Failed to generate daily reading' },
            { status: 500 }
        );
    }
}
