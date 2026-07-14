'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Gamepad2, Mail, Menu, X } from 'lucide-react';
import { FacebookIcon, GithubIcon } from '@/components/ui/BrandIcons';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Playable Ads', href: '#playable' },
  { label: 'Games', href: '#games' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Journey', href: '#career' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      for (let index = navItems.length - 1; index >= 0; index -= 1) {
        const id = navItems[index].href.slice(1);
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 140) {
          setActiveSection(id);
          return;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (href: string) => {
    setMobileOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`fixed inset-x-0 top-0 z-50 h-[82px] border-b transition-all duration-300 ${
          scrolled
            ? 'border-border/90 bg-bg-primary/95 shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl'
            : 'border-border/60 bg-bg-primary/88 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6 md:px-10">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              window.location.reload();
            }}
            className="group flex min-h-11 items-center gap-3 rounded-lg"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/25 bg-gradient-to-br from-primary/12 to-purple/10 shadow-[inset_0_0_18px_rgba(62,166,255,0.06)]">
              <Gamepad2 size={22} className="text-primary transition-transform duration-200 group-hover:scale-105" aria-hidden="true" />
            </span>
            <span className="hidden flex-col sm:flex">
              <span className="font-display text-sm font-bold uppercase leading-tight tracking-[0.08em] text-text">
                Duy <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dev</span>
              </span>
              <span className="font-code text-[8px] uppercase tracking-[0.15em] text-text-muted">Game Developer</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => navigateTo(item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative min-h-11 cursor-pointer px-1 font-code text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                    isActive ? 'text-primary' : 'text-text-secondary hover:text-text'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-[5px] left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_8px_rgba(0,217,126,0.35)]"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <div className="hidden items-center md:flex">
              <a
                href="https://github.com/Duytv081298"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-card hover:text-text"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://web.facebook.com/Duytv98"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-card hover:text-text"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="mailto:duytv0812@gmail.com"
                aria-label="Email"
                className="grid h-11 w-11 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-card hover:text-text"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="grid h-11 w-11 place-items-center rounded-lg text-text-secondary transition-colors hover:bg-card hover:text-text lg:hidden"
            >
              {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-primary/80 px-4 pt-[94px] backdrop-blur-sm lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="glass-strong mx-auto max-w-lg rounded-2xl p-3"
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onClick={(event) => event.stopPropagation()}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => navigateTo(item.href)}
                    className={`min-h-12 w-full rounded-xl px-4 text-left text-sm font-medium transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-card hover:text-text'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
