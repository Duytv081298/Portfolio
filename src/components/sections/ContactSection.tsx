'use client';

import { motion } from 'motion/react';
import { Mail, FileText, Send } from 'lucide-react';
import { GithubIcon, FacebookIcon } from '@/components/ui/BrandIcons';
import SectionHeader from '@/components/ui/SectionHeader';
import MagneticButton from '@/components/ui/MagneticButton';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import GlowOrb from '@/components/effects/GlowOrb';

const contactLinks = [
  {
    label: 'Email',
    value: 'duytv0812@gmail.com',
    href: 'mailto:duytv0812@gmail.com',
    icon: <Mail size={20} />,
    color: '#4DA3FF',
  },
  {
    label: 'GitHub',
    value: 'Duytv081298',
    href: 'https://github.com/Duytv081298',
    icon: <GithubIcon size={20} />,
    color: '#F5F7FA',
  },
  {
    label: 'Facebook',
    value: 'Duytv98',
    href: 'https://web.facebook.com/Duytv98',
    icon: <FacebookIcon size={20} />,
    color: '#4DA3FF',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-40 md:py-56 relative overflow-hidden bg-bg-secondary/40 border-t border-border/30">
      {/* Background Glow */}
      <GlowOrb color="#4DA3FF" size={400} top="20%" left="80%" delay={0} />
      <GlowOrb color="#7C5CFF" size={350} top="60%" left="10%" delay={3} />

      <div className="section-container relative z-10">
        <SectionHeader
          accent="get_in_touch"
          title="Contact"
          subtitle="Interested in working together? Let's build something great."
          align="center"
        />

        {/* Contact Card */}
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-8 md:p-12">
              {/* Heading */}
              <div className="text-center mb-10">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 mb-6"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-primary text-sm font-code">Available for work</span>
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-text mb-3">
                  Hãy kết nối với tôi
                </h3>
                <p className="text-text-secondary text-sm max-w-md mx-auto">
                  Tôi luôn sẵn sàng cho các dự án Game Development, Playable Ads, hoặc tư vấn kỹ thuật.
                </p>
              </div>

              {/* Contact Links */}
              <div className="space-y-4 mb-10">
                {contactLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 hover:bg-card transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300"
                      style={{
                        borderColor: `${link.color}33`,
                        backgroundColor: `${link.color}11`,
                        color: link.color,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-text-muted text-xs font-code">{link.label}</p>
                      <p className="text-text text-sm font-medium group-hover:text-primary transition-colors">
                        {link.value}
                      </p>
                    </div>
                    <Send
                      size={14}
                      className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </motion.a>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-4">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  href="mailto:duytv0812@gmail.com"
                  className="w-full sm:w-auto"
                >
                  <Mail size={18} />
                  Gửi Email
                </MagneticButton>
                <MagneticButton
                  variant="ghost"
                  size="lg"
                  href="#"
                  className="w-full sm:w-auto"
                >
                  <FileText size={18} />
                  Download CV
                </MagneticButton>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
