interface ProgressBarProps {
  value: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const heights: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({ value, color = 'bg-primary', height = 'md', showLabel, label }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-xs text-[var(--text-secondary)]">{label}</span>}
          {showLabel && <span className="text-xs font-medium text-[var(--text-primary)]">%{Math.round(clampedValue)}</span>}
        </div>
      )}
      <div className={`w-full ${heights[height]} bg-gray-100 rounded-full overflow-hidden`}>
        <div
          className={`${heights[height]} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
