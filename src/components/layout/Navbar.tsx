'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeStore } from '@/store/useThemeStore';

const navItems = [
  { href: '/', label: 'Ana Sayfa', icon: '🏠' },
  { href: '/antrenman', label: 'Antrenman', icon: '💪' },
  { href: '/takviye', label: 'Takviye', icon: '💊' },
  { href: '/protokol', label: 'Protokol', icon: '📋' },
  { href: '/ilerleme', label: 'İlerleme', icon: '📊' },
  { href: '/ayarlar', label: 'Ayarlar', icon: '⚙️' },
];

export function Navbar() {
  const pathname = usePathname();
  const { isDark, toggle } = useThemeStore();

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav md:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-accent-blue scale-105'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop side nav */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-20 flex-col items-center py-6 gap-2 glass-nav border-r border-[var(--border-card)]">
        <div className="mb-4">
          <span className="text-2xl font-bold gradient-text">D</span>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 w-16 ${
                isActive
                  ? 'bg-accent-blue/10 text-accent-blue'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
              }`}
              title={item.label}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <div className="mt-auto">
          <button
            onClick={toggle}
            className="p-2 rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-card)] transition-all"
            title={isDark ? 'Açık mod' : 'Koyu mod'}
          >
            <span className="text-xl">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
