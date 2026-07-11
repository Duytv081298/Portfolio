'use client';

import { type ReactNode } from 'react';
import RevealOnScroll from './RevealOnScroll';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  icon?: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  title,
  subtitle,
  accent,
  icon,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <RevealOnScroll className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      {/* Terminal-style label */}
      {accent && (
        <div className="flex items-center gap-2 mb-4">
          {align === 'center' && <div className="flex-1" />}
          <span className="font-code text-xs text-primary tracking-wider uppercase">
            {'// '}
            {accent}
          </span>
          {align === 'center' && <div className="flex-1" />}
        </div>
      )}

      {/* Title */}
      <div
        className={`flex items-center gap-3 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        {icon && <span className="text-2xl">{icon}</span>}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text">
          {title}
        </h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Neon underline */}
      <div className="mt-6 flex items-center gap-2">
        {align === 'center' && <div className="flex-1" />}
        <div className="w-12 h-0.5 bg-primary rounded-full" />
        <div className="w-3 h-0.5 bg-accent rounded-full" />
        <div className="w-1.5 h-0.5 bg-purple rounded-full" />
        {align === 'center' && <div className="flex-1" />}
      </div>
    </RevealOnScroll>
  );
}
