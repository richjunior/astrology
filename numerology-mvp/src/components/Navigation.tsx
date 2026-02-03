'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
    { name: 'Numerology', path: '/', icon: '🔢', color: 'var(--nebula-purple)' },
    { name: 'Astrology', path: '/astrology', icon: '⭐', color: 'var(--nebula-pink)' },
    { name: 'Chinese Zodiac', path: '/chinese-zodiac', icon: '🐉', color: 'var(--nebula-orange)' },
    { name: 'I Ching', path: '/iching', icon: '☯️', color: 'var(--nebula-blue)' },
    { name: 'Tarot', path: '/tarot', icon: '🎴', color: 'var(--nebula-green)' }
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="cosmic-nav">
            <div className="nav-container">
                {/* Logo */}
                <Link href="/" className="nav-logo">
                    <span className="logo-icon">✦</span>
                    <span className="logo-text">Synchronic</span>
                </Link>

                {/* Tabs */}
                <div className="nav-tabs">
                    {TABS.map((tab) => {
                        const isActive = pathname === tab.path ||
                            (tab.path !== '/' && pathname.startsWith(tab.path));

                        return (
                            <Link
                                key={tab.path}
                                href={tab.path}
                                className={`nav-tab ${isActive ? 'active' : ''}`}
                                style={{ '--tab-color': tab.color } as React.CSSProperties}
                            >
                                <span className="tab-icon">{tab.icon}</span>
                                <span className="tab-name">{tab.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-toggle" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
