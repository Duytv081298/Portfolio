'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import { Play, FileText, ChevronDown, Zap, Layers, Award } from 'lucide-react';
import { GithubIcon, FacebookIcon } from '@/components/ui/BrandIcons';
import MagneticButton from '@/components/ui/MagneticButton';
import GlowOrb from '@/components/effects/GlowOrb';

import { playableAds } from '@/data/playableAds';

const roles = [
  'Senior Game Developer',
  'Playable Ads Specialist',
  'Hyper-Casual Expert',
];

// Pool of games with icons
const gamePool = playableAds
  .filter((ad) => ad.icon)
  .map((ad) => ({
    slug: ad.slug,
    name: ad.title,
    url: ad.icon!,
    color: ad.coverColor || '#4F8EF7',
  }));

const stats = [
  { value: '30+', label: 'Playable Ads',  color: 'var(--color-primary)', Icon: Zap    },
  { value: '5+',  label: 'Games Shipped', color: 'var(--color-accent)',  Icon: Layers },
  { value: '5yr', label: 'Experience',    color: 'var(--color-purple)',  Icon: Award  },
];

// Split game pool into 3 orbits
const orbit1Games = gamePool.slice(0, 3);
const orbit2Games = gamePool.slice(3, 7);
const orbit3Games = gamePool.slice(7, 12);

