'use client';

import { useState } from 'react';
import { generateNatalChart, calculateTransits, getZodiacSign, getSignDegree } from '@/lib/astrology/calculator';
import type { NatalChart, PlanetPosition } from '@/lib/astrology/types';
import { ZODIAC_SIGN_INFO } from '@/lib/astrology/constants';
import LocationSearch from '@/components/LocationSearch';

const PLANET_EMOJIS: Record<string, string> = {
    Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂',
    Jupiter: '♃', Saturn: '♄', Uranus: '♅', Neptune: '♆', Pluto: '♇'
};

const SIGN_EMOJIS: Record<string, string> = {
    Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋', Leo: '♌', Virgo: '♍',
    Libra: '♎', Scorpio: '♏', Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓'
};

function PlanetCard({ planet }: { planet: PlanetPosition }) {
    const signInfo = ZODIAC_SIGN_INFO[planet.sign];

    return (
        <div className="glass-card">
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-2xl">{PLANET_EMOJIS[planet.planet]}</span>
                    <h4 className="font-semibold mt-1">{planet.planet}</h4>
                </div>
                <div className="text-right">
                    <span className="text-xl">{SIGN_EMOJIS[planet.sign]}</span>
                    {planet.isRetrograde && <span className="badge badge-karmic ml-2">℞</span>}
                </div>
            </div>
            <p className="text-[var(--nebula-purple)] mt-2">
                {planet.sign} {Math.floor(planet.signDegree)}°
            </p>
            <p className="text-sm text-[var(--text-muted)]">
                House {planet.house} • {signInfo?.element} • {signInfo?.quality}
            </p>
        </div>
    );
}

