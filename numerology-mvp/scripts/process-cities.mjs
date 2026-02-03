/**
 * Process GeoNames cities15000.txt into a compact JSON file for local search
 * Run with: node scripts/process-cities.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFile = join(__dirname, '..', 'cities15000.txt');
const outputFile = join(__dirname, '..', 'src', 'data', 'cities.json');

console.log('📍 Processing GeoNames cities15000.txt...');

// GeoNames file format (tab-separated):
// 0: geonameid
// 1: name
// 2: asciiname
// 3: alternatenames
// 4: latitude
// 5: longitude
// 6: feature class
// 7: feature code
// 8: country code
// 9: cc2
// 10: admin1 code
// 11: admin2 code
// 12: admin3 code
// 13: admin4 code
// 14: population
// 15: elevation
// 16: dem
// 17: timezone
// 18: modification date

const countryNames = {
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
    'PK': 'Pakistan', 'BD': 'Bangladesh', 'IR': 'Iran', 'IQ': 'Iraq', 'AF': 'Afghanistan'
};

const data = readFileSync(inputFile, 'utf-8');
const lines = data.split('\n').filter(line => line.trim());

console.log(`📊 Found ${lines.length.toLocaleString()} cities`);

const cities = [];

for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length < 18) continue;

    const [
        id, name, asciiName, altNames, lat, lng,
        featureClass, featureCode, countryCode, cc2,
        admin1, admin2, admin3, admin4, population,
        elevation, dem, timezone
    ] = parts;

    const pop = parseInt(population) || 0;

    // Include all cities (cities15000 = pop > 15000)
    cities.push({
        i: parseInt(id),                          // id
        n: name,                                   // name
        a: asciiName !== name ? asciiName : undefined,  // ascii name (only if different)
        t: lat,                                    // latitude
        g: lng,                                    // longitude  
        c: countryCode,                            // country code
        z: timezone,                               // timezone
        p: pop,                                    // population
        s: admin1 || undefined                     // state/region code
    });
}

// Sort by population (most populous first for better search results)
cities.sort((a, b) => b.p - a.p);

console.log(`✅ Processed ${cities.length.toLocaleString()} cities`);
console.log(`🔝 Top 5 cities by population:`);
cities.slice(0, 5).forEach((c, i) => {
    console.log(`   ${i + 1}. ${c.n}, ${c.c} (pop: ${c.p.toLocaleString()})`);
});

// Ensure output directory exists
import { mkdirSync } from 'fs';
try {
    mkdirSync(join(__dirname, '..', 'src', 'data'), { recursive: true });
} catch (e) { }

// Write compact JSON (no pretty printing to save space)
writeFileSync(outputFile, JSON.stringify(cities));

const stats = {
    cities: cities.length,
    fileSizeKB: Math.round(JSON.stringify(cities).length / 1024)
};

console.log(`\n📦 Output: src/data/cities.json`);
console.log(`📏 Size: ${stats.fileSizeKB.toLocaleString()} KB`);
console.log(`\n✨ Done! Cities database ready for local search.`);
