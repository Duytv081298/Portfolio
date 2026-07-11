'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeader from '@/components/ui/SectionHeader';
import GameCard from '@/components/game/GameCard';
import { games } from '@/data/games';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Playable Ads', value: 'playable' },
  { label: 'Instant Game', value: 'instant' },
  { label: 'Web', value: 'web' },
];

export default function FeaturedGamesSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredGames =
    activeFilter === 'all'
      ? games
      : games.filter((g) => g.category === activeFilter);

  return (
    <section id="games" className="py-24 md:py-32 relative">
      <div className="section-container">
        <SectionHeader
          accent="featured_games"
          title="Featured Games"
          subtitle="Explore my game portfolio. Each project includes architecture details, optimization techniques, and playable demos."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`
                relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  activeFilter === filter.value
                    ? 'text-primary bg-primary/10 border border-primary/30'
                    : 'text-text-secondary hover:text-text bg-card border border-border hover:border-border-hover'
                }
              `}
            >
              {filter.label}
              {activeFilter === filter.value && (
                <motion.div
                  layoutId="filter-indicator"
                  className="absolute inset-0 rounded-lg border border-primary/30 bg-primary/5"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary font-code text-sm">
              No games in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
