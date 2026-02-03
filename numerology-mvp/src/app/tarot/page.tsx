'use client';

import { useState } from 'react';
import { performReading, getDailyCard, yesNoReading, type TarotCard, type TarotReading, type SpreadType } from '@/lib/tarot/client';

const CARD_BACKS = ['🎴', '🃏', '✦'];

function TarotCardDisplay({ card, position }: { card: TarotCard; position?: string }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`tarot-card-display cursor-pointer ${card.isReversed && flipped ? 'reversed' : ''}`}
            onClick={() => setFlipped(!flipped)}
        >
            {!flipped ? (
                <>
                    <div className="text-5xl mb-2">{CARD_BACKS[Math.floor(Math.random() * 3)]}</div>
                    <p className="text-sm text-[var(--text-muted)]">Click to reveal</p>
                    {position && <p className="text-xs mt-2 text-[var(--nebula-purple)]">{position}</p>}
                </>
            ) : (
                <>
                    <div className="text-3xl mb-2">
                        {card.type === 'major' ? '🌟' : card.suit === 'cups' ? '🏆' : card.suit === 'wands' ? '✨' : card.suit === 'swords' ? '⚔️' : '💰'}
                    </div>
                    <h3 className="card-name">{card.name}</h3>
                    {card.isReversed && <span className="badge badge-karmic mt-1">Reversed</span>}
                    {position && <p className="text-xs mt-2 text-[var(--nebula-purple)]">{position}</p>}
                    <p className="text-sm text-[var(--text-secondary)] mt-3 max-w-[200px]">
                        {card.isReversed ? card.meaningRev : card.meaningUp}
                    </p>
                </>
            )}
        </div>
    );
}

