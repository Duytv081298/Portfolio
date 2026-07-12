'use client';

import SectionHeader from '@/components/ui/SectionHeader';

const upcomingCategories = [
  {
    label: 'Mobile Games',
    value: 'mobile',
    icon: '📱',
    desc: 'Hyper Casual & Puzzle games trên iOS/Android',
    color: '#4DA3FF',
  },
  {
    label: 'Instant Platforms',
    value: 'instant',
    icon: '⚡',
    desc: 'Facebook Instant Games, Snapchat Games',
    color: '#00F5A0',
  },
  {
    label: 'Web Games',
    value: 'web',
    icon: '🌐',
    desc: 'Browser-based HTML5 games',
    color: '#7C5CFF',
  },
];

export default function FeaturedGamesSection() {
  return (
    <section id="games" className="py-40 md:py-56 relative bg-bg-secondary/40 border-y border-border/30">
      <div className="section-container">
        <SectionHeader
          title="Games Portfolio"
          index="02"
          accent="instant_games"
          subtitle="Các game đã ship trên Mobile, Instant Platforms và Web. Case study đang được chuẩn bị."
        />

        {/* Coming Soon Notice */}
        <div className="flex items-center gap-3 mb-12 py-3 px-4 rounded-xl border border-border bg-card/50 w-full sm:w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <p className="text-text-muted text-sm">
            Case study chi tiết đang được chuẩn bị — sẽ cập nhật sớm.
          </p>
        </div>

        {/* Category Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingCategories.map((cat) => (
            <div
              key={cat.value}
              className="relative rounded-xl border p-6 flex items-center gap-5 transition-all duration-300 hover:border-opacity-50"
              style={{ borderColor: `${cat.color}20`, backgroundColor: `${cat.color}04` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ backgroundColor: `${cat.color}12`, border: `1px solid ${cat.color}20` }}
              >
                {cat.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-text text-sm mb-0.5">{cat.label}</p>
                <p className="text-text-muted text-xs leading-relaxed">{cat.desc}</p>
              </div>

              {/* Coming Soon badge */}
              <span
                className="flex-shrink-0 px-2 py-0.5 rounded text-[9px] font-code font-bold uppercase tracking-wider border"
                style={{ color: cat.color, borderColor: `${cat.color}30`, backgroundColor: `${cat.color}08` }}
              >
                Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
