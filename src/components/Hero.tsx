import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ResilientImage } from './ResilientImage';
import { PageId } from './Navbar';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onNavigatePage: (page: PageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigatePage }) => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-black border-b border-violet-900/40 pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(124,58,237,0.16),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(219,39,119,0.10),_transparent_50%)]"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Slogan, Headline & Dual Violet/Magenta CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-4 tracking-[0.01em]">
              <span>{t.hero.badgeSlogan}</span>
            </div>

            <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-white text-balance">
              {t.hero.title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl tracking-[0.01em]">
              {t.hero.subtitle}
            </p>

            {/* Recuadro destacado violeta/magenta: Garantía Operativa */}
            <div className="mt-6 p-4 rounded-xl border border-fuchsia-500/60 bg-gradient-to-r from-violet-950/60 via-purple-950/40 to-fuchsia-950/60 shadow-[0_0_25px_rgba(219,39,119,0.2)]">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 mt-1 shrink-0 shadow-[0_0_8px_#E838C8]" />
                <div className="text-xs text-zinc-200 leading-relaxed">
                  <strong className="text-white block font-semibold text-sm mb-0.5">
                    {t.hero.guaranteeTitle}
                  </strong>
                  {t.hero.guaranteeText}
                </div>
              </div>
            </div>

            {/* Primary Violet-Magenta CTA + Secondary Dark Violet Outline CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigatePage('contacto')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] text-sm font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
              >
                <span>{t.hero.ctaQuote}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigatePage('servicios')}
                className="inline-flex items-center justify-center px-6 py-3 min-h-[46px] text-sm font-semibold text-white bg-obsidian-850 hover:bg-obsidian-800 border border-violet-500/40 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                {t.hero.ctaCatalog}
              </button>
            </div>
          </div>

          {/* Right Column: Real 3PL Fulfillment Hub Photograph inside a vibrant Violet/Magenta Frame */}
          <div className="lg:col-span-6 p-[2px] rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_0_35px_rgba(168,85,247,0.25)] flex flex-col">
            <div className="relative rounded-[14px] overflow-hidden bg-obsidian-900 w-full h-full min-h-[280px] sm:min-h-[360px]">
              <ResilientImage
                src={COMPANY_INFO.images.hero}
                alt={t.hero.heroImageAlt}
                fallbackType="warehouse"
                fallbackLabel="Centro Operativo TransRomero Cataluña"
                className="w-full h-full lg:h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 sm:p-6">
                <p className="text-xs sm:text-sm font-medium text-white tracking-wide">
                  {t.hero.heroImageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Operational KPI Strip */}
        <div className="mt-12 pt-10 border-t border-violet-900/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.hero.kpis.map((item) => (
            <div key={item.figure} className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
                {item.figure}
              </span>
              <span className="mt-1.5 text-sm text-zinc-400 leading-snug tracking-[0.01em]">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
