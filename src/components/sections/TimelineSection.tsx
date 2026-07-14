import { CirclePlay, Gamepad2, Trophy } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const timeline = [
  {
    year: '2019 - 2021',
    title: 'Junior Game Developer',
    description:
      'Built 2D and 3D casual games with Unity and Cocos Creator, focused on gameplay mechanics and performance.',
    color: '#4F8EF7',
    icon: Gamepad2,
  },
  {
    year: '2021 - 2023',
    title: 'Playable Ads Developer',
    description:
      'Designed and built 30+ playable ads for major ad networks, optimized for small bundles and fast loading.',
    color: '#00D97E',
    icon: CirclePlay,
  },
  {
    year: '2023 - Now',
    title: 'Senior Game Developer',
    description:
      'Lead game development, mentor the team and deliver scalable experiences with dependable performance.',
    color: '#9B74FF',
    icon: Trophy,
  },
] as const;

export default function TimelineSection() {
  return (
    <section id="career" className="relative border-b border-border/50 py-10 md:py-12">
      <div className="section-container">
        <SectionHeader
          id="career"
          index="04"
          title="My Journey"
          subtitle="My path from Game Developer to Senior Game Developer."
        />

        <div className="relative pl-8 lg:pl-0">
          <div
            className="absolute bottom-5 left-2 top-5 w-px bg-border-hover/80 lg:hidden"
            aria-hidden="true"
          />

          <div
            className="absolute left-[14%] right-[14%] top-1/2 hidden h-px -translate-y-1/2 bg-border-hover/80 lg:block"
            aria-hidden="true"
          />
          <span
            className="absolute left-1/3 top-1/2 z-20 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-bg-primary shadow-[0_0_12px_rgba(79,142,247,0.45)] lg:block"
            aria-hidden="true"
          />
          <span
            className="absolute left-2/3 top-1/2 z-20 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-bg-primary shadow-[0_0_12px_rgba(0,217,126,0.4)] lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-16">
            {timeline.map((entry) => {
              const Icon = entry.icon;

              return (
                <li
                  key={entry.title}
                  className="relative z-10 flex min-h-[204px] flex-col rounded-xl border bg-bg-primary p-5 sm:p-6"
                  style={{
                    borderColor: `${entry.color}75`,
                    backgroundImage: `linear-gradient(145deg, ${entry.color}0A 0%, transparent 65%)`,
                  }}
                >
                  <span
                    className="absolute -left-[1.875rem] top-1/2 size-3 -translate-y-1/2 rounded-full border-2 bg-bg-primary lg:hidden"
                    style={{ borderColor: entry.color, boxShadow: `0 0 10px ${entry.color}70` }}
                    aria-hidden="true"
                  />

                  <p
                    className="font-code text-[11px] font-bold tracking-[0.04em]"
                    style={{ color: entry.color }}
                  >
                    {entry.year}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-text">{entry.title}</h3>
                  <p className="mt-3 max-w-[19rem] pr-8 text-[13px] leading-5 text-text-secondary">
                    {entry.description}
                  </p>

                  <div
                    className="absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full border"
                    style={{
                      color: entry.color,
                      borderColor: `${entry.color}90`,
                      backgroundColor: `${entry.color}0D`,
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
