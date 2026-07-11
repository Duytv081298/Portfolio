'use client';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'accent' | 'purple' | 'danger' | 'neutral';
  icon?: string;
  size?: 'sm' | 'md';
}

const variantStyles = {
  primary: 'bg-primary-dim text-primary border-primary/30',
  accent: 'bg-accent-dim text-accent border-accent/30',
  purple: 'bg-purple-dim text-purple border-purple/30',
  danger: 'bg-danger-dim text-danger border-danger/30',
  neutral: 'bg-card text-text-secondary border-border',
};

export default function Badge({
  label,
  variant = 'primary',
  icon,
  size = 'sm',
}: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-[11px]',
    md: 'px-3 py-1.5 text-xs',
  };

  return (
    <span
      className={`
        badge ${variantStyles[variant]} ${sizeStyles[size]}
        transition-all duration-200 hover:scale-105
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}

// Pre-defined platform badges
export function PlatformBadge({ platform }: { platform: string }) {
  const config: Record<string, { variant: BadgeProps['variant']; icon: string }> = {
    'Meta': { variant: 'primary', icon: '📘' },
    'TikTok': { variant: 'danger', icon: '🎵' },
    'Google': { variant: 'accent', icon: '🔍' },
    'Unity': { variant: 'neutral', icon: '🎮' },
    'IronSource': { variant: 'purple', icon: '⚡' },
    'AppLovin': { variant: 'accent', icon: '🦁' },
    'Mobile': { variant: 'primary', icon: '📱' },
    'Web': { variant: 'accent', icon: '🌐' },
    'Facebook': { variant: 'primary', icon: '📘' },
    'Instant Game': { variant: 'purple', icon: '⚡' },
    'Playable Ad': { variant: 'danger', icon: '🎮' },
    'Google Play': { variant: 'accent', icon: '▶' },
    'App Store': { variant: 'primary', icon: '🍎' },
  };

  const cfg = config[platform] || { variant: 'neutral' as const, icon: '📦' };

  return <Badge label={platform} variant={cfg.variant} icon={cfg.icon} />;
}