export default function AstrologyPage() {
    const [formData, setFormData] = useState({
        birthDate: '',
        birthTime: '',
        latitude: '',
        longitude: '',
        location: '',
        timezone: 'UTC',
        isVedic: false
    });
    const [chart, setChart] = useState<NatalChart | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleCalculate = () => {
        if (!formData.birthDate || !formData.latitude || !formData.longitude) return;

        setIsLoading(true);

        setTimeout(() => {
            const dateTime = new Date(`${formData.birthDate}T${formData.birthTime || '12:00'}`);
            const natalChart = generateNatalChart({
                dateTime,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                location: formData.location,
                timezone: 'UTC'
            }, 'Placidus', formData.isVedic);

            setChart(natalChart);
            setIsLoading(false);
        }, 1000);
    };

    const ascendantSign = chart ? getZodiacSign(chart.ascendant) : null;
    const sunSign = chart?.planets.find(p => p.planet === 'Sun')?.sign;
    const moonSign = chart?.planets.find(p => p.planet === 'Moon')?.sign;

    return (
        <>
            <div className="cosmic-bg" />
            <main className="min-h-screen px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="page-header">
                        <h1>
                            <span className="gradient-text">
                                {formData.isVedic ? 'Vedic' : 'Western'} Astrology
                            </span>
                        </h1>
                        <p className="subtitle">
                            Calculate your natal chart and discover planetary influences
                        </p>
                    </div>

                    {/* Birth Data Form */}
                    <div className="section-card">
                        <h2>🌟 Enter Birth Details</h2>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="label-cosmic">Birth Date</label>
                                <input
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    className="input-cosmic"
                                />
                            </div>
                            <div>
                                <label className="label-cosmic">Birth Time</label>
                                <input
                                    type="time"
                                    value={formData.birthTime}
                                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                                    className="input-cosmic"
                                />
                                <p className="text-xs text-[var(--text-muted)] mt-1">For accurate houses/ascendant</p>
                            </div>
                        </div>

                        {/* Location Search */}
                        <div className="mt-6">
                            <label className="label-cosmic">Birth Location</label>
                            <LocationSearch
                                initialValue={formData.location}
                                onLocationSelect={(location) => {
                                    setFormData({
                                        ...formData,
                                        location: location.name,
                                        latitude: location.latitude.toString(),
                                        longitude: location.longitude.toString(),
                                        timezone: location.timezone
                                    });
                                }}
                            />
                            {formData.latitude && formData.longitude && (
                                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                                    ✓ Coordinates: {parseFloat(formData.latitude).toFixed(4)}°, {parseFloat(formData.longitude).toFixed(4)}°
                                    {formData.timezone !== 'UTC' && ` • ${formData.timezone}`}
                                </p>
                            )}
                        </div>

                        {/* Advanced Section (Collapsible) */}
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-sm text-[var(--text-muted)] hover:text-white transition-colors flex items-center gap-2"
                            >
                                <span className={`transition-transform ${showAdvanced ? 'rotate-90' : ''}`}>▶</span>
                                Advanced Options (Manual Coordinates)
                            </button>

                            {showAdvanced && (
                                <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <label className="label-cosmic">Latitude</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            value={formData.latitude}
                                            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                            placeholder="e.g., 40.7128"
                                            className="input-cosmic"
                                        />
                                        <p className="text-xs text-[var(--text-muted)] mt-1">-90 to 90</p>
                                    </div>
                                    <div>
                                        <label className="label-cosmic">Longitude</label>
                                        <input
                                            type="number"
                                            step="0.0001"
                                            value={formData.longitude}
                                            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                            placeholder="e.g., -74.0060"
                                            className="input-cosmic"
                                        />
                                        <p className="text-xs text-[var(--text-muted)] mt-1">-180 to 180</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Zodiac System Toggle */}
                        <div className="flex items-center gap-4 mt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isVedic}
                                    onChange={(e) => setFormData({ ...formData, isVedic: e.target.checked })}
                                    className="w-5 h-5 accent-[var(--nebula-purple)]"
                                />
                                <span>Use Vedic (Sidereal) zodiac</span>
                            </label>
                        </div>

                        <button
                            onClick={handleCalculate}
                            className="btn-cosmic w-full mt-6"
                            disabled={isLoading || !formData.birthDate || !formData.latitude || !formData.longitude}
                        >
                            {isLoading ? '✨ Calculating Chart...' : '✨ Generate Natal Chart'}
                        </button>
                    </div>

                    {/* Loading */}
                    {isLoading && (
                        <div className="section-card text-center">
                            <div className="text-5xl animate-float">🌌</div>
                            <p className="text-[var(--text-secondary)] mt-4">Mapping the heavens at your birth...</p>
                        </div>
                    )}

                    {/* Chart Results */}
                    {chart && !isLoading && (
                        <div className="animate-fade-in-up space-y-6">
                            {/* Big Three */}
                            <div className="section-card">
                                <h2>☀️ Your Big Three</h2>
                                <div className="grid md:grid-cols-3 gap-6 mt-6">
                                    <div className="glass-card text-center">
                                        <div className="text-5xl">{SIGN_EMOJIS[sunSign || 'Aries']}</div>
                                        <h3 className="text-2xl font-semibold mt-2">{sunSign}</h3>
                                        <p className="text-[var(--nebula-purple)]">☉ Sun Sign</p>
                                        <p className="text-sm text-[var(--text-muted)] mt-2">
                                            Your core identity, ego, and life purpose
                                        </p>
                                    </div>
                                    <div className="glass-card text-center">
                                        <div className="text-5xl">{SIGN_EMOJIS[moonSign || 'Aries']}</div>
                                        <h3 className="text-2xl font-semibold mt-2">{moonSign}</h3>
                                        <p className="text-[var(--nebula-purple)]">☽ Moon Sign</p>
                                        <p className="text-sm text-[var(--text-muted)] mt-2">
                                            Your emotional nature and inner self
                                        </p>
                                    </div>
                                    <div className="glass-card text-center">
                                        <div className="text-5xl">{SIGN_EMOJIS[ascendantSign || 'Aries']}</div>
                                        <h3 className="text-2xl font-semibold mt-2">{ascendantSign}</h3>
                                        <p className="text-[var(--nebula-purple)]">↑ Rising Sign</p>
                                        <p className="text-sm text-[var(--text-muted)] mt-2">
                                            How others perceive you, your outer mask
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* All Planets */}
                            <div className="section-card">
                                <h2>🪐 Planetary Positions</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                                    {chart.planets.map((planet) => (
                                        <PlanetCard key={planet.planet} planet={planet} />
                                    ))}
                                </div>
                            </div>

                            {/* Aspects */}
                            {chart.aspects.length > 0 && (
                                <div className="section-card">
                                    <h2>🔗 Major Aspects</h2>
                                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                                        {chart.aspects.slice(0, 8).map((aspect, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-[rgba(255,255,255,0.03)] rounded-lg">
                                                <span className="text-lg">{PLANET_EMOJIS[aspect.planet1]}</span>
                                                <span className={`text-sm font-medium ${aspect.type === 'conjunction' || aspect.type === 'trine' || aspect.type === 'sextile'
                                                    ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                    {aspect.type.charAt(0).toUpperCase() + aspect.type.slice(1)}
                                                </span>
                                                <span className="text-lg">{PLANET_EMOJIS[aspect.planet2]}</span>
                                                <span className="text-sm text-[var(--text-muted)] ml-auto">
                                                    {aspect.orb.toFixed(1)}° orb
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* House Cusps */}
                            <div className="section-card">
                                <h2>🏠 House Cusps</h2>
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                    {chart.houses.map((house) => (
                                        <div key={house.house} className="text-center p-3 bg-[rgba(255,255,255,0.03)] rounded-lg">
                                            <div className="text-sm text-[var(--text-muted)]">House {house.house}</div>
                                            <div className="font-semibold">{SIGN_EMOJIS[house.sign]}</div>
                                            <div className="text-xs text-[var(--nebula-purple)]">
                                                {house.sign} {Math.floor(house.signDegree)}°
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chart Details */}
                            <div className="section-card">
                                <h2>📊 Chart Details</h2>
                                <div className="grid md:grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <span className="text-[var(--text-muted)]">Ascendant</span>
                                        <p className="font-semibold">{chart.ascendant.toFixed(2)}°</p>
                                    </div>
                                    <div>
                                        <span className="text-[var(--text-muted)]">Midheaven (MC)</span>
                                        <p className="font-semibold">{chart.midheaven.toFixed(2)}°</p>
                                    </div>
                                    <div>
                                        <span className="text-[var(--text-muted)]">House System</span>
                                        <p className="font-semibold">{chart.houseSystem}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Calculate Again */}
                            <div className="text-center">
                                <button onClick={() => setChart(null)} className="btn-glass">
                                    ← Calculate Another Chart
                                </button>
                            </div>
                        </div>
                    )}

                    {/* About */}
                    {!chart && !isLoading && (
                        <div className="section-card mt-8">
                            <h2>📚 About Astrology</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Your birth chart (natal chart) is a snapshot of the sky at the exact moment of your birth.
                                It reveals the positions of the Sun, Moon, and planets in the zodiac signs and houses,
                                creating a unique cosmic blueprint that influences your personality, relationships, and life path.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="interpretation-block">
                                    <h4>Western (Tropical) Astrology</h4>
                                    <p>Uses the tropical zodiac based on the seasons. The Sun enters Aries at the spring equinox.</p>
                                </div>
                                <div className="interpretation-block">
                                    <h4>Vedic (Sidereal) Astrology</h4>
                                    <p>Uses the sidereal zodiac aligned with actual star constellations, adjusted by the Ayanamsa.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
