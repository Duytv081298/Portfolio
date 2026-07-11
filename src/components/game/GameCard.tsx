'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Cpu } from 'lucide-react';
import { type Game } from '@/data/games';
import { PlatformBadge } from '@/components/ui/Badge';
import Link from 'next/link';
import GameCardVideo from '@/components/game/GameCardVideo';

interface GameCardProps {
  game: Game;
  index: number;
}

export default function GameCard({ game, index }: GameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      x: (y - 0.5) * -8,
      y: (x - 0.5) * 8,
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative game-card cursor-pointer"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Hover Glow Effect */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${game.coverColor}22, transparent 60%)`,
            }}
          />
        )}

        {/* Cover Image / Video / Gradient Placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
          <GameCardVideo
            src={game.videoUrl}
            posterGradient={`linear-gradient(135deg, ${game.coverColor}, ${game.coverColorSecondary})`}
            isHovered={isHovered}
          />

          {/* Game Title Overlay on Cover */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered && game.videoUrl ? 'opacity-0' : 'opacity-100'}`}>
            <span className="text-white/90 font-display font-bold text-2xl md:text-3xl text-center px-4 drop-shadow-lg">
              {game.title}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="flex gap-2">
              <Link
                href={`/games/${game.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-bg-primary text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                <BookOpen size={12} />
                Case Study
              </Link>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-text text-xs font-medium hover:border-primary/50 transition-colors">
                <Play size={12} />
                Demo
              </button>
            </div>
          </div>

          {/* Engine Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-md bg-bg-primary/70 backdrop-blur-sm text-[10px] font-code font-medium text-text-secondary border border-border/50">
              {game.engine}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5">
          {/* Title & Genre */}
          <div className="mb-3">
            <h3 className="font-display font-semibold text-lg text-text group-hover:text-primary transition-colors duration-200">
              {game.title}
            </h3>
            <p className="text-text-secondary text-sm mt-0.5">{game.subtitle}</p>
          </div>

          {/* Genre & Stats */}
          <div className="flex items-center gap-3 mb-3 text-xs text-text-muted font-code">
            <span className="flex items-center gap-1">
              <Cpu size={12} />
              {game.genre}
            </span>
            <span>·</span>
            <span>
              {game.optimizations[0]?.metric}: {game.optimizations[0]?.before} → {game.optimizations[0]?.after}
            </span>
          </div>

          {/* Platform Badges */}
          <div className="flex flex-wrap gap-1.5">
            {game.platforms.slice(0, 3).map((platform) => (
              <PlatformBadge key={platform} platform={platform} />
            ))}
            {game.platforms.length > 3 && (
              <span className="text-xs text-text-muted font-code">
                +{game.platforms.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Gradient border on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${game.coverColor}33, transparent 50%, ${game.coverColorSecondary}33)`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            borderRadius: '16px',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
