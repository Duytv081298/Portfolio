'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Maximize2, Minimize2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { playableAds, playableCategories, getPlayablesByCategory, type PlayableAd } from '@/data/playableAds';

export default function PlayableAdsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeAd, setActiveAd] = useState<PlayableAd | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredAds = getPlayablesByCategory(activeFilter);

  const openPlayer = (ad: PlayableAd) => {
    setActiveAd(ad);
    setIsFullscreen(false);
  };
   
  const closePlayer = () => {
    setActiveAd(null);
    setIsFullscreen(false);
  };

  return (
    <section id="playable" className="py-24 md:py-32 relative">
      <div className="section-container">
        <SectionHeader
          accent="playable_ads"
          title="Playable Ads"
          subtitle={`${playableAds.length} playable ads shipped. Click "Play" to try them directly in your browser.`}
        />

        {/* Stats Bar */}
        <RevealOnScroll>
          <div className="flex flex-wrap items-center gap-6 mb-10 py-4 px-5 rounded-xl bg-card/50 border border-border/50 w-fit">
            <div className="flex items-center gap-2">
              <span className="font-code text-2xl font-bold text-primary">{playableAds.length}</span>
              <span className="text-text-secondary text-sm">Total Ads</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-code text-2xl font-bold text-accent">{'<5MB'}</span>
              <span className="text-text-secondary text-sm">Each</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-code text-2xl font-bold text-purple">AppLovin</span>
              <span className="text-text-secondary text-sm">SDK</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {playableCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.value
                  ? 'text-primary bg-primary/10 border border-primary/30'
                  : 'text-text-secondary hover:text-text bg-card border border-border hover:border-border-hover'
              }`}
            >
              {cat.label}
              {cat.value !== 'all' && (
                <span className="ml-1.5 text-xs text-text-muted">
                  ({playableAds.filter(a => a.category === cat.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredAds.map((ad, index) => (
              <motion.div
                key={ad.id}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onClick={() => openPlayer(ad)}
              >
                {/* Card */}
                <div className="relative aspect-[9/14] rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 bg-card">
                  {/* Cover Gradient */}
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(160deg, ${ad.coverColor}, ${ad.coverColorSecondary})`,
                    }}
                  />

                  {/* Title */}
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <span className="text-white/90 font-display font-bold text-sm text-center drop-shadow-md leading-tight">
                      {ad.title}
                    </span>
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center backdrop-blur-sm">
                      <Play size={20} className="text-primary ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="inline-block px-2 py-0.5 rounded text-[9px] font-code bg-bg-primary/70 backdrop-blur-sm text-text-secondary border border-border/50 capitalize">
                      {ad.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Player Modal */}
      <AnimatePresence>
        {activeAd && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
              onClick={closePlayer}
            />

            {/* Player Container */}
            <motion.div
              className={`relative z-10 ${
                isFullscreen
                  ? 'w-full h-full'
                  : 'w-[380px] h-[680px] max-w-[90vw] max-h-[85vh]'
              } transition-all duration-300`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Player Header */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-bg-primary/90 to-transparent">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${activeAd.coverColor}, ${activeAd.coverColorSecondary})` }}
                  >
                    <Play size={14} className="text-white ml-0.5" fill="white" />
                  </div>
                  <div>
                    <h3 className="text-text text-sm font-display font-semibold">{activeAd.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge label={activeAd.sdk} variant="accent" size="sm" />
                      <Badge label={activeAd.engine} variant="primary" size="sm" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all"
                  >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                  <button
                    onClick={closePlayer}
                    className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-card transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Phone Frame */}
              <div
                className={`w-full h-full overflow-hidden ${
                  isFullscreen ? 'rounded-none' : 'rounded-2xl border-2 border-border'
                }`}
                style={{
                  boxShadow: isFullscreen ? 'none' : '0 25px 50px -12px rgba(0,0,0,0.8)',
                }}
              >
                <iframe
                  src={activeAd.publicPath}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                  title={`Play ${activeAd.title}`}
                  allow="autoplay"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
