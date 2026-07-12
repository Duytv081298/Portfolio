'use client';

import { ArrowUp, Gamepad2 } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/70 bg-bg-primary">
      <div className="section-container flex min-h-[76px] flex-col items-center justify-between gap-3 py-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-primary/25 bg-primary/10">
            <Gamepad2 size={14} className="text-primary" aria-hidden="true" />
          </span>
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-text">
            Duy <span className="text-primary">Dev</span>
          </span>
        </div>

        <p className="font-code text-[8px] text-text-muted">
          © {new Date().getFullYear()} Trịnh Văn Duy. Built with <span className="text-[#E15B64]">♥</span> and lots of ☕
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="flex min-h-10 items-center gap-2 rounded-lg px-3 font-code text-[8px] uppercase tracking-[0.08em] text-text-muted transition-colors hover:bg-card hover:text-primary"
          aria-label="Back to top"
        >
          Back to top <ArrowUp size={11} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
