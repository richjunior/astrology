/**
 * Astrology API Route - Natal Chart Calculation
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateNatalChart, calculateTransits } from '@/lib/astrology/calculator';
import type { BirthData, HouseSystem } from '@/lib/astrology/types';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            dateTime,
            latitude,
            longitude,
            timezone = 'UTC',
            location,
            houseSystem = 'Placidus',
            isVedic = false,
            includeTransits = true
        } = body;

        // Validation
        if (!dateTime) {
            return NextResponse.json(
                { error: 'Please provide dateTime (birth date and time)' },
                { status: 400 }
            );
        }

        if (latitude === undefined || longitude === undefined) {
            return NextResponse.json(
                { error: 'Please provide latitude and longitude of birth place' },
                { status: 400 }
            );
        }

        const birthData: BirthData = {
            dateTime: new Date(dateTime),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            timezone,
            location
        };

        // Generate natal chart
        const natalChart = generateNatalChart(
            birthData,
            houseSystem as HouseSystem,
            isVedic
        );

        // Optionally include current transits
        let transits = null;
        if (includeTransits) {
            transits = calculateTransits(natalChart);
        }

        return NextResponse.json({
            success: true,
            data: {
                natalChart,
                transits,
                metadata: {
                    houseSystem,
                    isVedic,
                    calculatedAt: new Date().toISOString()
                }
            }
        });

    } catch (error) {
        console.error('Astrology calculation error:', error);
        return NextResponse.json(
            { error: 'Failed to calculate natal chart' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Astrology API - POST to calculate natal chart',
        example: {
            dateTime: '1990-05-15T14:30:00Z',
            latitude: 40.7128,
            longitude: -74.0060,
            location: 'New York, NY',
            timezone: 'America/New_York',
            houseSystem: 'Placidus',
            isVedic: false,
            includeTransits: true
        },
        houseSystems: ['Placidus', 'Koch', 'WholeSign', 'Equal', 'Campanus', 'Regiomontanus', 'Porphyrius', 'Morinus', 'Meridian']
    });
}
