import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WhyChooseUsSectionProps {
  onApplyVolumeEstimate: (estimateSummary: string, volumeRangeLabel: string) => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  onApplyVolumeEstimate,
}) => {
  const { t, whyChooseUs, formatCurrency } = useLanguage();
  const [monthlyOrders, setMonthlyOrders] = useState<number>(850);
  const [storedPallets, setStoredPallets] = useState<number>(25);

  const getTierData = (orders: number) => {
    if (orders < 400) {
      return {
        tierName: t.whyChooseUs.tierPyme,
        pickPackRate: 1.95,
        shippingBaseRate: 3.85,
        volumeRangeFormValue: 'Menos de 400 pedidos/mes',
      };
    }
    if (orders <= 2000) {
      return {
        tierName: t.whyChooseUs.tierGrowth,
        pickPackRate: 1.65,
        shippingBaseRate: 3.45,
        volumeRangeFormValue: '400 – 2.000 pedidos/mes',
      };
    }
    return {
      tierName: t.whyChooseUs.tierHighVolume,
      pickPackRate: 1.42,
      shippingBaseRate: 3.15,
      volumeRangeFormValue: 'Más de 2.000 pedidos/mes',
    };
  };

  const tier = getTierData(monthlyOrders);
  const palletRate = storedPallets > 40 ? 9.5 : 11.0;
  const monthlyStorageCost = storedPallets * palletRate;
  const monthlyFulfillmentAndShipCost =
    monthlyOrders * (tier.pickPackRate + tier.shippingBaseRate);
  const totalEstimatedMonthly = Math.round(monthlyStorageCost + monthlyFulfillmentAndShipCost);
  const combinedPerOrder = (
    tier.pickPackRate +
    tier.shippingBaseRate +
    monthlyStorageCost / Math.max(monthlyOrders, 1)
  ).toFixed(2);

  const handleTransferSimulation = () => {
    const summary = `Simulación TransRomero: ~${monthlyOrders} ${t.whyChooseUs.ordersUnit}/mes, ${storedPallets} ${t.whyChooseUs.palletsUnit} (${tier.tierName}). Presupuesto estimado: ${formatCurrency(
      totalEstimatedMonthly
    )} (${combinedPerOrder} €/pedido).`;
    onApplyVolumeEstimate(summary, tier.volumeRangeFormValue);
  };

  return (
    <section
      id="por-que-elegirnos"
      className="py-16 sm:py-20 lg:py-24 bg-obsidian-900 border-b border-violet-900/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: 4 Core Competitive Advantages */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-2">
              <span>{t.whyChooseUs.tag}</span>
              <span aria-hidden="true" className="text-violet-400/60">
                ·
              </span>
              <span className="text-violet-300">{t.whyChooseUs.subtag}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
              {t.whyChooseUs.title}
            </h2>

            <p className="mt-3 text-base text-zinc-300 leading-relaxed max-w-2xl tracking-[0.01em]">
              {t.whyChooseUs.subtitle}
            </p>

            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUs.map((item) => (
                <div
                  key={item.id}
                  className="bg-obsidian-850 border border-violet-900/50 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-fuchsia-400">
                        {item.index}.
                      </span>
                      <span className="text-xs font-medium text-violet-300 tabular-nums">
                        {item.metricHighlight}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300 leading-relaxed tracking-[0.01em]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Volume Tariff Calculator inside a vibrant Violet/Magenta Frame */}
          <div className="lg:col-span-5 p-[2px] rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_0_35px_rgba(219,39,119,0.25)]">
            <div className="bg-obsidian-850 rounded-[14px] overflow-hidden">
              <div className="bg-gradient-to-r from-[#170A30] via-[#240D3D] to-[#2E0D36] text-white px-6 py-5 sm:px-8 border-b border-fuchsia-500/40">
                <p className="text-xs font-semibold text-fuchsia-400">
                  {t.whyChooseUs.calculatorTag}
                </p>
                <h3 className="mt-1 text-xl font-bold text-white">
                  {t.whyChooseUs.calculatorTitle}
                </h3>
                <p className="mt-1 text-xs text-violet-200 leading-relaxed">
                  {t.whyChooseUs.calculatorSubtitle}
                </p>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Orders Slider */}
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <label htmlFor="slider-orders" className="text-xs font-semibold text-white">
                      {t.whyChooseUs.monthlyOrdersLabel}
                    </label>
                    <span className="font-mono text-base font-bold text-fuchsia-400 tabular-nums">
                      {monthlyOrders.toLocaleString()} {t.whyChooseUs.ordersUnit}
                    </span>
                  </div>
                  <input
                    id="slider-orders"
                    type="range"
                    min={100}
                    max={4000}
                    step={50}
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full accent-[#E838C8] cursor-pointer h-2 bg-[#22183C] rounded-lg"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-zinc-400 tabular-nums">
                    <span>{t.whyChooseUs.sliderOrdersMin}</span>
                    <span>{t.whyChooseUs.sliderOrdersMid}</span>
                    <span>{t.whyChooseUs.sliderOrdersMax}</span>
                  </div>
                </div>

                {/* Pallets Slider */}
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <label htmlFor="slider-pallets" className="text-xs font-semibold text-white">
                      {t.whyChooseUs.storedPalletsLabel}
                    </label>
                    <span className="font-mono text-base font-bold text-violet-300 tabular-nums">
                      {storedPallets} {t.whyChooseUs.palletsUnit}
                    </span>
                  </div>
                  <input
                    id="slider-pallets"
                    type="range"
                    min={5}
                    max={150}
                    step={5}
                    value={storedPallets}
                    onChange={(e) => setStoredPallets(Number(e.target.value))}
                    className="w-full accent-[#8B5CF6] cursor-pointer h-2 bg-[#22183C] rounded-lg"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-zinc-400 tabular-nums">
                    <span>{t.whyChooseUs.sliderPalletsMin}</span>
                    <span>{t.whyChooseUs.sliderPalletsMid}</span>
                    <span>{t.whyChooseUs.sliderPalletsMax}</span>
                  </div>
                </div>

                {/* Breakdown Box */}
                <dl className="pt-5 border-t border-violet-900/50 space-y-2.5 text-xs">
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">{t.whyChooseUs.appliedScaleLabel}</dt>
                    <dd className="font-semibold text-violet-300 text-right">{tier.tierName}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">
                      {t.whyChooseUs.monthlyStorageLabel} ({palletRate.toFixed(2)} €/palet)
                    </dt>
                    <dd className="font-mono text-white tabular-nums">
                      {formatCurrency(monthlyStorageCost)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">
                      {t.whyChooseUs.pickingEmbalajeLabel} ({tier.pickPackRate.toFixed(2)} €/pedido)
                    </dt>
                    <dd className="font-mono text-white tabular-nums">
                      {formatCurrency(monthlyOrders * tier.pickPackRate)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-zinc-400">
                      {t.whyChooseUs.shippingLabel} ({tier.shippingBaseRate.toFixed(2)} €/envío)
                    </dt>
                    <dd className="font-mono text-white tabular-nums">
                      {formatCurrency(monthlyOrders * tier.shippingBaseRate)}
                    </dd>
                  </div>

                  {/* Recuadro Violeta/Magenta para la Estimación Mensual Total */}
                  <div className="mt-3 p-3.5 rounded-xl border-2 border-fuchsia-500/70 bg-gradient-to-r from-violet-950/60 via-purple-950/40 to-fuchsia-950/60 shadow-[0_0_20px_rgba(219,39,119,0.2)] flex items-baseline justify-between gap-2">
                    <div>
                      <dt className="text-sm font-bold text-white">{t.whyChooseUs.totalMonthlyEstimate}</dt>
                      <span className="text-[11px] text-zinc-300 tabular-nums">
                        {t.whyChooseUs.avgPerOrder.replace('{amount}', combinedPerOrder)}
                      </span>
                    </div>
                    <dd className="font-mono text-2xl font-bold text-fuchsia-400 tabular-nums drop-shadow-[0_0_8px_rgba(232,56,200,0.5)]">
                      {formatCurrency(totalEstimatedMonthly)}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={handleTransferSimulation}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400 shadow-[0_0_15px_rgba(219,39,119,0.25)]"
                >
                  <span>{t.whyChooseUs.ctaApplyVolume}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
