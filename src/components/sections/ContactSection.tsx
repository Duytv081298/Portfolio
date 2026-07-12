'use client';

import { Download, Gamepad2, Mail, MapPin, Send } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, GithubIcon } from '@/components/ui/BrandIcons';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const contactDetails = [
  { label: 'Email', value: 'duytv0812@gmail.com', Icon: Mail },
  { label: 'Location', value: 'Ho Chi Minh City, Vietnam', Icon: MapPin },
  { label: 'Resume', value: 'Download CV', Icon: Download },
];

const contactActions = [
  { label: 'GitHub', href: 'https://github.com/Duytv081298', Icon: GithubIcon },
  { label: 'Facebook', href: 'https://web.facebook.com/Duytv98', Icon: FacebookIcon },
  { label: 'Email', href: 'mailto:duytv0812@gmail.com', Icon: Mail },
  { label: 'Download CV', href: '#', Icon: Download },
];

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border/50 bg-bg-secondary/45 py-10 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_62%,rgba(124,92,255,0.12),transparent_30%),radial-gradient(circle_at_82%_30%,rgba(77,163,255,0.08),transparent_30%)]" />

      <div className="section-container relative z-10">
        <RevealOnScroll className="mb-6">
          <p className="mb-2 font-code text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Contact</p>
          <h2 className="font-display text-2xl font-bold tracking-[-0.025em] text-text md:text-[32px]">
            Let&apos;s build something great together!
          </h2>
          <p className="mt-1.5 text-xs text-text-secondary">Interested in working together? Let&apos;s build something amazing.</p>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid overflow-hidden rounded-xl border border-border bg-[#07101d]/90 shadow-[0_18px_55px_rgba(0,0,0,0.25)] md:min-h-[230px] md:grid-cols-[1.05fr_1.45fr_0.92fr]">
            <div className="relative grid min-h-[190px] place-items-center overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_center,rgba(74,58,190,0.28),transparent_55%)] md:min-h-0 md:border-r md:border-b-0">
              <div className="absolute left-[15%] top-[18%] h-20 w-20 rotate-12 rounded-2xl border border-primary/10" aria-hidden="true" />
              <div className="absolute bottom-[14%] right-[17%] h-14 w-14 -rotate-12 border border-purple/15" aria-hidden="true" />
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [-4, 1, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute inset-0 scale-125 rounded-full bg-purple/20 blur-3xl" aria-hidden="true" />
                <Gamepad2
                  size={122}
                  strokeWidth={1.15}
                  className="relative -rotate-6 text-[#4E95FF] drop-shadow-[0_0_22px_rgba(92,75,255,0.75)]"
                  aria-hidden="true"
                />
                <span className="absolute left-[26px] top-[47px] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,217,126,0.8)]" aria-hidden="true" />
                <span className="absolute right-[28px] top-[49px] h-2.5 w-2.5 rounded-full bg-purple shadow-[0_0_10px_rgba(155,116,255,0.8)]" aria-hidden="true" />
              </motion.div>
            </div>

            <div className="flex flex-col justify-center border-b border-border/60 p-7 md:border-r md:border-b-0 md:px-9">
              <h3 className="font-display text-lg font-bold text-text">Get in touch</h3>
              <p className="mt-1 text-[11px] leading-5 text-text-secondary">
                I&apos;m open for full-time, contract and freelance opportunities.
              </p>

              <div className="mt-5 space-y-3">
                {contactDetails.map(({ label, value, Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/8 text-primary">
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-code text-[8px] uppercase tracking-[0.12em] text-text-muted">{label}</span>
                      <span className="block text-[11px] font-medium text-[#B9C6D8]">{value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2.5 p-6">
              {contactActions.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex min-h-10 items-center justify-between rounded-lg border border-border bg-bg-primary/35 px-4 text-[11px] font-semibold text-text-secondary transition-all duration-200 hover:border-primary/45 hover:bg-primary/8 hover:text-text"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={14} className="text-[#8FA4BE] transition-colors group-hover:text-primary" aria-hidden="true" />
                    {label}
                  </span>
                  <Send size={11} className="text-text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
