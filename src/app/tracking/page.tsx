"use client";

import React, { useState } from 'react';
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  Loader2,
  MapPin,
  Navigation,
  Package,
  Search,
  ShieldCheck,
  Truck,
  User,
  Warehouse,
} from 'lucide-react';

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/hx85ql1bu6v6o';

interface ShipmentRecord {
  tracking_code?: string;
  client?: string;
  Client?: string;
  client_name?: string;
  customer?: string;
  origin?: string;
  destination?: string;
  eta?: string;
  location?: string;
  status?: string;
  [key: string]: string | undefined;
}

interface TimelineStage {
  key: 'magatzem' | 'transit' | 'lliurat';
  label: string;
  percentage: number;
  barWidthClass: string;
  barColorClass: string;
  badgeClass: string;
  dotActiveClass: string;
  textActiveClass: string;
}

function normalizeText(value?: string): string {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getStatusConfig(status?: string): TimelineStage {
  const normalized = normalizeText(status);

  if (normalized === 'lliurat' || normalized.includes('lliurat')) {
    return {
      key: 'lliurat',
      label: 'Lliurat',
      percentage: 100,
      barWidthClass: 'w-full',
      barColorClass: 'bg-emerald-500',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dotActiveClass: 'bg-emerald-500 border-emerald-100 text-white',
      textActiveClass: 'text-emerald-700 font-bold',
    };
  }

  if (normalized === 'en transit' || normalized.includes('transit')) {
    return {
      key: 'transit',
      label: 'En trànsit',
      percentage: 50,
      barWidthClass: 'w-1/2',
      barColorClass: 'bg-blue-600',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      dotActiveClass: 'bg-blue-600 border-blue-100 text-white',
      textActiveClass: 'text-blue-700 font-bold',
    };
  }

  // Default / "En magatzem"
  return {
    key: 'magatzem',
    label: 'En magatzem',
    percentage: 10,
    barWidthClass: 'w-[10%]',
    barColorClass: 'bg-orange-500',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
    dotActiveClass: 'bg-orange-500 border-orange-100 text-white',
    textActiveClass: 'text-orange-700 font-bold',
  };
}

export default function TrackingPage() {
  const [trackingInput, setTrackingInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [shipment, setShipment] = useState<ShipmentRecord | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const codi = trackingInput.trim();
    if (!codi) return;

    setIsLoading(true);
    setErrorMessage(null);
    setNotFound(false);
    setShipment(null);

    console.log('Cercant codi:', codi);

    try {
      const response = await fetch(
        `${SHEETDB_API_URL}/search?tracking_code=${encodeURIComponent(codi)}`
      );

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      const data: unknown = await response.json();
      console.log('Dades rebudes:', data);

      if (!Array.isArray(data)) {
        setErrorMessage('Error connectant amb el servidor');
        return;
      }

      if (data.length === 0) {
        setNotFound(true);
        return;
      }

      setShipment(data[0] as ShipmentRecord);
    } catch {
      setErrorMessage('Error connectant amb el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const statusConfig = shipment ? getStatusConfig(shipment.status) : null;

  const clientValue =
    shipment?.client ||
    shipment?.Client ||
    shipment?.client_name ||
    shipment?.customer ||
    shipment?.nom ||
    'No especificat';

  const stages = [
    {
      key: 'magatzem' as const,
      label: 'En magatzem',
      icon: Warehouse,
      stepIndex: 0,
    },
    {
      key: 'transit' as const,
      label: 'En trànsit',
      icon: Truck,
      stepIndex: 1,
    },
    {
      key: 'lliurat' as const,
      label: 'Lliurat',
      icon: CheckCircle2,
      stepIndex: 2,
    },
  ];

  const activeStageIndex =
    statusConfig?.key === 'lliurat' ? 2 : statusConfig?.key === 'transit' ? 1 : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900">
      {/* Capçalera corporativa blau fosc */}
      <section className="bg-gradient-to-br from-[#071426] via-[#0C2342] to-[#133563] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-blue-100 mb-5">
            <ShieldCheck className="w-4 h-4 text-sky-300 shrink-0" />
            <span>Portal de Traçabilitat TransRomero 3PL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Localitza el teu enviament
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Introdueix el codi de seguiment de la teva expedició per consultar l&apos;estat en temps
            real, la ubicació actual i la data prevista de lliurament.
          </p>

          {/* Formulari Cercador */}
          <form
            onSubmit={handleSearch}
            className="mt-8 sm:mt-10 max-w-2xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-slate-950/25 flex flex-col sm:flex-row gap-2.5 border border-slate-200/80"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Introdueix el codi de seguiment (ex. TR-1001)"
                aria-label="Codi de seguiment"
                className="w-full h-12 pl-11 pr-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !trackingInput.trim()}
              className="h-12 px-7 rounded-xl bg-[#0C2342] hover:bg-[#143766] disabled:bg-slate-400 text-white text-sm sm:text-base font-semibold transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Cercant...</span>
                </>
              ) : (
                <>
                  <span>Cercar</span>
                  <Search className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Àrea de resultats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Estat de càrrega */}
        {isLoading && (
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-lg shadow-slate-900/5 text-center">
            <Loader2 className="w-8 h-8 text-[#0C2342] animate-spin mx-auto mb-3" />
            <p className="text-base font-semibold text-[#0C2342]">Cercant...</p>
            <p className="mt-1 text-xs text-slate-500">
              Consultant la base de dades logística de TransRomero
            </p>
          </div>
        )}

        {/* Missatge vermell: Codi no trobat */}
        {!isLoading && notFound && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-md shadow-red-900/5 flex items-start gap-3.5"
          >
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-red-700">Codi no trobat</h2>
              <p className="mt-1 text-sm text-red-600">
                No hem trobat cap enviament associat al codi{' '}
                <span className="font-mono font-semibold">{trackingInput.trim()}</span>. Revisa que
                estigui escrit correctament i torna-ho a provar.
              </p>
            </div>
          </div>
        )}

        {/* Error de xarxa o servidor */}
        {!isLoading && errorMessage && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-md shadow-red-900/5 flex items-start gap-3.5"
          >
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-red-700">{errorMessage}</h2>
              <p className="mt-1 text-sm text-red-600">
                No s&apos;ha pogut establir connexió amb el servei de seguiment. Torna-ho a intentar
                d&apos;aquí a uns moments.
              </p>
            </div>
          </div>
        )}

        {/* Targeta de resultats de l'enviament */}
        {!isLoading && shipment && statusConfig && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden">
            {/* Capçalera de la targeta */}
            <div className="bg-slate-50/80 border-b border-slate-200 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#0C2342] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Codi de seguiment
                  </p>
                  <p className="text-lg sm:text-xl font-bold font-mono text-[#0C2342] tabular-nums">
                    {shipment.tracking_code || trackingInput.trim()}
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border self-start sm:self-center ${statusConfig.badgeClass}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusConfig.barColorClass}`} />
                <span>{shipment.status || statusConfig.label}</span>
              </span>
            </div>

            {/* Barra de progrés visual (Timeline) */}
            <div className="px-6 sm:px-8 py-7 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
                <span>Progrés de l&apos;enviament</span>
                <span className="font-mono text-[#0C2342] tabular-nums">
                  {statusConfig.percentage}%
                </span>
              </div>

              {/* Barra horitzontal */}
              <div
                role="progressbar"
                aria-valuenow={statusConfig.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Estat de l'enviament: ${statusConfig.label}`}
                className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden shadow-inner"
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${statusConfig.barWidthClass} ${statusConfig.barColorClass}`}
                />
              </div>

              {/* Etiquetes de les 3 etapes sota la barra */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {stages.map((stage) => {
                  const Icon = stage.icon;
                  const isCurrentOrCompleted = stage.stepIndex <= activeStageIndex;
                  const isCurrent = stage.key === statusConfig.key;

                  return (
                    <div
                      key={stage.key}
                      className={`flex flex-col items-center text-center gap-1.5 ${
                        stage.stepIndex === 0
                          ? 'sm:items-start sm:text-left'
                          : stage.stepIndex === 2
                          ? 'sm:items-end sm:text-right'
                          : 'items-center text-center'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isCurrent
                            ? statusConfig.dotActiveClass
                            : isCurrentOrCompleted
                            ? 'bg-[#0C2342] border-slate-200 text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-xs sm:text-sm ${
                          isCurrent
                            ? statusConfig.textActiveClass
                            : isCurrentOrCompleted
                            ? 'text-slate-800 font-semibold'
                            : 'text-slate-400 font-medium'
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Graella de dades de l'enviament */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Client */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <User className="w-4 h-4 text-[#0C2342]" />
                  <span>Client</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {clientValue}
                </p>
              </div>

              {/* Origen */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <Navigation className="w-4 h-4 text-[#0C2342]" />
                  <span>Origen</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {shipment.origin || 'No especificat'}
                </p>
              </div>

              {/* Destí */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <MapPin className="w-4 h-4 text-[#0C2342]" />
                  <span>Destí</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {shipment.destination || 'No especificat'}
                </p>
              </div>

              {/* Data prevista */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  <CalendarClock className="w-4 h-4 text-[#0C2342]" />
                  <span>Data prevista</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                  {shipment.eta || 'Pendent de confirmació'}
                </p>
              </div>

              {/* Ubicació actual */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 sm:col-span-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0C2342] uppercase tracking-wide mb-1.5">
                  <Truck className="w-4 h-4 text-blue-700" />
                  <span>Ubicació actual</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-[#0C2342]">
                  {shipment.location || 'En procés de verificació'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Estat inicial abans de cercar */}
        {!isLoading && !shipment && !notFound && !errorMessage && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0C2342] flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Consulta l&apos;estat de la teva mercaderia
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 max-w-md mx-auto">
              Escriu el teu número de seguiment al cercador superior per visualitzar l&apos;itinerari
              complet i el progrés d&apos;entrega.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
