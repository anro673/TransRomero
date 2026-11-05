import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { LogisticsProduct } from '../data/companyData';
import { Hero } from './Hero';
import { HowItWorksSection } from './HowItWorksSection';
import { WhyChooseUsSection } from './WhyChooseUsSection';
import { StatsTestimonialsSection } from './StatsTestimonialsSection';
import { ResilientImage } from './ResilientImage';
import { PageId } from './Navbar';
import { useLanguage } from '../context/LanguageContext';

interface HomeViewProps {
  onNavigatePage: (page: PageId) => void;
  onOpenProductInCatalog: (productId: string) => void;
  onQuoteProduct: (product: LogisticsProduct) => void;
  onApplyVolumeEstimate: (estimateSummary: string, volumeRangeLabel: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigatePage,
  onOpenProductInCatalog,
  onQuoteProduct,
  onApplyVolumeEstimate,
}) => {
  const { t, products } = useLanguage();

  return (
    <div className="bg-black">
      {/* 1. Portada (Hero) */}
      <Hero onNavigatePage={onNavigatePage} />

      {/* 2. Resumen Catálogo: 3 Productos Logísticos Concretos */}
      <section className="py-16 sm:py-20 lg:py-24 bg-obsidian-900 border-b border-violet-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-2">
                <span>{t.home.catalogTag}</span>
                <span aria-hidden="true" className="text-violet-400/60">
                  ·
                </span>
                <span className="text-violet-300">{t.home.catalogSubtag}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                {t.home.catalogTitle}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigatePage('servicios')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 hover:text-fuchsia-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t.home.viewAllDatasheets}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {products.map((product) => {
              const isFeatured = product.id === 'prod-fulfillment-rf';
              return (
                <article
                  key={product.id}
                  className={`rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 ${
                    isFeatured
                      ? 'bg-obsidian-850 border-2 border-fuchsia-500 shadow-[0_0_30px_rgba(219,39,119,0.3)] relative ring-1 ring-violet-500/50'
                      : 'bg-obsidian-850 border border-violet-900/50 hover:border-fuchsia-500/40'
                  }`}
                >
                  {isFeatured && (
                    <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white text-[11px] font-bold text-center py-1 tracking-wider uppercase shadow-xs">
                      {t.home.mostDemandedBadge}
                    </div>
                  )}
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-black border-b border-violet-900/40">
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackType={product.fallbackType}
                        fallbackLabel={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      {/* Technical Number & Internal Reference */}
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] font-medium text-fuchsia-400 tabular-nums mb-2">
                        <span>{product.techNumber}</span>
                        <span aria-hidden="true" className="text-violet-500/60">
                          ·
                        </span>
                        <span className="text-violet-300">REF: {product.internalRef}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug">{product.title}</h3>

                      <p className="mt-2.5 text-sm text-zinc-300 leading-relaxed line-clamp-4 tracking-[0.01em]">
                        {product.definition}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-violet-900/40">
                    {/* Recuadro Violeta/Magenta para Tarifa Base */}
                    <div
                      className={`flex items-baseline justify-between gap-2 mb-4 p-2.5 rounded-lg border ${
                        isFeatured
                          ? 'border-fuchsia-500/60 bg-gradient-to-r from-violet-950/60 to-fuchsia-950/60'
                          : 'border-violet-900/70 bg-obsidian-900/80'
                      }`}
                    >
                      <span className="text-xs text-zinc-300">{t.home.baseTariffLabel}</span>
                      <span className="font-mono text-base font-bold text-white tabular-nums">
                        {t.home.fromPrefix} {product.baseTariff}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onQuoteProduct(product)}
                        className="flex-1 px-4 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_12px_rgba(219,39,119,0.2)]"
                      >
                        {t.home.quoteButton}
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenProductInCatalog(product.id)}
                        className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 min-h-[40px] text-xs font-semibold text-violet-100 bg-obsidian-800 hover:bg-[#23193E] border border-violet-700/50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{t.home.datasheetButton}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-fuchsia-400" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Cómo funciona en 4 pasos */}
      <HowItWorksSection />

      {/* 4. Por qué elegirnos + Simulador por volumen */}
      <WhyChooseUsSection onApplyVolumeEstimate={onApplyVolumeEstimate} />

      {/* 5. Cifras y Testimonios */}
      <StatsTestimonialsSection />

      {/* 6. Llamada a la Acción Final en Negro, Violeta y Magenta */}
      <section className="py-14 sm:py-16 bg-gradient-to-r from-[#0B0616] via-[#170B2C] to-[#240B29] text-white border-t border-fuchsia-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-fuchsia-400 mb-2">
              {t.home.ctaBannerTag}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              {t.home.ctaBannerTitle}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-violet-100/90 leading-relaxed tracking-[0.01em]">
              {t.home.ctaBannerText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onNavigatePage('contacto')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] text-sm font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_18px_rgba(219,39,119,0.3)]"
            >
              <span>{t.home.ctaBannerQuote}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage('servicios')}
              className="inline-flex items-center justify-center px-6 py-3 min-h-[46px] text-sm font-semibold text-white bg-black/50 hover:bg-black/80 border border-violet-400/40 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.home.ctaBannerExplore}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
