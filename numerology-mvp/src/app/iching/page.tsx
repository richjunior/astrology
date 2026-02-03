'use client';

import { useState } from 'react';
import { castIChingReading, getHexagramInfo } from '@/lib/iching/calculator';

export default function IChingPage() {
    const [question, setQuestion] = useState('');
    const [reading, setReading] = useState<ReturnType<typeof castIChingReading> | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCast = () => {
        setIsLoading(true);

        // Simulate casting delay for effect
        setTimeout(() => {
            const result = castIChingReading(question || 'General guidance');
            setReading(result);
            setIsLoading(false);
        }, 1500);
    };

    // Generate random lines for display
    const generateDisplayLines = (hexNum: number): ('yang' | 'yin')[] => {
        const patterns: Record<number, ('yang' | 'yin')[]> = {
            1: ['yang', 'yang', 'yang', 'yang', 'yang', 'yang'],
            2: ['yin', 'yin', 'yin', 'yin', 'yin', 'yin'],
            3: ['yin', 'yin', 'yin', 'yang', 'yin', 'yang'],
            11: ['yin', 'yin', 'yin', 'yang', 'yang', 'yang'],
            12: ['yang', 'yang', 'yang', 'yin', 'yin', 'yin'],
            23: ['yang', 'yin', 'yin', 'yin', 'yin', 'yin'],
            24: ['yin', 'yin', 'yin', 'yin', 'yin', 'yang']
        };
        return patterns[hexNum] || ['yang', 'yin', 'yang', 'yin', 'yang', 'yin'];
    };

    return (
        <>
            <div className="cosmic-bg" />
            <main className="min-h-screen px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="page-header">
                        <h1>
                            <span className="gradient-text">I Ching</span>
                        </h1>
                        <p className="subtitle">
                            The Book of Changes • Ancient Chinese wisdom for modern guidance
                        </p>
                    </div>

                    {/* Question Input */}
                    <div className="section-card">
                        <h2>☯️ Ask the Oracle</h2>
                        <p className="text-[var(--text-secondary)] mb-4">
                            Focus on your question, then cast the coins. The I Ching responds best to open-ended questions about situations rather than yes/no queries.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="label-cosmic">Your Question</label>
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="What do I need to understand about my current situation?"
                                    className="input-cosmic min-h-[100px]"
                                />
                            </div>

                            <button
                                onClick={handleCast}
                                className="btn-cosmic w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? '🎲 Casting Coins...' : '🎲 Cast the Coins'}
                            </button>
                        </div>
                    </div>

                    {/* Loading Animation */}
                    {isLoading && (
                        <div className="section-card text-center">
                            <div className="text-4xl animate-float">☯️</div>
                            <p className="text-[var(--text-secondary)] mt-4">
                                The coins are falling...
                            </p>
                            <div className="flex justify-center gap-4 mt-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 rounded-full bg-[var(--stardust-gold)] animate-float"
                                        style={{ animationDelay: `${i * 0.2}s` }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reading Result */}
                    {reading && !isLoading && (
                        <div className="animate-fade-in-up space-y-6">
                            {/* Hexagram Display */}
                            <div className="section-card text-center">
                                <div className="mb-4">
                                    <span className="badge badge-master">Hexagram {reading.hexagramNumber}</span>
                                </div>

                                {/* Hexagram Lines */}
                                <div className="hexagram-lines">
                                    {generateDisplayLines(reading.hexagramNumber).reverse().map((type, i) => (
                                        <div key={i} className={`hexagram-line ${type}`}>
                                            {type === 'yin' && (
                                                <>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        width: '45%',
                                                        height: '100%',
                                                        background: 'var(--nebula-purple)',
                                                        borderRadius: '4px'
                                                    }} />
                                                    <span style={{ width: '10%', display: 'inline-block' }} />
                                                    <span style={{
                                                        display: 'inline-block',
                                                        width: '45%',
                                                        height: '100%',
                                                        background: 'var(--nebula-purple)',
                                                        borderRadius: '4px'
                                                    }} />
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <h2 className="text-3xl font-semibold mt-6">
                                    {reading.hexagramName}
                                </h2>

                                {reading.changingLines.length > 0 && (
                                    <p className="text-[var(--text-secondary)] mt-2">
                                        Changing lines: {reading.changingLines.join(', ')}
                                    </p>
                                )}
                            </div>

                            {/* Judgment */}
                            <div className="section-card">
                                <h2>📜 The Judgment</h2>
                                <div className="interpretation-block">
                                    <p className="text-lg leading-relaxed">
                                        {reading.judgment}
                                    </p>
                                </div>
                            </div>

                            {/* Guidance */}
                            <div className="section-card">
                                <h2>🔮 Guidance</h2>
                                <div className="interpretation-block">
                                    <h4>For Your Question</h4>
                                    <p>
                                        {question || 'General guidance'}: The {reading.hexagramName} suggests
                                        that this is a time for {
                                            reading.hexagramNumber === 1 ? 'bold action and creative initiative' :
                                                reading.hexagramNumber === 2 ? 'receptivity and patient waiting' :
                                                    reading.hexagramNumber === 11 ? 'harmony and peaceful progress' :
                                                        reading.hexagramNumber === 12 ? 'caution and internal cultivation' :
                                                            'careful consideration and mindful action'
                                        }. Trust the process and remain open to the wisdom unfolding.
                                    </p>
                                </div>

                                {reading.transformedHexagramNumber && (
                                    <div className="interpretation-block mt-4">
                                        <h4>Transformation Ahead</h4>
                                        <p>
                                            The changing lines indicate movement toward Hexagram {reading.transformedHexagramNumber}
                                            {getHexagramInfo(reading.transformedHexagramNumber) &&
                                                ` (${getHexagramInfo(reading.transformedHexagramNumber)!.name})`
                                            }. This transformation suggests evolution in your situation.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Cast Again */}
                            <div className="text-center">
                                <button onClick={() => setReading(null)} className="btn-glass">
                                    ← Ask Another Question
                                </button>
                            </div>
                        </div>
                    )}

                    {/* About I Ching */}
                    {!reading && !isLoading && (
                        <div className="section-card mt-8">
                            <h2>📚 About the I Ching</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                The I Ching, or Book of Changes, is one of the oldest divination systems in the world,
                                dating back over 3,000 years. It consists of 64 hexagrams, each made of six lines that
                                are either solid (yang ☰) or broken (yin ☷).
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
                                By casting three coins six times, we generate a hexagram that reflects the energy
                                of your current situation. Some lines may be &quot;changing,&quot; indicating transformation
                                from one state to another.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
