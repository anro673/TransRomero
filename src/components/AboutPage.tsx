import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ResilientImage } from './ResilientImage';
import { PageId } from './Navbar';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigatePage: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigatePage }) => {
  const { t, stats, testimonials } = useLanguage();

  return (
    <div className="bg-black">
      {/* Corporate Identity Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#130824] via-black to-black border-b border-violet-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-3">
                <span>{t.about.tag}</span>
                <span aria-hidden="true" className="text-violet-400/60">
                  ·
                </span>
                <span className="text-violet-300">{t.about.subtag}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
                {t.about.title}
              </h1>

              <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed tracking-[0.01em]">
                {t.about.paragraph1}
              </p>

              <p className="mt-3 text-base text-zinc-300 leading-relaxed tracking-[0.01em]">
                {t.about.paragraph2}
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-zinc-200">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>{t.about.check1}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>{t.about.check2}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>{t.about.check3}</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigatePage('contacto')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400 shadow-[0_0_15px_rgba(219,39,119,0.3)]"
                >
                  <span>{t.about.ctaContact}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage('servicios')}
                  className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-obsidian-850 hover:bg-obsidian-800 border border-violet-500/40 rounded-lg transition-colors cursor-pointer"
                >
                  {t.about.ctaCatalog}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-violet-800/50 bg-obsidian-900 aspect-[4/3]">
                <ResilientImage
                  src={COMPANY_INFO.images.headquarters}
                  alt={t.about.headquartersCaption}
                  fallbackType="building"
                  fallbackLabel="Sede Central e Infraestructura Logística"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-zinc-400">
                {t.about.headquartersCaption}
              </p>
            </div>
          </div>

          {/* 3 Technical Pillars */}
          <div className="mt-14 pt-12 border-t border-violet-900/40 grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.about.pillars.map((pillar) => (
              <div key={pillar.code} className="pt-4 border-t-2 border-fuchsia-500">
                <span className="font-mono text-xs font-bold text-fuchsia-400 tabular-nums">
                  {pillar.code}.
                </span>
                <h2 className="mt-1.5 text-lg font-bold text-white">{pillar.title}</h2>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed tracking-[0.01em]">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats & Testimonials */}
      <section className="py-16 sm:py-20 bg-obsidian-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#120824] via-[#1B0C33] to-[#270B2D] border border-violet-700/50 text-white rounded-xl p-7 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm font-semibold text-fuchsia-400">{stat.label}</span>
                <span className="mt-1 text-xs text-violet-100/85 leading-relaxed">
                  {stat.context}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {COMPANY_INFO.brandName} · {t.statsTestimonials.clientsSectionTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <figure
                  key={item.id}
                  className="bg-obsidian-850 border border-violet-900/50 rounded-xl p-6 flex flex-col justify-between"
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
                    <span className="block text-violet-300 font-medium mt-0.5">
                      {item.role} · {item.company}
                    </span>
                    <span className="block text-zinc-400 mt-0.5">{item.location}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
