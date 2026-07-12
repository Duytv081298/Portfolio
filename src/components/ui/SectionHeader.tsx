import { type ReactNode } from 'react';

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: string;
  accent?: string;
  icon?: ReactNode;
  align?: 'left' | 'center';
  index?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  accent,
  icon,
  align = 'left',
  index,
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  const accentLabel = accent?.replace(/_/g, ' ');

  return (
    <header
      className={`${className ?? 'mb-7'} ${isCenter ? 'text-center' : 'text-left'}`}
      data-section-index={index}
    >
      {accentLabel && (
        <p
          className={`mb-1.5 font-code text-[10px] font-bold uppercase tracking-[0.14em] text-primary ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {accentLabel}
        </p>
      )}

      <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
        {icon && (
          <span className="flex size-9 shrink-0 items-center justify-center text-primary" aria-hidden="true">
            {icon}
          </span>
        )}
        <h2 className="font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-text md:text-[2.5rem]">
          {title}
        </h2>
      </div>

      {subtitle && (
        <p
          className={`mt-1.5 text-[13px] leading-5 text-text-secondary md:text-sm ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-3xl'
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
