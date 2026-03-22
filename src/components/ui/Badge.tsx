interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'cyan' | 'critical';
  size?: 'sm' | 'md';
}

const variants: Record<string, string> = {
  default: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]',
  blue: 'bg-accent-blue/15 text-accent-blue',
  green: 'bg-accent-green/15 text-accent-green',
  red: 'bg-accent-red/15 text-accent-red',
  purple: 'bg-accent-purple/15 text-accent-purple',
  orange: 'bg-accent-orange/15 text-accent-orange',
  cyan: 'bg-accent-cyan/15 text-accent-cyan',
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