export default function HeroSection() {
  const [roleIndex, setRoleIndex]         = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting]       = useState(false);
  const [showCursor, setShowCursor]       = useState(true);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Typing animation
  useEffect(() => {
    const current = roles[roleIndex];
    let t: NodeJS.Timeout;
    if (!isDeleting) {
      if (displayedText.length < current.length) {
        t = setTimeout(() => setDisplayedText(current.slice(0, displayedText.length + 1)), 55);
      } else {
        t = setTimeout(() => setIsDeleting(true), 2800);
      }
    } else {
      if (displayedText.length > 0) {
        t = setTimeout(() => setDisplayedText(displayedText.slice(0, -1)), 28);
      } else {
        t = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((p) => (p + 1) % roles.length);
        }, 150);
      }
    }
    return () => clearTimeout(t);
  }, [displayedText, isDeleting, roleIndex]);

  // Cursor blink
  useEffect(() => {
    const iv = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(iv);
  }, []);

  const handleIconClick = (slug: string) => {
    const event = new CustomEvent('play-game', { detail: { slug } });
    window.dispatchEvent(event);
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Glow Orbs */}
      <GlowOrb color="#4F8EF7" size={700} top="-5%" left="55%"  delay={0} />
      <GlowOrb color="#9B74FF" size={500} top="60%" left="0%"   delay={2} />
      <GlowOrb color="#00D97E" size={400} top="70%" left="80%"  delay={4} />

      {/* Main content */}
      <div className="section-container relative z-10 w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">

          {/* ══════════════════════════
               LEFT COLUMN  5 / 12
               ══════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-12 justify-center w-full min-w-0">

            {/* 1. Intro Group (Eyebrow + Name + Subtitle) */}
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-2.5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-code text-[11px] text-text-muted tracking-widest uppercase">
                  Available for new projects
                </span>
              </motion.div>

              {/* Name block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="space-y-1.5"
              >
                <span className="block font-sans text-base font-medium text-text-secondary">
                  Xin chào, tôi là
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-[56px] font-display font-extrabold leading-[1.06] tracking-tight">
                  <span className="text-text">Trịnh Văn </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple to-accent">
                    Duy
                  </span>
                  <span className="text-primary">.</span>
                </h1>
              </motion.div>

              {/* Typing job title */}
              <motion.div
                className="min-h-8 py-1 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-lg md:text-xl font-display font-semibold text-text-secondary tracking-tight">
                  {displayedText}
                  <span
                    className={`inline-block w-[2px] h-[0.85em] ml-1 align-middle bg-primary transition-opacity duration-75 ${
                      showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </p>
              </motion.div>
            </div>

            {/* 2. Stats Group */}
            <motion.div
              className="flex flex-wrap gap-3 w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              {stats.map(({ value, label, color, Icon }) => (
                <div
                  key={label}
                  className="flex-1 min-w-[140px] sm:flex-none flex items-center justify-center sm:justify-start gap-2.5 py-2.5 px-4 rounded-xl bg-card border border-border hover:border-border-hover transition-colors duration-200"
                >
                  <Icon size={13} style={{ color }} className="flex-shrink-0" />
                  <span className="font-code text-base font-bold tabular-nums" style={{ color }}>
                    {value}
                  </span>
                  <span className="text-text-muted text-xs">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* 3. Actions Group (CTA Buttons + Social Icons) */}
            <div className="flex flex-col gap-6">
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 w-full"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  onClick={() => scrollTo('playable')}
                  className="py-[14px] w-full sm:w-auto"
                >
                  <Play size={15} fill="currentColor" />
                  Play Demo Games
                </MagneticButton>
                <MagneticButton
                  variant="ghost"
                  size="lg"
                  href="#"
                  className="py-[14px] w-full sm:w-auto"
                >
                  <FileText size={15} />
                  Download CV
                </MagneticButton>
              </motion.div>

              {/* Social icons */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.05 }}
              >
                <span className="text-text-muted text-[10px] font-code uppercase tracking-widest mr-1">
                  Find me
                </span>
                <a
                  href="https://github.com/Duytv081298"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-200"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href="https://web.facebook.com/Duytv98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-text-muted hover:text-primary transition-all duration-200"
                >
                  <FacebookIcon size={20} />
                </a>
              </motion.div>
            </div>
          </div>

          {/* ══════════════════════════
               RIGHT COLUMN  7 / 12
               ══════════════════════════ */}
          <div className="hidden lg:flex lg:col-span-7 items-center justify-center relative h-[520px]">
            {isMounted && (
              <>
                {/* Background rings matching the orbits exactly */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Outer Ring */}
                  <div
                    className="w-[440px] h-[440px] rounded-full border border-border/30 absolute"
                    style={{ boxShadow: 'inset 0 0 80px rgba(79,142,247,0.01)' }}
                  />
                  {/* Middle Ring */}
                  <div className="w-[310px] h-[310px] rounded-full border border-border/20 absolute" />
                  {/* Inner Ring */}
                  <div className="w-[180px] h-[180px] rounded-full border border-border/15 absolute" />
                </div>

            {/* ── ORBIT 1: INNER (Radius 90px, 3 Games, Clockwise) ── */}
            <motion.div
              className="absolute w-[180px] h-[180px] flex items-center justify-center rounded-full pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            >
              {orbit1Games.map((game, i) => {
                const angle = i * 120;
                const rad = (angle * Math.PI) / 180;
                const x = 90 * Math.cos(rad);
                const y = 90 * Math.sin(rad);
                return (
                  <div
                    key={game.slug}
                    className="absolute pointer-events-auto"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <motion.div
                      className="flex flex-col items-center gap-1 group cursor-pointer"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
                      onClick={() => handleIconClick(game.slug)}
                      whileHover={{ scale: 1.15 }}
                    >
                      <div
                        className="relative rounded-[16px] border overflow-hidden transition-all duration-300"
                        style={{
                          width: 68,
                          height: 68,
                          borderColor: `${game.color}35`,
                          boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 12px ${game.color}15`,
                        }}
                      >
                        <img src={game.url} alt={game.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                      </div>
                      <span className="font-code text-[8px] text-text-secondary opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-200">
                        {game.name}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* ── ORBIT 2: MIDDLE (Radius 155px, 4 Games, Counter-Clockwise) ── */}
            <motion.div
              className="absolute w-[310px] h-[310px] flex items-center justify-center rounded-full pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
            >
              {orbit2Games.map((game, i) => {
                const angle = i * 90;
                const rad = (angle * Math.PI) / 180;
                const x = 155 * Math.cos(rad);
                const y = 155 * Math.sin(rad);
                return (
                  <div
                    key={game.slug}
                    className="absolute pointer-events-auto"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <motion.div
                      className="flex flex-col items-center gap-1 group cursor-pointer"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
                      onClick={() => handleIconClick(game.slug)}
                      whileHover={{ scale: 1.15 }}
                    >
                      <div
                        className="relative rounded-[18px] border overflow-hidden transition-all duration-300"
                        style={{
                          width: 72,
                          height: 72,
                          borderColor: `${game.color}35`,
                          boxShadow: `0 10px 26px rgba(0,0,0,0.6), 0 0 15px ${game.color}15`,
                        }}
                      >
                        <img src={game.url} alt={game.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                      </div>
                      <span className="font-code text-[8px] text-text-secondary opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-200">
                        {game.name}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* ── ORBIT 3: OUTER (Radius 220px, 5 Games, Clockwise) ── */}
            <motion.div
              className="absolute w-[440px] h-[440px] flex items-center justify-center rounded-full pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
            >
              {orbit3Games.map((game, i) => {
                const angle = i * 72;
                const rad = (angle * Math.PI) / 180;
                const x = 220 * Math.cos(rad);
                const y = 220 * Math.sin(rad);
                return (
                  <div
                    key={game.slug}
                    className="absolute pointer-events-auto"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <motion.div
                      className="flex flex-col items-center gap-1 group cursor-pointer"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
                      onClick={() => handleIconClick(game.slug)}
                      whileHover={{ scale: 1.15 }}
                    >
                      <div
                        className="relative rounded-[20px] border overflow-hidden transition-all duration-300"
                        style={{
                          width: 76,
                          height: 76,
                          borderColor: `${game.color}35`,
                          boxShadow: `0 12px 28px rgba(0,0,0,0.6), 0 0 15px ${game.color}15`,
                        }}
                      >
                        <img src={game.url} alt={game.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                      </div>
                      <span className="font-code text-[8px] text-text-secondary opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-200">
                        {game.name}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Floating metric pills */}
            <motion.div
              className="absolute top-[5%] right-[12%] flex items-center gap-2 px-3.5 py-2 rounded-full bg-card border border-border shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-code text-[11px] text-accent font-bold">60 FPS</span>
              <span className="text-text-muted text-[10px]">target</span>
            </motion.div>

            <motion.div
              className="absolute bottom-[18%] left-[4%] flex items-center gap-2 px-3.5 py-2 rounded-full bg-card border border-border shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.25, duration: 0.4 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-code text-[11px] text-primary font-bold">&lt;5MB</span>
              <span className="text-text-muted text-[10px]">bundle</span>
            </motion.div>

            {/* Mini terminal */}
            <motion.div
              className="absolute bottom-[6%] right-[6%] w-[172px] rounded-xl border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden z-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-bg-secondary/70">
                <span className="w-2 h-2 rounded-full bg-danger/70" />
                <span className="w-2 h-2 rounded-full bg-[#FDCB6E]/70" />
                <span className="w-2 h-2 rounded-full bg-accent/70" />
                <span className="ml-2 font-code text-[9px] text-text-muted">build.log</span>
              </div>
              <div className="px-3 py-2.5 space-y-1.5 font-code text-[9px]">
                <div><span className="text-accent">✓</span><span className="text-text-secondary ml-1.5">compiled in 6.5s</span></div>
                <div><span className="text-primary">▲</span><span className="text-text-secondary ml-1.5">bundle: 2.8MB</span></div>
                <div><span className="text-purple">◆</span><span className="text-text-secondary ml-1.5">draw calls: 14</span></div>
                <div><span className="text-accent animate-pulse">_</span></div>
              </div>
            </motion.div>
          </>
        )}
      </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-text-muted hover:text-primary transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => scrollTo('playable')}
      >
        <span className="font-code text-[9px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
