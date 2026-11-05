import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ResilientImage } from './ResilientImage';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorksSection: React.FC = () => {
  const { t, steps } = useLanguage();

  return (
    <section
      id="como-funciona"
      className="py-16 sm:py-20 lg:py-24 bg-black border-b border-violet-900/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-2">
            <span>{t.howItWorks.tag}</span>
            <span aria-hidden="true" className="text-violet-400/60">
              ·
            </span>
            <span className="text-violet-300">{t.howItWorks.subtag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
            {t.howItWorks.title}
          </h2>
          <p className="mt-3 text-base text-zinc-300 leading-relaxed tracking-[0.01em]">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Numbered Workflow Steps with Magenta/Violet Top Accent Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className="pt-6 border-t-2 border-fuchsia-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <span className="font-mono text-2xl font-bold text-fuchsia-400 tabular-nums">
                    {t.howItWorks.stepPrefix} {step.stepNumber}
                  </span>
                  <span className="text-xs font-medium text-violet-300 tabular-nums">
                    {step.durationNote}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">{step.title}</h3>
                <p className="mt-2.5 text-sm text-zinc-300 leading-relaxed tracking-[0.01em]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Operational Continuity Pair */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          <figure className="rounded-xl overflow-hidden border border-violet-900/50 bg-obsidian-850">
            <div className="aspect-[16/10] w-full overflow-hidden bg-black">
              <ResilientImage
                src={COMPANY_INFO.images.warehouse}
                alt={t.howItWorks.img1CaptionTitle}
                fallbackType="warehouse"
                fallbackLabel="Almacenaje Paletizado y Estantería Dinámica"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-5 py-3.5 text-xs text-zinc-300 flex items-center justify-between gap-4 border-t border-violet-900/40">
              <span className="font-semibold text-white">
                {t.howItWorks.img1CaptionTitle}
              </span>
              <span className="text-violet-300 font-medium tabular-nums">
                {t.howItWorks.img1CaptionDetail}
              </span>
            </figcaption>
          </figure>

          <figure className="rounded-xl overflow-hidden border border-violet-900/50 bg-obsidian-850">
            <div className="aspect-[16/10] w-full overflow-hidden bg-black">
              <ResilientImage
                src={COMPANY_INFO.images.picking}
                alt={t.howItWorks.img2CaptionTitle}
                fallbackType="picking"
                fallbackLabel="Picking por Radiofrecuencia y Packing Sostenible"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-5 py-3.5 text-xs text-zinc-300 flex items-center justify-between gap-4 border-t border-violet-900/40">
              <span className="font-semibold text-white">
                {t.howItWorks.img2CaptionTitle}
              </span>
              <span className="text-violet-300 font-medium tabular-nums">
                {t.howItWorks.img2CaptionDetail}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