export default function TarotPage() {
    const [readingType, setReadingType] = useState<'daily' | 'three' | 'yesno' | 'celtic'>('three');
    const [question, setQuestion] = useState('');
    const [reading, setReading] = useState<TarotReading | null>(null);
    const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
    const [yesNo, setYesNo] = useState<{ card: TarotCard; answer: string; explanation: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleReading = async () => {
        setIsLoading(true);
        setReading(null);
        setDailyCard(null);
        setYesNo(null);

        try {
            if (readingType === 'daily') {
                const card = await getDailyCard();
                setDailyCard(card);
            } else if (readingType === 'yesno') {
                const result = await yesNoReading(question || 'Should I proceed?');
                setYesNo(result);
            } else {
                const spreadType: SpreadType = readingType === 'celtic' ? 'celticCross' : 'threeCard';
                const result = await performReading(spreadType, question);
                setReading(result);
            }
        } catch (error) {
            console.error('Tarot reading error:', error);
        }

        setIsLoading(false);
    };

    return (
        <>
            <div className="cosmic-bg" />
            <main className="min-h-screen px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="page-header">
                        <h1>
                            <span className="gradient-text">Tarot Reading</span>
                        </h1>
                        <p className="subtitle">
                            Draw cards from the ancient deck to illuminate your path forward
                        </p>
                    </div>

                    {/* Reading Type Selection */}
                    <div className="section-card">
                        <h2>🎴 Choose Your Reading</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {[
                                { id: 'daily', name: 'Daily Card', icon: '☀️', desc: '1 card' },
                                { id: 'three', name: 'Past/Present/Future', icon: '🔮', desc: '3 cards' },
                                { id: 'yesno', name: 'Yes/No', icon: '❓', desc: '1 card' },
                                { id: 'celtic', name: 'Celtic Cross', icon: '✝️', desc: '10 cards' }
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setReadingType(type.id as typeof readingType)}
                                    className={`glass-card text-center cursor-pointer transition-all ${readingType === type.id ? 'border-[var(--nebula-purple)] shadow-lg' : ''
                                        }`}
                                >
                                    <div className="text-2xl">{type.icon}</div>
                                    <h3 className="font-semibold mt-2">{type.name}</h3>
                                    <p className="text-xs text-[var(--text-muted)]">{type.desc}</p>
                                </button>
                            ))}
                        </div>

                        {/* Question Input */}
                        {(readingType === 'three' || readingType === 'yesno' || readingType === 'celtic') && (
                            <div className="mt-6">
                                <label className="label-cosmic">Your Question (Optional)</label>
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder={readingType === 'yesno' ? 'Should I...?' : 'What do I need to know about...?'}
                                    className="input-cosmic"
                                />
                            </div>
                        )}

                        <button
                            onClick={handleReading}
                            className="btn-cosmic w-full mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? '🔮 Shuffling the Deck...' : '🎴 Draw Cards'}
                        </button>
                    </div>

                    {/* Loading */}
                    {isLoading && (
                        <div className="section-card text-center">
                            <div className="flex justify-center gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-16 h-24 rounded-lg bg-gradient-to-br from-[var(--nebula-purple)] to-[var(--nebula-pink)] animate-float"
                                        style={{ animationDelay: `${i * 0.15}s` }}
                                    />
                                ))}
                            </div>
                            <p className="text-[var(--text-secondary)] mt-4">The cards are being drawn...</p>
                        </div>
                    )}

                    {/* Daily Card Result */}
                    {dailyCard && !isLoading && (
                        <div className="animate-fade-in-up">
                            <div className="section-card">
                                <h2>☀️ Your Daily Card</h2>
                                <div className="flex justify-center mt-6">
                                    <TarotCardDisplay card={dailyCard} />
                                </div>
                                <div className="interpretation-block mt-6">
                                    <h4>Today&apos;s Message</h4>
                                    <p>{dailyCard.desc}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Yes/No Result */}
                    {yesNo && !isLoading && (
                        <div className="animate-fade-in-up">
                            <div className="section-card text-center">
                                <h2>❓ Your Answer</h2>
                                <div className="flex justify-center mt-6">
                                    <TarotCardDisplay card={yesNo.card} />
                                </div>
                                <div className={`text-4xl font-bold mt-6 ${yesNo.answer === 'Yes' ? 'text-green-400' :
                                        yesNo.answer === 'No' ? 'text-red-400' :
                                            'text-yellow-400'
                                    }`}>
                                    {yesNo.answer}
                                </div>
                                <div className="interpretation-block mt-6">
                                    <h4>Explanation</h4>
                                    <p>{yesNo.explanation}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Three Card / Celtic Cross Result */}
                    {reading && !isLoading && (
                        <div className="animate-fade-in-up">
                            <div className="section-card">
                                <h2>🔮 Your Reading</h2>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    Click each card to reveal its message
                                </p>

                                <div className={`grid gap-6 ${reading.spreadType === 'celticCross'
                                        ? 'grid-cols-2 md:grid-cols-5'
                                        : 'grid-cols-1 md:grid-cols-3'
                                    }`}>
                                    {reading.cards.map((cardPos) => (
                                        <TarotCardDisplay
                                            key={cardPos.position}
                                            card={cardPos.card}
                                            position={cardPos.positionName}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Interpretation */}
                            <div className="section-card">
                                <h2>📖 Reading Interpretation</h2>
                                <div className="space-y-4">
                                    {reading.cards.map((cardPos) => (
                                        <div key={cardPos.position} className="interpretation-block">
                                            <h4>{cardPos.positionName}: {cardPos.card.name}</h4>
                                            <p className="text-sm text-[var(--text-muted)] mb-1">
                                                {cardPos.positionMeaning}
                                            </p>
                                            <p>
                                                {cardPos.card.isReversed ? cardPos.card.meaningRev : cardPos.card.meaningUp}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* New Reading */}
                            <div className="text-center mt-6">
                                <button onClick={() => { setReading(null); setQuestion(''); }} className="btn-glass">
                                    ← Draw Again
                                </button>
                            </div>
                        </div>
                    )}

                    {/* About Tarot */}
                    {!reading && !dailyCard && !yesNo && !isLoading && (
                        <div className="section-card mt-8">
                            <h2>📚 About Tarot</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                The Tarot deck consists of 78 cards: 22 Major Arcana representing life&apos;s spiritual lessons,
                                and 56 Minor Arcana reflecting daily trials and tribulations. Each card holds symbolic
                                imagery that speaks to the unconscious mind.
                            </p>
                            <div className="grid md:grid-cols-4 gap-4 mt-6">
                                <div className="glass-card text-center">
                                    <div className="text-2xl">🏆</div>
                                    <h4 className="font-semibold mt-2">Cups</h4>
                                    <p className="text-xs text-[var(--text-muted)]">Emotions & Love</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="text-2xl">✨</div>
                                    <h4 className="font-semibold mt-2">Wands</h4>
                                    <p className="text-xs text-[var(--text-muted)]">Action & Energy</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="text-2xl">⚔️</div>
                                    <h4 className="font-semibold mt-2">Swords</h4>
                                    <p className="text-xs text-[var(--text-muted)]">Thoughts & Conflict</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="text-2xl">💰</div>
                                    <h4 className="font-semibold mt-2">Pentacles</h4>
                                    <p className="text-xs text-[var(--text-muted)]">Material & Work</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
