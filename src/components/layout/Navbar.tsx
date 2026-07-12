'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Gamepad2, Mail } from 'lucide-react';
import { GithubIcon, FacebookIcon } from '@/components/ui/BrandIcons';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Playable Ads', href: '#playable' },
  { label: 'Games', href: '#games' },
  { label: 'Tech', href: '#tech' },
  { label: 'Journey', href: '#career' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible] = useState(true);
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (isNavigatingRef.current) {
        // Do not update visibility during programmatic scrolling
      } else if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      prevScrollY = currentScrollY;
      setScrolled(currentScrollY > 50);

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
    setVisible(true); // Ensure navbar stays visible
    isNavigatingRef.current = true;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000); // Wait for smooth scroll animation to finish

    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong py-3 border-b border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'py-5 border-b border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple/10 border border-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple/20 group-hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(77,163,255,0.05)]">
              <Gamepad2 size={20} className="text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-text text-sm tracking-widest group-hover:text-primary transition-colors">
                DUY<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">.DEV</span>
              </span>
              <span className="font-code text-[9px] text-text-muted uppercase tracking-wider">
                Game Dev
              </span>
            </div>
          </a>

          {/* Desktop Nav - Clean Landing Page style */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`
                    relative py-1 text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-300
                    ${
                      isActive
                        ? 'text-primary'
                        : 'text-text-secondary hover:text-text'
                    }
                  `}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_8px_rgba(77,163,255,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
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
