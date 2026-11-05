import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, FileSpreadsheet, X } from 'lucide-react';
import { LogisticsProduct } from '../data/companyData';
import { ResilientImage } from './ResilientImage';
import { useLanguage } from '../context/LanguageContext';

interface ServicesCatalogPageProps {
  initialFocusedProductId?: string | null;
  onClearFocusedProduct?: () => void;
  onQuoteProduct: (product: LogisticsProduct) => void;
}

export const ServicesCatalogPage: React.FC<ServicesCatalogPageProps> = ({
  initialFocusedProductId,
  onClearFocusedProduct,
  onQuoteProduct,
}) => {
  const { t, products, operations } = useLanguage();
  const [selectedModalProduct, setSelectedModalProduct] = useState<LogisticsProduct | null>(null);

  useEffect(() => {
    if (initialFocusedProductId) {
      const target = document.getElementById(initialFocusedProductId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (onClearFocusedProduct) onClearFocusedProduct();
    }
  }, [initialFocusedProductId, onClearFocusedProduct]);

  useEffect(() => {
    if (!selectedModalProduct) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedModalProduct(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedModalProduct]);

  return (
    <div className="bg-black">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#150A2B] via-[#0B0617] to-black text-white border-b border-violet-900/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-3">
              <span>{t.catalog.tag}</span>
              <span aria-hidden="true" className="text-violet-400/60">
                ·
              </span>
              <span className="text-violet-300">{t.catalog.subtag}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
              {t.catalog.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed tracking-[0.01em]">
              {t.catalog.subtitle}
            </p>

            {/* Recuadro Destacado Violeta/Magenta: Asesoría Técnica Homologada */}
            <div className="mt-7 p-4 rounded-xl border border-fuchsia-500/70 bg-gradient-to-r from-violet-950/70 via-purple-950/40 to-fuchsia-950/70 shadow-[0_0_25px_rgba(219,39,119,0.25)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs text-zinc-200">
                <strong className="text-white font-semibold block text-sm mb-0.5">
                  {t.catalog.advisoryTitle}
                </strong>
                {t.catalog.advisoryText}
              </div>
              <span className="px-3.5 py-1.5 rounded-lg border border-fuchsia-400/80 bg-fuchsia-500/20 text-fuchsia-200 text-xs font-mono font-semibold whitespace-nowrap self-start sm:self-auto">
                {t.catalog.advisoryBadge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog: 3 Concrete Technical Logistics Products */}
      <section className="py-14 sm:py-20 border-b border-violet-900/40 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {products.map((product, index) => {
            const isFeatured = product.id === 'prod-fulfillment-rf';
            return (
              <article
                key={product.id}
                id={product.id}
                className={`rounded-xl overflow-hidden ${
                  isFeatured
                    ? 'bg-obsidian-850 border-2 border-fuchsia-500 shadow-[0_0_35px_rgba(219,39,119,0.3)] ring-1 ring-violet-500/50'
                    : 'bg-obsidian-850 border border-violet-900/60'
                }`}
              >
                {isFeatured && (
                  <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white text-[11px] font-bold text-center py-1 tracking-wider uppercase">
                    {t.catalog.recommendedBadge}
                  </div>
                )}
                {/* Top Technical Reference Bar in Deep Violet + Magenta Highlights */}
                <div className="bg-[#170F2E] text-violet-100 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono tabular-nums border-b border-violet-800/60">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>
                      <strong className="text-fuchsia-400">{t.catalog.techNumberLabel}</strong>{' '}
                      <span className="text-white">{product.techNumber}</span>
                    </span>
                    <span aria-hidden="true" className="text-violet-500/60">
                      ·
                    </span>
                    <span>
                      <strong className="text-fuchsia-400">{t.catalog.internalRefLabel}</strong>{' '}
                      <span className="text-white">{product.internalRef}</span>
                    </span>
                  </div>
                  <span className="text-violet-300">{product.standardCode}</span>
                </div>

                {/* Product Content Split */}
                <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Real Logistics Image + Tariff & CTA */}
                  <div className="lg:col-span-5 flex flex-col gap-5">
                    <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-violet-900/60 bg-black">
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackType={product.fallbackType}
                        fallbackLabel={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Recuadro Violeta/Magenta para Tarifa Técnica y Acción */}
                    <div className="p-5 rounded-xl border-2 border-fuchsia-500/70 bg-gradient-to-br from-violet-950/60 via-obsidian-900 to-fuchsia-950/40 shadow-[0_0_20px_rgba(219,39,119,0.2)]">
                      <div className="flex items-baseline justify-between gap-3">
                        <div>
                          <span className="block text-xs font-medium text-fuchsia-300">
                            {t.catalog.tariffReferenceLabel}
                          </span>
                          <span className="font-mono text-2xl font-bold text-white tabular-nums drop-shadow-[0_0_8px_rgba(232,56,200,0.4)]">
                            {t.catalog.fromPrefix} {product.baseTariff}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-300 text-right">{product.tariffUnit}</span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-violet-800/60 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onQuoteProduct(product)}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400 shadow-[0_0_15px_rgba(219,39,119,0.25)]"
                        >
                          <span>{t.catalog.ctaQuoteProduct}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedModalProduct(product)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] text-xs font-semibold text-violet-100 bg-obsidian-800 hover:bg-[#23193E] border border-violet-700/50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                          <span>{t.catalog.ctaSummarySheet}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Technical Definition, Key Features & Spec Matrix */}
                  <div className="lg:col-span-7">
                    <p className="text-xs font-semibold text-fuchsia-400 mb-1.5">
                      0{index + 1} · {product.shortCategory}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      {product.title}
                    </h2>

                    {/* Technical Definition */}
                    <div className="mt-4">
                      <h3 className="text-xs font-bold text-violet-300 tracking-wide mb-1.5">
                        {t.catalog.definitionTitle}
                      </h3>
                      <p className="text-sm text-zinc-300 leading-relaxed tracking-[0.01em]">
                        {product.definition}
                      </p>
                    </div>

                    {/* Key Technical Characteristics */}
                    <div className="mt-6">
                      <h3 className="text-xs font-bold text-violet-300 tracking-wide mb-2.5">
                        {t.catalog.keyFeaturesTitle}
                      </h3>
                      <ul className="space-y-2.5 text-sm text-zinc-200">
                        {product.keyTechnicalFeatures.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed tracking-[0.01em]">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Parameters Table */}
                    <div className="mt-6">
                      <h3 className="text-xs font-bold text-violet-300 tracking-wide mb-2.5">
                        {t.catalog.specTableTitle}
                      </h3>
                      <div className="border border-violet-900/60 rounded-lg overflow-hidden">
                        <table className="w-full text-left border-collapse text-xs">
                          <tbody className="divide-y divide-violet-900/50">
                            {product.specTable.map((row) => (
                              <tr key={row.label} className="hover:bg-obsidian-800/50">
                                <th className="py-2.5 px-3.5 font-semibold text-violet-200 bg-obsidian-900 w-2/5">
                                  {row.label}
                                </th>
                                <td className="py-2.5 px-3.5 font-mono text-white tabular-nums bg-obsidian-850">
                                  {row.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Complementary 6-Stage Operational Coverage Strip */}
      <section className="py-14 sm:py-16 bg-obsidian-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold text-fuchsia-400 mb-1.5">
              {t.catalog.coverageTag}
            </p>
            <h2 className="text-2xl font-bold text-white">
              {t.catalog.coverageTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {operations.map((op) => (
              <div key={op.code} className="p-5 bg-obsidian-850 border border-violet-900/50 rounded-xl">
                <span className="font-mono text-xs font-bold text-fuchsia-400 tabular-nums">
                  {op.code}
                </span>
                <h3 className="mt-1 text-base font-bold text-white">{op.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed tracking-[0.01em]">
                  {op.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Datasheet Summary Modal */}
      {selectedModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="datasheet-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setSelectedModalProduct(null)}
        >
          <div
            className="bg-obsidian-850 border border-violet-700/60 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-violet-900/60">
              <div>
                <p className="font-mono text-xs font-semibold text-fuchsia-400 tabular-nums">
                  {selectedModalProduct.techNumber} · REF: {selectedModalProduct.internalRef}
                </p>
                <h3
                  id="datasheet-modal-title"
                  className="mt-1 text-xl font-bold text-white leading-snug"
                >
                  {selectedModalProduct.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedModalProduct(null)}
                aria-label={t.catalog.modalClose}
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-obsidian-800 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm text-zinc-300">
              <p className="leading-relaxed tracking-[0.01em]">{selectedModalProduct.definition}</p>

              <div className="p-4 bg-obsidian-900 border border-violet-800/60 rounded-lg font-mono text-xs text-white space-y-1.5 tabular-nums">
                <p>
                  <strong className="text-violet-300">{t.catalog.modalLabelCode}</strong>{' '}
                  {selectedModalProduct.techNumber}
                </p>
                <p>
                  <strong className="text-violet-300">{t.catalog.modalLabelRef}</strong>{' '}
                  {selectedModalProduct.internalRef}
                </p>
                <p>
                  <strong className="text-violet-300">{t.catalog.modalLabelNorm}</strong>{' '}
                  {selectedModalProduct.standardCode}
                </p>
                <p>
                  <strong className="text-fuchsia-400">{t.catalog.modalLabelTariff}</strong> {t.catalog.fromPrefix}{' '}
                  {selectedModalProduct.baseTariff} ({selectedModalProduct.tariffUnit})
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-violet-900/60 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedModalProduct(null)}
                className="px-4 py-2.5 min-h-[40px] text-xs font-semibold text-violet-100 bg-obsidian-800 hover:bg-[#23193E] border border-violet-700/50 rounded-lg transition-colors cursor-pointer"
              >
                {t.catalog.modalClose}
              </button>
              <button
                type="button"
                onClick={() => {
                  const prod = selectedModalProduct;
                  setSelectedModalProduct(null);
                  onQuoteProduct(prod);
                }}
                className="px-5 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(219,39,119,0.3)]"
              >
                {t.catalog.modalQuoteThisRef}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
