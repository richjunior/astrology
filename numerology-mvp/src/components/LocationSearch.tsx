'use client';

import { useState, useEffect, useRef } from 'react';

interface CityResult {
    id: number;
    name: string;
    displayName: string;
    latitude: number;
    longitude: number;
    timezone: string;
    country: string;
    countryCode: string;
}

interface LocationSearchProps {
    onLocationSelect: (location: {
        name: string;
        latitude: number;
        longitude: number;
        timezone: string;
    }) => void;
    initialValue?: string;
    className?: string;
}

export default function LocationSearch({
    onLocationSelect,
    initialValue = '',
    className = ''
}: LocationSearchProps) {
    const [query, setQuery] = useState(initialValue);
    const [results, setResults] = useState<CityResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (query.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data.results || []);
                setIsOpen(true);
                setSelectedIndex(-1);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query]);

    const handleSelect = (city: CityResult) => {
        setQuery(city.displayName);
        setIsOpen(false);
        onLocationSelect({
            name: city.displayName,
            latitude: city.latitude,
            longitude: city.longitude,
            timezone: city.timezone
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && results[selectedIndex]) {
                    handleSelect(results[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => results.length > 0 && setIsOpen(true)}
                    placeholder="Search city (e.g., Los Angeles, Mumbai, London)"
                    className="input-cosmic pr-10"
                    autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    ) : (
                        <span className="text-lg">🌍</span>
                    )}
                </div>
            </div>

            {/* Dropdown results */}
            {isOpen && results.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-[var(--glass-bg)] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {results.map((city, index) => (
                        <button
                            key={city.id}
                            type="button"
                            onClick={() => handleSelect(city)}
                            className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3
                                ${index === selectedIndex ? 'bg-white/10' : ''}
                                ${index !== results.length - 1 ? 'border-b border-white/5' : ''}`}
                        >
                            <span className="text-xl">📍</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">{city.name}</p>
                                <p className="text-sm text-[var(--text-muted)] truncate">
                                    {city.displayName}
                                </p>
                            </div>
                            <span className="text-xs text-[var(--text-muted)] shrink-0">
                                {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* No results message */}
            {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
                <div className="absolute z-50 w-full mt-1 bg-[var(--glass-bg)] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 text-center text-[var(--text-muted)]">
                    No cities found for &quot;{query}&quot;
                </div>
            )}
        </div>
    );
}
