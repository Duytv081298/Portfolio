'use client';

import { motion } from 'motion/react';
import SectionHeader from '@/components/ui/SectionHeader';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface TechItem {
  name: string;
  category: string;
  level: 'expert' | 'advanced' | 'intermediate';
  color: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: 'Cocos Creator', category: 'Engine', level: 'expert', color: '#4DA3FF', icon: '🎮' },
  { name: 'Unity', category: 'Engine', level: 'intermediate', color: '#7C5CFF', icon: '🔮' },
  { name: 'TypeScript', category: 'Language', level: 'expert', color: '#3178C6', icon: '📘' },
  { name: 'JavaScript', category: 'Language', level: 'expert', color: '#F7DF1E', icon: '⚡' },
  { name: 'HTML5', category: 'Platform', level: 'expert', color: '#E34F26', icon: '🌐' },
  { name: 'WebGL', category: 'Platform', level: 'advanced', color: '#990000', icon: '🖥️' },
  { name: 'Firebase', category: 'Backend', level: 'advanced', color: '#FFCA28', icon: '🔥' },
  { name: 'Node.js', category: 'Backend', level: 'advanced', color: '#339933', icon: '🟢' },
  { name: 'Webpack', category: 'Tools', level: 'advanced', color: '#8DD6F9', icon: '📦' },
  { name: 'Git', category: 'Tools', level: 'expert', color: '#F05032', icon: '🔀' },
  { name: 'TexturePacker', category: 'Tools', level: 'expert', color: '#4DA3FF', icon: '🎨' },
  { name: 'Spine', category: 'Tools', level: 'advanced', color: '#FF5E7E', icon: '🦴' },
];

const levelColors = {
  expert: 'text-accent',
  advanced: 'text-primary',
  intermediate: 'text-purple',
};

const levelLabels = {
  expert: 'Expert',
  advanced: 'Advanced',
  intermediate: 'Intermediate',
};

export default function TechStackSection() {
  return (
    <section id="tech" className="py-40 md:py-56 relative bg-bg-secondary/40 border-y border-border/30">
      <div className="section-container">
        <SectionHeader
          accent="tech_stack"
          index="03"
          title="Tech Stack"
          subtitle="Tools and technologies I use to build high-performance games."
        />

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <RevealOnScroll key={tech.name} delay={index * 0.05}>
              <motion.div
                className="group relative bg-card border border-border rounded-xl p-5 text-center hover:border-border-hover transition-all duration-300 cursor-default"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {/* Icon */}
                <div className="text-3xl mb-3">{tech.icon}</div>

                {/* Name */}
                <h3 className="font-display font-semibold text-sm text-text mb-1 group-hover:text-primary transition-colors">
                  {tech.name}
                </h3>

                {/* Category */}
                <p className="text-text-muted text-[10px] font-code uppercase tracking-wider mb-2">
                  {tech.category}
                </p>

                {/* Level */}
                <span className={`text-[10px] font-code font-medium ${levelColors[tech.level]}`}>
                  {levelLabels[tech.level]}
                </span>

                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${tech.color}10, transparent 70%)`,
                  }}
                />
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
