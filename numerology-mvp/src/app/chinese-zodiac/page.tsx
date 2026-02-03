'use client';

import { useState } from 'react';
import { getChineseZodiacProfile, calculateChineseCompatibility, getCurrentChineseYear } from '@/lib/chinese-zodiac/calculator';
import type { ChineseZodiacProfile } from '@/lib/chinese-zodiac/calculator';

const ANIMAL_EMOJIS: Record<string, string> = {
    Rat: '🐀', Ox: '🐂', Tiger: '🐅', Rabbit: '🐇', Dragon: '🐉', Snake: '🐍',
    Horse: '🐎', Goat: '🐐', Monkey: '🐒', Rooster: '🐓', Dog: '🐕', Pig: '🐖'
};

export default function ChineseZodiacPage() {
    const [birthYear, setBirthYear] = useState('');
    const [compareYear, setCompareYear] = useState('');
    const [profile, setProfile] = useState<ChineseZodiacProfile | null>(null);
    const [compatibility, setCompatibility] = useState<ReturnType<typeof calculateChineseCompatibility> | null>(null);

    const currentYear = getCurrentChineseYear();

    const handleCalculate = () => {
        if (!birthYear) return;
        const p = getChineseZodiacProfile(parseInt(birthYear));
        setProfile(p);

        if (compareYear) {
            const c = calculateChineseCompatibility(parseInt(birthYear), parseInt(compareYear));
            setCompatibility(c);
        } else {
            setCompatibility(null);
        }
    };

    return (
        <>
            <div className="cosmic-bg" />
            <main className="min-h-screen px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="page-header">
                        <h1>
                            <span className="gradient-text">Chinese Zodiac</span>
                        </h1>
                        <p className="subtitle">
                            Discover your Chinese zodiac animal, element, and cosmic compatibility
                        </p>
                    </div>

                    {/* Current Year Banner */}
                    <div className="glass-card text-center mb-8">
                        <span className="text-4xl">{ANIMAL_EMOJIS[currentYear.animal]}</span>
                        <h2 className="text-xl font-semibold mt-2">
                            2026 is the Year of the {currentYear.element} {currentYear.animal}
                        </h2>
                    </div>

                    {/* Input Form */}
                    <div className="section-card">
                        <h2>🎋 Calculate Your Sign</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="label-cosmic">Your Birth Year</label>
                                <input
                                    type="number"
                                    value={birthYear}
                                    onChange={(e) => setBirthYear(e.target.value)}
                                    placeholder="e.g., 1990"
                                    className="input-cosmic"
                                    min="1900"
                                    max="2030"
                                />
                            </div>
                            <div>
                                <label className="label-cosmic">Compare With Year (Optional)</label>
                                <input
                                    type="number"
                                    value={compareYear}
                                    onChange={(e) => setCompareYear(e.target.value)}
                                    placeholder="e.g., 1992"
                                    className="input-cosmic"
                                    min="1900"
                                    max="2030"
                                />
                            </div>
                            <div className="flex items-end">
                                <button onClick={handleCalculate} className="btn-cosmic w-full">
                                    Reveal My Sign
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {profile && (
                        <div className="animate-fade-in-up space-y-6">
                            {/* Main Profile */}
                            <div className="section-card text-center">
                                <div className="zodiac-icon">{ANIMAL_EMOJIS[profile.animal]}</div>
                                <h2 className="text-3xl font-semibold">
                                    {profile.element} {profile.animal}
                                </h2>
                                <p className="text-lg text-[var(--text-secondary)] mt-2">
                                    {profile.yinYang} Energy • Born {profile.year}
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
                                    {/* Animal Traits */}
                                    <div className="interpretation-block">
                                        <h4>🐾 {profile.animal} Traits</h4>
                                        <ul className="mt-2 space-y-1">
                                            {profile.animalTraits.map((trait, i) => (
                                                <li key={i} className="text-[var(--text-secondary)]">• {trait}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Element Traits */}
                                    <div className="interpretation-block">
                                        <h4>🔥 {profile.element} Element Influence</h4>
                                        <ul className="mt-2 space-y-1">
                                            {profile.elementTraits.map((trait, i) => (
                                                <li key={i} className="text-[var(--text-secondary)]">• {trait}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Lucky Things */}
                            <div className="section-card">
                                <h2>🍀 Lucky Elements</h2>
                                <div className="grid md:grid-cols-3 gap-4 mt-4">
                                    <div className="glass-card text-center">
                                        <div className="text-2xl mb-2">🔢</div>
                                        <h3 className="font-semibold">Lucky Numbers</h3>
                                        <p className="text-[var(--text-secondary)] mt-1">
                                            {profile.luckyNumbers.join(', ')}
                                        </p>
                                    </div>
                                    <div className="glass-card text-center">
                                        <div className="text-2xl mb-2">🎨</div>
                                        <h3 className="font-semibold">Lucky Colors</h3>
                                        <p className="text-[var(--text-secondary)] mt-1">
                                            {profile.luckyColors.join(', ')}
                                        </p>
                                    </div>
                                    <div className="glass-card text-center">
                                        <div className="text-2xl mb-2">🧭</div>
                                        <h3 className="font-semibold">Lucky Directions</h3>
                                        <p className="text-[var(--text-secondary)] mt-1">
                                            {profile.luckyDirections.join(', ')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Compatibility */}
                            <div className="section-card">
                                <h2>💕 Compatibility</h2>
                                <div className="grid md:grid-cols-3 gap-4 mt-4">
                                    <div className="glass-card">
                                        <h3 className="font-semibold text-green-400 mb-2">✓ Best Matches</h3>
                                        <div className="flex gap-2 flex-wrap">
                                            {profile.compatibility.best.map((animal) => (
                                                <span key={animal} className="badge badge-power">
                                                    {ANIMAL_EMOJIS[animal]} {animal}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="glass-card">
                                        <h3 className="font-semibold text-yellow-400 mb-2">○ Good Matches</h3>
                                        <div className="flex gap-2 flex-wrap">
                                            {profile.compatibility.good.slice(0, 3).map((animal) => (
                                                <span key={animal} className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                                    {ANIMAL_EMOJIS[animal]} {animal}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="glass-card">
                                        <h3 className="font-semibold text-red-400 mb-2">⚠ Challenging</h3>
                                        <div className="flex gap-2 flex-wrap">
                                            {profile.compatibility.challenging.map((animal) => (
                                                <span key={animal} className="badge badge-karmic">
                                                    {ANIMAL_EMOJIS[animal]} {animal}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pair Compatibility */}
                            {compatibility && (
                                <div className="section-card">
                                    <h2>💞 Your Compatibility with {compatibility.animal2}</h2>
                                    <div className="text-center mt-4">
                                        <div className="flex items-center justify-center gap-8 text-5xl mb-4">
                                            <span>{ANIMAL_EMOJIS[compatibility.animal1]}</span>
                                            <span className="text-3xl">❤️</span>
                                            <span>{ANIMAL_EMOJIS[compatibility.animal2]}</span>
                                        </div>
                                        <span className={`badge text-lg px-6 py-2 ${compatibility.rating === 'Excellent' ? 'badge-power' :
                                                compatibility.rating === 'Good' ? '' :
                                                    compatibility.rating === 'Challenging' ? 'badge-karmic' : ''
                                            }`} style={compatibility.rating === 'Good' || compatibility.rating === 'Neutral' ? { background: 'rgba(255,255,255,0.1)' } : {}}>
                                            {compatibility.rating}
                                        </span>
                                        <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
                                            {compatibility.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
