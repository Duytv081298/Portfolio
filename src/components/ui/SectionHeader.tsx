'use client';

import { type ReactNode } from 'react';
import RevealOnScroll from './RevealOnScroll';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  icon?: ReactNode;
  align?: 'left' | 'center';
  index?: string; // e.g. "01", "02"
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  accent,
  icon,
  align = 'left',
  index,
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <RevealOnScroll className={`${className || 'mb-16'} ${isCenter ? 'text-center' : ''}`}>
      {/* Top row: section index + accent label */}
      <div className={`flex items-center gap-4 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        {index && (
          <span className="font-code text-[11px] font-bold text-text-muted tracking-widest select-none">
            {index}
          </span>
        )}
        {index && <div className="w-px h-3 bg-border-hover" />}
        {accent && (
          <span className="font-code text-[11px] text-primary tracking-widest uppercase font-semibold">
            {accent}
          </span>
        )}
      </div>

      {/* Main title */}
      <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
        {icon && <span className="text-3xl">{icon}</span>}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-text tracking-tight leading-[1.08]">
          {title}
        </h2>
      </div>

      {/* Subtitle — concise */}
      {subtitle && (
        <p className={`mt-5 text-text-secondary text-base md:text-lg leading-relaxed ${isCenter ? 'max-w-xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}

      {/* Accent line */}
      <div className={`mt-8 flex items-center gap-1.5 ${isCenter ? 'justify-center' : ''}`}>
        <div className="w-8 h-[2px] bg-primary rounded-full" />
        <div className="w-2 h-[2px] bg-accent rounded-full" />
        <div className="w-1 h-[2px] bg-purple rounded-full" />
      </div>

    </RevealOnScroll>
  );
}
