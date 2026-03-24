'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, Pill, UtensilsCrossed, Calendar, TrendingUp, Settings } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Ana Sayfa', icon: Home },
  { href: '/antrenman', label: 'Antrenman', icon: Dumbbell },
  { href: '/takviye', label: 'Takviye', icon: Pill },
  { href: '/beslenme', label: 'Beslenme', icon: UtensilsCrossed },
  { href: '/protokol', label: 'Protokol', icon: Calendar },
  { href: '/ilerleme', label: 'İlerleme', icon: TrendingUp },
  { href: '/ayarlar', label: 'Ayarlar', icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 md:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.slice(0, 6).map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 active:scale-90 ${
                  isActive
                    ? 'text-primary'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop side nav */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-20 flex-col items-center py-6 gap-1 bg-white/90 backdrop-blur-xl border-r border-gray-100">
        <div className="mb-6">
          <span className="text-xl font-bold gradient-text">D</span>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 w-16 active:scale-90 ${
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-gray-50'
              }`}
              title={item.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
