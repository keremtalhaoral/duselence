interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'cyan' | 'critical' | 'primary';
  size?: 'sm' | 'md';
}

const variants: Record<string, string> = {
  default: 'bg-gray-100 text-[var(--text-secondary)]',
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-emerald-50 text-emerald-700',
  red: 'bg-red-50 text-red-700',
  purple: 'bg-violet-50 text-violet-700',
  orange: 'bg-amber-50 text-amber-700',
  cyan: 'bg-cyan-50 text-cyan-700',
  primary: 'bg-primary-light text-primary-dark',
  critical: 'critical-badge',
};

const sizes: Record<string, string> = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-lg font-semibold tracking-wide uppercase ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
