'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Gamepad2, Mail } from 'lucide-react';
import { GithubIcon, FacebookIcon } from '@/components/ui/BrandIcons';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Games', href: '#games' },
  { label: 'Playable Ads', href: '#playable' },
  { label: 'Tech', href: '#tech' },
  { label: 'Performance', href: '#performance' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong py-3' : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
              <Gamepad2 size={18} className="text-primary" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-semibold text-text text-sm tracking-tight">
                DUY.DEV
              </span>
              <span className="text-primary text-lg leading-none">.</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`
                  relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text'
                  }
                `}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Social + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1">
              <a
                href="https://github.com/Duytv081298"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all duration-200"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://web.facebook.com/Duytv98"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all duration-200"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="mailto:duytv0812@gmail.com"
                className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all duration-200"
              >
                <Mail size={16} />
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-4 right-4 glass-strong rounded-2xl p-4 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${
                      activeSection === item.href.slice(1)
                        ? 'text-primary bg-primary/10'
                        : 'text-text-secondary hover:text-text hover:bg-card'
                    }
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 px-4">
                <a
                  href="https://github.com/Duytv081298"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="https://web.facebook.com/Duytv98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href="mailto:duytv0812@gmail.com"
                  className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all"
                >
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
