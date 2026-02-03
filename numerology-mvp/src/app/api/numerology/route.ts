/**
 * Numerology API Route - Calculate Full Profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { calculateFullProfile, generateDailyReading, type UserBirthData } from '@/lib/numerology';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, birthDate, birthTime, birthPlace, location } = body;

        // Validation
        if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
            return NextResponse.json(
                { error: 'Please provide your full name (at least 2 characters)' },
                { status: 400 }
            );
        }

        if (!birthDate) {
            return NextResponse.json(
                { error: 'Please provide your birth date' },
                { status: 400 }
            );
        }

        // Parse date as local time (user's time zone)
        // birthDate comes as 'YYYY-MM-DD' string
        const [year, month, day] = birthDate.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day);

        if (isNaN(parsedDate.getTime())) {
            return NextResponse.json(
                { error: 'Invalid birth date format' },
                { status: 400 }
            );
        }

        // Ensure date is not in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (parsedDate > today) {
            return NextResponse.json(
                { error: 'Birth date cannot be in the future' },
                { status: 400 }
            );
        }

        const userData: UserBirthData = {
            fullName: fullName.trim(),
            birthDate: parsedDate,
            birthTime,
            birthPlace: location?.name || birthPlace,
            // Pass location details for Place Energy calculation
            location: location ? {
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
                timezone: location.timezone
            } : undefined
        };

        // Calculate full profile
        const profile = calculateFullProfile(userData);
        const dailyReading = generateDailyReading(userData);

        return NextResponse.json({
            success: true,
            data: {
                input: {
                    fullName: userData.fullName,
                    // Return the raw date string to preserve user's intended date
                    birthDate: birthDate,
                    birthTime: userData.birthTime,
                    birthPlace: userData.birthPlace
                },
                profile,
                dailyReading,
                calculatedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Numerology calculation error:', error);
        return NextResponse.json(
            { error: 'Failed to calculate numerology profile' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Numerology API - Use POST with fullName and birthDate to calculate profile',
        example: {
            fullName: 'John Doe',
            birthDate: '1990-05-15',
            birthTime: '14:30', // optional
            birthPlace: 'New York, NY' // optional
        }
    });
}
