'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SectionHeader from '@/components/ui/SectionHeader';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface PerfCardProps {
  title: string;
  description: string;
  icon: string;
  metrics: { label: string; value: string; color: string }[];
  index: number;
}

function PerfCard({ title, description, icon, metrics, index }: PerfCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="group relative bg-card border border-border rounded-xl p-6 hover:border-border-hover transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="font-display font-semibold text-text text-sm">{title}</h3>
          <p className="text-text-muted text-xs mt-0.5">{description}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-text-secondary text-xs font-code">{metric.label}</span>
              <span className="text-xs font-code font-bold" style={{ color: metric.color }}>
                {metric.value}
              </span>
            </div>
            <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: metric.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: metric.value } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-xl bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

const perfCards: Omit<PerfCardProps, 'index'>[] = [
  {
    title: 'Draw Call Optimization',
    description: 'Batch rendering & atlas merging',
    icon: '🎨',
    metrics: [
      { label: 'Reduction', value: '92%', color: '#00F5A0' },
      { label: 'Avg After', value: '85%', color: '#4DA3FF' },
    ],
  },
  {
    title: 'Object Pooling',
    description: 'Zero runtime allocations',
    icon: '♻️',
    metrics: [
      { label: 'GC Eliminated', value: '95%', color: '#00F5A0' },
      { label: 'Reuse Rate', value: '98%', color: '#4DA3FF' },
    ],
  },
  {
    title: 'Memory Management',
    description: 'Smart loading & unloading',
    icon: '🧠',
    metrics: [
      { label: 'Reduction', value: '65%', color: '#00F5A0' },
      { label: 'Peak Control', value: '90%', color: '#7C5CFF' },
    ],
  },
  {
    title: 'Shader Optimization',
    description: 'Simplified GPU pipeline',
    icon: '✨',
    metrics: [
      { label: 'GPU Load', value: '70%', color: '#00F5A0' },
      { label: 'Overdraw', value: '80%', color: '#FF5E7E' },
    ],
  },
  {
    title: 'Texture Compression',
    description: 'ASTC, ETC2, WebP pipeline',
    icon: '🗜️',
    metrics: [
      { label: 'Size Saved', value: '75%', color: '#00F5A0' },
      { label: 'Quality', value: '95%', color: '#4DA3FF' },
    ],
  },
  {
    title: 'Asset Bundle',
    description: 'Lazy loading & preloading',
    icon: '📦',
    metrics: [
      { label: 'Init Load', value: '60%', color: '#00F5A0' },
      { label: 'Cache Hit', value: '88%', color: '#7C5CFF' },
    ],
  },
  {
    title: 'Loading Speed',
    description: 'Sub-2s first meaningful paint',
    icon: '⚡',
    metrics: [
      { label: 'Improvement', value: '70%', color: '#00F5A0' },
      { label: 'Under 2s', value: '100%', color: '#4DA3FF' },
    ],
  },
  {
    title: 'Battery Efficiency',
    description: 'Low thermal impact on mobile',
    icon: '🔋',
    metrics: [
      { label: 'Power Saved', value: '40%', color: '#00F5A0' },
      { label: 'Thermal OK', value: '95%', color: '#4DA3FF' },
    ],
  },
  {
    title: 'WebGL Performance',
    description: 'Cross-browser optimization',
    icon: '🌐',
    metrics: [
      { label: '60 FPS', value: '98%', color: '#00F5A0' },
      { label: 'Compatibility', value: '95%', color: '#7C5CFF' },
    ],
  },
  {
    title: 'Mesh Merge',
    description: 'Static & dynamic batching',
    icon: '🔗',
    metrics: [
      { label: 'Batched', value: '88%', color: '#00F5A0' },
      { label: 'Vertices Cut', value: '45%', color: '#FF5E7E' },
    ],
  },
];

export default function PerformanceSection() {
  return (
    <section id="performance" className="py-32 md:py-44 relative">
      <div className="section-container">
        <SectionHeader
          accent="performance_metrics"
          title="Performance"
          subtitle="Obsessed with optimization. Every game ships at 60 FPS with minimal memory footprint."
        />

        {/* Highlight Stats */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '60', label: 'FPS Target', suffix: '', color: '#00F5A0' },
              { value: '92', label: 'Draw Call ↓', suffix: '%', color: '#4DA3FF' },
              { value: '65', label: 'Memory ↓', suffix: '%', color: '#7C5CFF' },
              { value: '<2', label: 'Load Time', suffix: 's', color: '#FF5E7E' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-5 text-center hover:border-border-hover transition-all duration-300"
              >
                <p className="font-code text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                  <span className="text-lg">{stat.suffix}</span>
                </p>
                <p className="text-text-muted text-xs font-code">{stat.label}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Performance Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {perfCards.map((card, index) => (
            <PerfCard key={card.title} {...card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
