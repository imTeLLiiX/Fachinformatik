import { cn } from '@/lib/utils';

interface ProgressRadialProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  metric: 'completion' | 'accuracy' | 'speed';
  label?: string;
  className?: string;
}

const metricColors = {
  completion: 'stroke-blue-500',
  accuracy: 'stroke-green-500',
  speed: 'stroke-yellow-500'
};

const metricLabels = {
  completion: 'Abschluss',
  accuracy: 'Genauigkeit',
  speed: 'Geschwindigkeit'
};

export function ProgressRadial({
  value,
  max = 100,
  size = 100,
  strokeWidth = 8,
  metric,
  label,
  className
}: ProgressRadialProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * circumference;
  const offset = circumference - progress;

  return (
    <div className={cn('relative inline-flex', className)}>
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={cn('transition-all duration-300 ease-out', metricColors[metric])}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{value}%</span>
        <span className="text-sm text-muted-foreground">
          {label || metricLabels[metric]}
        </span>
      </div>
    </div>
  );
} 