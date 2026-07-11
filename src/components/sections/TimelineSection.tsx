'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SectionHeader from '@/components/ui/SectionHeader';

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  skills: string[];
  color: string;
  icon: string;
}

const timeline: TimelineEntry[] = [
  {
    year: '2019 — 2021',
    title: 'Game Developer',
    description:
      'Bắt đầu hành trình với Cocos Creator. Phát triển các game Hyper Casual và Puzzle cho mobile. Học cách tối ưu performance cho thiết bị low-end.',
    skills: ['Cocos Creator', 'JavaScript', 'Mobile Game', 'Physics'],
    color: '#4DA3FF',
    icon: '🎮',
  },
  {
    year: '2021 — 2023',
    title: 'Playable Ads Developer',
    description:
      'Chuyên môn hóa vào Playable Ads. Phát triển hệ thống tối ưu bundle size, build pipeline tự động. Tích hợp SDK: AppLovin, IronSource, Meta, TikTok.',
    skills: ['Playable Ads', 'AppLovin SDK', 'Bundle Optimization', 'TypeScript'],
    color: '#00F5A0',
    icon: '📱',
  },
  {
    year: '2023 — Hiện tại',
    title: 'Senior Game Developer',
    description:
      'Lead game development, thiết kế kiến trúc game phức tạp, mentor junior developer. 30+ playable ads shipped. Chuyên gia tối ưu WebGL và performance.',
    skills: ['Architecture', 'Team Lead', 'WebGL', 'Performance Expert'],
    color: '#7C5CFF',
    icon: '🚀',
  },
];

export default function TimelineSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section className="py-24 md:py-32 relative">
      <div className="section-container">
        <SectionHeader
          accent="career_timeline"
          title="Journey"
          subtitle="My path from Game Developer to Senior Game Developer."
          align="center"
        />

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto mt-16">
          {/* Static Line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 w-px origin-top"
            style={{
              height: lineHeight,
              background: 'linear-gradient(180deg, #4DA3FF, #00F5A0, #7C5CFF)',
            }}
          />

          {/* Timeline Entries */}
          <div className="space-y-16">
            {timeline.map((entry, index) => (
              <motion.div
                key={entry.title}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: entry.color,
                      backgroundColor: `${entry.color}33`,
                      boxShadow: `0 0 12px ${entry.color}44`,
                    }}
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}
                >
                  {/* Year */}
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-code font-medium mb-3 border"
                    style={{
                      color: entry.color,
                      borderColor: `${entry.color}33`,
                      backgroundColor: `${entry.color}11`,
                    }}
                  >
                    {entry.year}
                  </span>

                  {/* Title */}
                  <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className="text-xl">{entry.icon}</span>
                    <h3 className="text-xl font-display font-bold text-text">{entry.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {entry.description}
                  </p>

                  {/* Skills */}
                  <div className={`flex flex-wrap gap-1.5 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {entry.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-code bg-card text-text-muted border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
