'use client';

import { useState } from 'react';
import type { NumerologyProfile, DailyReading, PlaceEnergy } from '@/lib/numerology';
import { DETAILED_INTERPRETATIONS } from '@/lib/numerology/interpretations';
import LocationSearch from '@/components/LocationSearch';

interface NumerologyData {
  input: {
    fullName: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;
  };
  profile: NumerologyProfile;
  dailyReading: DailyReading;
}

interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export default function HomePage() {
  const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState('');
  const [data, setData] = useState<NumerologyData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      setError('Please enter your full name');
      return;
    }

    if (!birthDate) {
      setError('Please select your birth date');
      return;
    }

    setStep('loading');

    try {
      const response = await fetch('/api/numerology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          birthDate,
          birthTime: birthTime || undefined,
          location: location || undefined
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to calculate');
      }

      setData(result.data);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('input');
    }
  };

  const resetForm = () => {
    setStep('input');
    setData(null);
    setFullName('');
    setBirthDate('');
    setBirthTime('');
    setLocation(null);
    setError('');
  };

  return (
    <>
      <div className="cosmic-bg" />

      <main className="min-h-screen px-4 py-12">
        {step === 'input' && (
          <div className="max-w-xl mx-auto animate-fade-in-up">
            {/* Hero */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-[var(--text-secondary)]">Free • No Sign Up Required</span>
              </div>

              <h1 className="hero-title mb-4">
                Discover Your<br />
                <span className="gradient-text">Numerology Blueprint</span>
              </h1>

              <p className="text-lg text-[var(--text-secondary)] max-w-md mx-auto">
                Unlock the hidden patterns in your name and birth date.
                Get your complete numerology profile in seconds.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-card">
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="label-cosmic">Full Birth Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name as on birth certificate"
                    className="input-cosmic"
                    autoComplete="name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="birthDate" className="label-cosmic">Date of Birth</label>
                    <input
                      type="date"
                      id="birthDate"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="input-cosmic"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label htmlFor="birthTime" className="label-cosmic">Time of Birth <span className="text-[var(--text-muted)]">(optional)</span></label>
                    <input
                      type="time"
                      id="birthTime"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="input-cosmic"
                      placeholder="12:00"
                    />
                  </div>
                </div>

                {/* Birthplace Location Search */}
                <div>
                  <label className="label-cosmic">Birthplace <span className="text-[var(--text-muted)]">(optional, for Place Energy)</span></label>
                  <LocationSearch
                    initialValue=""
                    onLocationSelect={(loc) => setLocation(loc)}
                  />
                  {location && (
                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      ✓ {location.name} • {location.timezone}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button type="submit" className="btn-cosmic w-full">
                  ✨ Reveal My Numbers
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center gap-6 text-[var(--text-muted)] text-sm">
              <span>🔒 100% Private</span>
              <span>⚡ Instant Results</span>
              <span>🎯 Accurate</span>
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className="max-w-xl mx-auto text-center py-20">
            <div className="number-glow animate-float mb-8">✦</div>
            <h2 className="text-2xl font-semibold mb-2">Calculating Your Blueprint...</h2>
            <p className="text-[var(--text-secondary)]">Analyzing the sacred patterns in your name and birth date</p>

            <div className="mt-8 space-y-3">
              <div className="skeleton h-4 w-3/4 mx-auto" />
              <div className="skeleton h-4 w-1/2 mx-auto" />
              <div className="skeleton h-4 w-2/3 mx-auto" />
            </div>
          </div>
        )}

        {step === 'result' && data && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="text-center">
              <button
                onClick={resetForm}
                className="btn-glass mb-6"
              >
                ← Calculate Another
              </button>

              <h1 className="text-3xl font-semibold mb-2">
                Numerology Blueprint for <span className="gradient-text">{data.input.fullName}</span>
              </h1>
              <p className="text-[var(--text-secondary)]">
                Born {(() => {
                  // Parse date string directly to avoid timezone issues
                  const [year, month, day] = data.input.birthDate.split('-').map(Number);
                  const dateStr = new Date(year, month - 1, day).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });

                  // Format time if provided (convert 24h to 12h format)
                  if (data.input.birthTime) {
                    const [hours, minutes] = data.input.birthTime.split(':').map(Number);
                    const period = hours >= 12 ? 'PM' : 'AM';
                    const hour12 = hours % 12 || 12;
                    return `${dateStr} at ${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
                  }
                  return dateStr;
                })()}
              </p>
            </div>

            {/* Life Path - Featured */}
            <div className="glass-card text-center">
              <div className="inline-block">
                {data.profile.lifePath.isMaster && (
                  <span className="badge badge-master mb-4">Master Number</span>
                )}
              </div>

              <div className={`number-glow ${data.profile.lifePath.isMaster ? 'master' : ''}`}>
                {data.profile.lifePath.value}
              </div>

              <h2 className="text-2xl font-semibold mt-4 mb-2">
                Life Path: {data.profile.lifePath.title}
              </h2>

              <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
                {data.profile.lifePath.theme}
              </p>

              {/* Detailed Interpretation */}
              <div className="text-left bg-white/5 rounded-2xl p-6 mt-6">
                <h3 className="text-lg font-semibold mb-3 text-[var(--nebula-purple)]">Your Life Path Reading</h3>
                <p className="text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">
                  {DETAILED_INTERPRETATIONS.lifePath[data.profile.lifePath.value as keyof typeof DETAILED_INTERPRETATIONS.lifePath]?.summary ||
                    data.profile.lifePath.description}
                </p>
              </div>
            </div>

            {/* Place Energy Section (only if location was provided) */}
            {data.profile.placeEnergy && (
              <div className="glass-card">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  🌍 Birthplace Energy: <span className="gradient-text">{data.profile.placeEnergy.placeName}</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {/* Place Vibration */}
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[var(--nebula-purple)]">
                      {data.profile.placeEnergy.placeVibration.value}
                    </div>
                    <div className="font-medium mt-1">Place Vibration</div>
                    <div className="text-sm text-[var(--text-muted)]">{data.profile.placeEnergy.placeVibration.title}</div>
                    <p className="text-xs text-[var(--text-muted)] mt-2">From city name</p>
                  </div>

                  {/* Geographic Resonance */}
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[var(--celestial-blue)]">
                      {data.profile.placeEnergy.geographicResonance.value}
                    </div>
                    <div className="font-medium mt-1">Geographic Resonance</div>
                    <div className="text-sm text-[var(--text-muted)]">{data.profile.placeEnergy.geographicResonance.title}</div>
                    <p className="text-xs text-[var(--text-muted)] mt-2">
                      {data.profile.placeEnergy.coordinates.latitude.toFixed(2)}°, {data.profile.placeEnergy.coordinates.longitude.toFixed(2)}°
                    </p>
                  </div>

                  {/* Timezone Influence */}
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[var(--aurora-green)]">
                      {data.profile.placeEnergy.timezoneInfluence.value}
                    </div>
                    <div className="font-medium mt-1">Timezone Influence</div>
                    <div className="text-sm text-[var(--text-muted)]">{data.profile.placeEnergy.timezoneInfluence.title}</div>
                    <p className="text-xs text-[var(--text-muted)] mt-2">{data.profile.placeEnergy.timezone}</p>
                  </div>
                </div>

                {/* Compatibility Section */}
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Life Path + Place Compatibility</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${data.profile.placeEnergy.compatibility.rating === 'excellent' ? 'bg-green-500/20 text-green-400' :
                        data.profile.placeEnergy.compatibility.rating === 'good' ? 'bg-blue-500/20 text-blue-400' :
                          data.profile.placeEnergy.compatibility.rating === 'neutral' ? 'bg-gray-500/20 text-gray-400' :
                            'bg-amber-500/20 text-amber-400'
                      }`}>
                      {data.profile.placeEnergy.compatibility.score}% • {data.profile.placeEnergy.compatibility.rating.charAt(0).toUpperCase() + data.profile.placeEnergy.compatibility.rating.slice(1)}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full transition-all ${data.profile.placeEnergy.compatibility.rating === 'excellent' ? 'bg-green-400' :
                          data.profile.placeEnergy.compatibility.rating === 'good' ? 'bg-blue-400' :
                            data.profile.placeEnergy.compatibility.rating === 'neutral' ? 'bg-gray-400' :
                              'bg-amber-400'
                        }`}
                      style={{ width: `${data.profile.placeEnergy.compatibility.score}%` }}
                    />
                  </div>

                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {data.profile.placeEnergy.compatibility.description}
                  </p>
                </div>
              </div>
            )}

            {/* Core Numbers Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Expression */}
              <div className="glass-card number-card">
                <div className="number">{data.profile.expression.value}</div>
                <div className="title">Expression Number</div>
                <div className="label">{data.profile.expression.title}</div>
                <p className="text-sm text-[var(--text-muted)] mt-2">{data.profile.expression.theme}</p>
              </div>

              {/* Soul Urge */}
              <div className="glass-card number-card">
                <div className="number">{data.profile.soulUrge.value}</div>
                <div className="title">Soul Urge Number</div>
                <div className="label">{data.profile.soulUrge.title}</div>
                <p className="text-sm text-[var(--text-muted)] mt-2">{data.profile.soulUrge.theme}</p>
              </div>

              {/* Personality */}
              <div className="glass-card number-card">
                <div className="number">{data.profile.personality.value}</div>
                <div className="title">Personality Number</div>
                <div className="label">{data.profile.personality.title}</div>
                <p className="text-sm text-[var(--text-muted)] mt-2">{data.profile.personality.theme}</p>
              </div>
            </div>

            {/* Today's Energy */}
            <div className="glass-card">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🌟</span>
                <div>
                  <h3 className="text-xl font-semibold">Today&apos;s Synchronic Pulse</h3>
                  <p className="text-[var(--text-muted)]">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-[var(--nebula-purple)]">{data.profile.personalDay.value}</div>
                  <div className="text-sm text-[var(--text-muted)]">Personal Day</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-[var(--nebula-pink)]">{data.profile.personalMonth.value}</div>
                  <div className="text-sm text-[var(--text-muted)]">Personal Month</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-[var(--nebula-blue)]">{data.profile.personalYear.value}</div>
                  <div className="text-sm text-[var(--text-muted)]">Personal Year</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[var(--nebula-purple)]/10 to-[var(--nebula-pink)]/10 rounded-xl p-5 border border-white/5">
                <p className="text-lg mb-4">{data.dailyReading.energyFocus}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">✓ Best For Today</h4>
                    <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                      {data.dailyReading.timing.bestFor.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-400 mb-2">⚠ Avoid Today</h4>
                    <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                      {data.dailyReading.timing.avoid.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinnacles */}
            <div className="glass-card">
              <h3 className="text-xl font-semibold mb-6">Your Life Phases (Pinnacles)</h3>

              <div className="grid md:grid-cols-4 gap-4">
                {data.profile.pinnacles.map((pinnacle, i) => (
                  <div
                    key={i}
                    className={`text-center p-4 rounded-xl transition-all ${pinnacle.isActive
                      ? 'bg-[var(--nebula-purple)]/20 border border-[var(--nebula-purple)]/30'
                      : 'bg-white/5'
                      }`}
                  >
                    {pinnacle.isActive && (
                      <span className="badge badge-power mb-2">Current Phase</span>
                    )}
                    <div className="text-3xl font-bold mb-1">{pinnacle.number.value}</div>
                    <div className="text-sm font-medium">{pinnacle.number.title}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-2">
                      Ages {pinnacle.startAge} - {pinnacle.endAge || '∞'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Karmic Insights */}
            {(data.profile.karmic.karmicLessons.length > 0 || data.profile.karmic.hiddenPassions.length > 0) && (
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-6">Karmic Insights</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {data.profile.karmic.karmicLessons.length > 0 && (
                    <div>
                      <h4 className="font-medium text-amber-400 mb-3">Karmic Lessons</h4>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">
                        These numbers are missing from your name, indicating areas for growth:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {data.profile.karmic.karmicLessons.map(num => (
                          <span key={num} className="badge badge-karmic">{num}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.profile.karmic.hiddenPassions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-400 mb-3">Hidden Passions</h4>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">
                        These numbers appear frequently, indicating natural talents:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {data.profile.karmic.hiddenPassions.map(num => (
                          <span key={num} className="badge badge-power">{num}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="glass-card text-center">
              <h3 className="text-xl font-semibold mb-2">Want Deeper Insights?</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Get daily personalized readings, compatibility reports, and more
              </p>
              <button className="btn-cosmic">
                Coming Soon ✨
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-[var(--text-muted)] text-sm">
              <p>Calculated using traditional Pythagorean numerology</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
