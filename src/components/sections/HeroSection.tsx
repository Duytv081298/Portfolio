'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, FileText, ChevronDown } from 'lucide-react';
import { GithubIcon, FacebookIcon } from '@/components/ui/BrandIcons';
import MagneticButton from '@/components/ui/MagneticButton';
import GlowOrb from '@/components/effects/GlowOrb';

const titles = [
  'Senior Game Developer',
  'Playable Ads Developer',
  'Hyper Casual Specialist',
  'Puzzle Game Developer',
];

export default function HeroSection() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation
  useEffect(() => {
    const current = titles[currentTitle];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayedText(current.slice(0, displayedText.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
      } else {
        setIsDeleting(false);
        setCurrentTitle((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitle]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const scrollToGames = () => {
    const el = document.getElementById('games');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Glow Orbs */}
      <GlowOrb color="#4DA3FF" size={500} top="10%" left="60%" delay={0} />
      <GlowOrb color="#7C5CFF" size={400} top="60%" left="10%" delay={2} />
      <GlowOrb color="#00F5A0" size={350} top="70%" left="70%" delay={4} />

      {/* Content */}
      <div className="section-container relative z-10 py-32">
        <div className="max-w-4xl">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-4"
          >
            <span className="font-code text-sm text-primary tracking-wider">
              {'> '}Xin chào_
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <span className="text-text">Tôi là </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple to-accent">
              Trịnh Văn Duy
            </span>
            <span className="text-primary">.</span>
          </motion.h1>

          {/* Typing Title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
              <p className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-text-secondary">
                {displayedText}
                <span
                  className={`inline-block w-[3px] h-[1em] ml-1 align-middle transition-opacity duration-100 ${
                    showCursor ? 'bg-primary opacity-100' : 'opacity-0'
                  }`}
                />
              </p>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mb-10 py-4 px-5 rounded-xl bg-card/50 border border-border/50 w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="flex items-center gap-2">
              <span className="font-code text-2xl font-bold text-primary">30+</span>
              <span className="text-text-secondary text-sm">Playable Ads</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-code text-2xl font-bold text-accent">5+</span>
              <span className="text-text-secondary text-sm">Games Shipped</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-code text-2xl font-bold text-purple">60</span>
              <span className="text-text-secondary text-sm">FPS Target</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <MagneticButton variant="primary" size="lg" onClick={scrollToGames}>
              <Play size={18} />
              Xem Portfolio
            </MagneticButton>
            <MagneticButton variant="ghost" size="lg" href="#">
              <FileText size={18} />
              Download CV
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <a
              href="https://github.com/Duytv081298"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-text-secondary hover:text-primary transition-all duration-300"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://web.facebook.com/Duytv98"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-text-secondary hover:text-primary transition-all duration-300"
            >
              <FacebookIcon size={20} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToGames}
      >
        <span className="font-code text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
