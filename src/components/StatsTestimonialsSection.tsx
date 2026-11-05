import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const StatsTestimonialsSection: React.FC = () => {
  const { t, stats, testimonials } = useLanguage();

  return (
    <section
      id="cifras-testimonios"
      className="py-16 sm:py-20 lg:py-24 bg-black border-b border-violet-900/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-2">
            <span>{t.statsTestimonials.tag}</span>
            <span aria-hidden="true" className="text-violet-400/60">
              ·
            </span>
            <span className="text-violet-300">{t.statsTestimonials.subtag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
            {t.statsTestimonials.title}
          </h2>
          <p className="mt-3 text-base text-zinc-300 leading-relaxed tracking-[0.01em]">
            {t.statsTestimonials.subtitle}
          </p>
        </div>

        {/* Corporate Violet & Magenta Quantitative Strip inside a luminous Frame */}
        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_0_35px_rgba(192,38,211,0.25)]">
          <div className="bg-gradient-to-br from-[#120824] via-[#1B0C33] to-[#270B2D] text-white rounded-[14px] p-7 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm font-semibold text-fuchsia-400 tracking-[0.01em]">
                  {stat.label}
                </span>
                <span className="mt-1 text-xs text-violet-100/85 leading-relaxed tracking-[0.01em]">
                  {stat.context}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Attributable Testimonials Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="bg-obsidian-850 border border-violet-900/50 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-fuchsia-400 mb-3 tabular-nums">
                  {item.resultSummary}
                </p>

                <blockquote className="text-sm text-zinc-200 leading-relaxed tracking-[0.01em]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 pt-4 border-t border-violet-900/50 text-xs">
                <strong className="block font-bold text-white text-sm">{item.author}</strong>
                <span className="block text-violet-300 mt-0.5">
                  {item.role} · {item.company}
                </span>
                <span className="block text-zinc-400 mt-0.5">{item.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
