'use client';

import { Gamepad2, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, FacebookIcon } from '@/components/ui/BrandIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border bg-bg-secondary">
      {/* Neon top line */}
      <div className="neon-line" />

      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Gamepad2 size={16} className="text-primary" />
              </div>
              <span className="font-display font-semibold text-text text-sm">
                DUY.DEV<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm">
              Senior Game Developer · Playable Ads Specialist
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Duytv081298"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all duration-200 text-sm"
            >
              <GithubIcon size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://web.facebook.com/Duytv98"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all duration-200 text-sm"
            >
              <FacebookIcon size={16} />
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <a
              href="mailto:duytv0812@gmail.com"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all duration-200 text-sm"
            >
              <Mail size={16} />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-text-secondary hover:text-primary transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp
              size={18}
              className="group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-text-muted text-xs font-code">
            © {new Date().getFullYear()} Trịnh Văn Duy. Built with Next.js · Designed
            like a Game Launcher.
          </p>
        </div>
      </div>
    </footer>
  );
}
