/**
 * Local Geocoding API Route - Uses bundled cities database (NO external API!)
 * Zero rate limits, instant results
 */

import { NextRequest, NextResponse } from 'next/server';
import citiesData from '@/data/cities.json';

interface City {
    i: number;      // id
    n: string;      // name
    a?: string;     // ascii name (only if different from name)
    t: string;      // latitude
    g: string;      // longitude
    c: string;      // country code
    z: string;      // timezone
    p: number;      // population
    s?: string;     // state/admin1 code
}

interface CityResult {
    id: number;
    name: string;
    displayName: string;
    latitude: number;
    longitude: number;
    timezone: string;
    country: string;
    countryCode: string;
    population: number;
}

// Country names for display
const COUNTRY_NAMES: Record<string, string> = {
    'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia',
    'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands',
    'BE': 'Belgium', 'CH': 'Switzerland', 'AT': 'Austria', 'SE': 'Sweden', 'NO': 'Norway',
    'DK': 'Denmark', 'FI': 'Finland', 'IE': 'Ireland', 'PT': 'Portugal', 'PL': 'Poland',
    'CZ': 'Czech Republic', 'GR': 'Greece', 'HU': 'Hungary', 'RO': 'Romania', 'BG': 'Bulgaria',
    'HR': 'Croatia', 'SK': 'Slovakia', 'SI': 'Slovenia', 'RS': 'Serbia', 'UA': 'Ukraine',
    'RU': 'Russia', 'TR': 'Turkey', 'IL': 'Israel', 'SA': 'Saudi Arabia', 'AE': 'UAE',
    'IN': 'India', 'CN': 'China', 'JP': 'Japan', 'KR': 'South Korea', 'TW': 'Taiwan',
    'TH': 'Thailand', 'VN': 'Vietnam', 'PH': 'Philippines', 'ID': 'Indonesia', 'MY': 'Malaysia',
    'SG': 'Singapore', 'HK': 'Hong Kong', 'NZ': 'New Zealand', 'ZA': 'South Africa',
    'EG': 'Egypt', 'NG': 'Nigeria', 'KE': 'Kenya', 'MX': 'Mexico', 'BR': 'Brazil',
    'AR': 'Argentina', 'CO': 'Colombia', 'CL': 'Chile', 'PE': 'Peru', 'VE': 'Venezuela',
    'PK': 'Pakistan', 'BD': 'Bangladesh', 'IR': 'Iran', 'IQ': 'Iraq', 'AF': 'Afghanistan',
    'CD': 'DR Congo', 'ET': 'Ethiopia', 'TZ': 'Tanzania', 'GH': 'Ghana', 'CI': 'Ivory Coast',
    'CM': 'Cameroon', 'UG': 'Uganda', 'MA': 'Morocco', 'DZ': 'Algeria', 'SD': 'Sudan',
    'NP': 'Nepal', 'MM': 'Myanmar', 'LK': 'Sri Lanka', 'KH': 'Cambodia', 'LA': 'Laos'
};

const cities = citiesData as City[];

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.toLowerCase().trim();

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    // Search through cities (data is pre-sorted by population)
    const matches: CityResult[] = [];

    for (const city of cities) {
        if (matches.length >= 8) break; // Limit results

        const name = city.n.toLowerCase();
        const ascii = city.a?.toLowerCase();

        // Match by name start or contains
        if (name.startsWith(query) || ascii?.startsWith(query) ||
            name.includes(query) || ascii?.includes(query)) {

            const countryName = COUNTRY_NAMES[city.c] || city.c;

            matches.push({
                id: city.i,
                name: city.n,
                displayName: city.s
                    ? `${city.n}, ${city.s}, ${countryName}`
                    : `${city.n}, ${countryName}`,
                latitude: parseFloat(city.t),
                longitude: parseFloat(city.g),
                timezone: city.z,
                country: countryName,
                countryCode: city.c,
                population: city.p
            });
        }
    }

    // Sort matches: prefer starts-with over contains, then by population
    matches.sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query) ? 1 : 0;
        const bStarts = b.name.toLowerCase().startsWith(query) ? 1 : 0;
        if (aStarts !== bStarts) return bStarts - aStarts;
        return b.population - a.population;
    });

    return NextResponse.json({
        results: matches.slice(0, 8),
        source: 'local' // Indicates no external API was used
    });
}
