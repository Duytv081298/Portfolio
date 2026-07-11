'use client';

import { motion } from 'motion/react';
import { Clock, ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { blogPosts } from '@/data/blog';

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 md:py-32 relative">
      <div className="section-container">
        <SectionHeader
          accent="technical_blog"
          title="Blog"
          subtitle="Technical deep-dives into game development, optimization, and architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <RevealOnScroll key={post.id} delay={index * 0.08}>
              <motion.article
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-border-hover transition-all duration-300 cursor-pointer h-full"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-bg-secondary/50">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FDCB6E]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                  </div>
                  <span className="text-text-muted text-[10px] font-code ml-2">
                    blog/{post.category}.md
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Icon & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{post.icon}</span>
                    <div className="flex items-center gap-3 text-text-muted text-xs font-code">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-text text-base mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-code bg-bg-primary text-text-muted border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-1 text-primary text-xs font-display font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Read Article
                    <ArrowUpRight size={12} />
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent" />
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
