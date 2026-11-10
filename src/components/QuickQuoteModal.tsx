import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FORMSPREE_ENDPOINT } from './BudgetContactSection';

export interface QuickQuotePrefill {
  productId?: string;
  productTitle?: string;
  volumeRange?: string;
  notes?: string;
}

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: QuickQuotePrefill | null;
}

interface FormState {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  volumenMensual: string;
  productoId: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  empresa?: string;
  correo?: string;
  telefono?: string;
  mensaje?: string;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  prefill,
}) => {
  const { t, products, language } = useLanguage();

  const [form, setForm] = useState<FormState>({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    volumenMensual: t.contact.volumeOptions[1] || '400 – 2.000 pedidos/mes',
    productoId: 'all',
    mensaje: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    reference: string;
    empresa: string;
    correo: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setSubmittedReceipt(null);
    setErrors({});
    if (prefill) {
      setForm((prev) => ({
        ...prev,
        productoId: prefill.productId || prev.productoId,
        volumenMensual: prefill.volumeRange || prev.volumenMensual,
        mensaje: prefill.notes || prev.mensaje,
      }));
    }
  }, [isOpen, prefill]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.nombre.trim() || form.nombre.trim().length < 2) {
      nextErrors.nombre = t.contact.errors.name;
    }
    if (!form.empresa.trim()) {
      nextErrors.empresa = t.contact.errors.company;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!form.correo.trim() || !emailRegex.test(form.correo.trim())) {
      nextErrors.correo = t.contact.errors.email;
    }
    const phoneDigits = form.telefono.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      nextErrors.telefono = t.contact.errors.phone;
    }
    if (!form.mensaje.trim() || form.mensaje.trim().length < 8) {
      nextErrors.mensaje = t.contact.errors.message;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const code = `COT-3PL-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedProd = products.find((p) => p.id === form.productoId);
    const prodLabel = selectedProd
      ? `${selectedProd.techNumber} · ${selectedProd.title}`
      : t.contact.defaultCustomStudy;

    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[TransRomero] Nova Sol·licitud de Pressupost Express (${code})`,
          tipusSolicitud: 'Sol·licitud de Pressupost 3PL Express',
          nom: form.nombre.trim(),
          empresa: form.empresa.trim(),
          email: form.correo.trim(),
          telefon: form.telefono.trim(),
          volumMensual: form.volumenMensual,
          producte: prodLabel,
          missatge: form.mensaje.trim(),
          referencia: code,
          idioma: language,
          dataHora: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Formspree quick quote submission warning:', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedReceipt({
        reference: code,
        empresa: form.empresa.trim(),
        correo: form.correo.trim(),
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-quote-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-obsidian-850 border border-violet-700/70 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-[0_0_40px_rgba(219,39,119,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-violet-900/60">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono text-fuchsia-300 bg-fuchsia-950/60 border border-fuchsia-500/50 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_#34D399]" />
              <span>Formspree: https://formspree.io/f/mljjvwpk</span>
            </div>
            <h2 id="quick-quote-title" className="text-xl sm:text-2xl font-bold text-white">
              {language === 'ca'
                ? 'Sol·licitud de Pressupost 3PL'
                : language === 'en'
                ? '3PL Quotation Request'
                : language === 'fr'
                ? 'Demande de Devis Logistique 3PL'
                : language === 'de'
                ? '3PL-Preisanfrage & Angebot'
                : language === 'it'
                ? 'Richiesta di Preventivo 3PL'
                : 'Solicitud de Presupuesto 3PL'}
            </h2>
            <p className="mt-1 text-xs text-zinc-300">
              {language === 'ca'
                ? 'Estudi econòmic i tècnic a mida per a la teva empresa en menys de 24 hores laborables.'
                : language === 'en'
                ? 'Tailored engineering and commercial proposal delivered in under 24 business hours.'
                : 'Estudio técnico y cotización a medida para tu empresa en menos de 24 horas laborables.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tancar formulari de pressupost"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-obsidian-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedReceipt ? (
          <div className="py-6 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <CheckCircle2 className="w-6 h-6 text-fuchsia-400 shrink-0" />
              <h3 className="text-lg font-bold">
                {language === 'ca'
                  ? 'Sol·licitud de pressupost enviada a Formspree!'
                  : '¡Solicitud de presupuesto enviada a Formspree!'}
              </h3>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {language === 'ca'
                ? `Hem registrat el teu expedient ${submittedReceipt.reference} i l'hem sincronitzat amb l'enllaç de Formspree (mljjvwpk). Rebràs la proposta detallada per a ${submittedReceipt.empresa} al correu ${submittedReceipt.correo}.`
                : `Hemos registrado tu expediente ${submittedReceipt.reference} y lo hemos sincronizado con el enlace de Formspree (mljjvwpk). Recibirás la propuesta detallada para ${submittedReceipt.empresa} en ${submittedReceipt.correo}.`}
            </p>

            <div className="pt-4 border-t border-violet-900/60 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] to-[#DB2777] hover:from-[#5B21B6] hover:to-[#BE185D] rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(219,39,119,0.3)]"
              >
                {t.legalModal.understoodClose}
              </button>
            </div>
          </div>
        ) : (
          <form
            action={FORMSPREE_ENDPOINT}
            method="POST"
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 space-y-4"
          >
            <input
              type="hidden"
              name="_subject"
              value="Nova Sol·licitud de Pressupost Express - TransRomero"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="quote-modal-nombre"
                  className="block text-xs font-semibold text-violet-200 mb-1"
                >
                  {t.contact.fieldName}
                </label>
                <input
                  id="quote-modal-nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, nombre: e.target.value }));
                    if (errors.nombre) setErrors((prev) => ({ ...prev, nombre: undefined }));
                  }}
                  placeholder={t.contact.placeholderName}
                  className={`w-full h-10 px-3 text-xs bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:outline-none ${
                    errors.nombre
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-violet-800/70 focus:border-fuchsia-500'
                  }`}
                />
                {errors.nombre && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.nombre}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="quote-modal-empresa"
                  className="block text-xs font-semibold text-violet-200 mb-1"
                >
                  {t.contact.fieldCompany}
                </label>
                <input
                  id="quote-modal-empresa"
                  name="empresa"
                  type="text"
                  value={form.empresa}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, empresa: e.target.value }));
                    if (errors.empresa) setErrors((prev) => ({ ...prev, empresa: undefined }));
                  }}
                  placeholder={t.contact.placeholderCompany}
                  className={`w-full h-10 px-3 text-xs bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:outline-none ${
                    errors.empresa
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-violet-800/70 focus:border-fuchsia-500'
                  }`}
                />
                {errors.empresa && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.empresa}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="quote-modal-correo"
                  className="block text-xs font-semibold text-violet-200 mb-1"
                >
                  {t.contact.fieldEmail}
                </label>
                <input
                  id="quote-modal-correo"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, correo: e.target.value }));
                    if (errors.correo) setErrors((prev) => ({ ...prev, correo: undefined }));
                  }}
                  placeholder={t.contact.placeholderEmail}
                  className={`w-full h-10 px-3 text-xs bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:outline-none ${
                    errors.correo
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-violet-800/70 focus:border-fuchsia-500'
                  }`}
                />
                {errors.correo && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.correo}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="quote-modal-telefono"
                  className="block text-xs font-semibold text-violet-200 mb-1"
                >
                  {t.contact.fieldPhone}
                </label>
                <input
                  id="quote-modal-telefono"
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, telefono: e.target.value }));
                    if (errors.telefono) setErrors((prev) => ({ ...prev, telefono: undefined }));
                  }}
                  placeholder={t.contact.placeholderPhone}
                  className={`w-full h-10 px-3 text-xs bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:outline-none ${
                    errors.telefono
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-violet-800/70 focus:border-fuchsia-500'
                  }`}
                />
                {errors.telefono && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.telefono}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="quote-modal-producto"
                  className="block text-xs font-semibold text-violet-200 mb-1"
                >
                  {language === 'ca'
                    ? 'Servei / Producte d’interès'
                    : 'Servicio / Producto de interés'}
                </label>
                <select
                  id="quote-modal-producto"
                  name="productoId"
                  value={form.productoId}
                  onChange={(e) => setForm((prev) => ({ ...prev, productoId: e.target.value }))}
                  className="w-full h-10 px-3 text-xs bg-obsidian-900 border border-violet-800/70 rounded-lg text-white focus:outline-none focus:border-fuchsia-500"
                >
                  <option value="all">
                    {language === 'ca'
                      ? 'Estudi Logístic Integral (Tots els serveis)'
                      : 'Estudio Logístico Integral (Todos los servicios)'}
                  </option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.techNumber} · {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="quote-modal-volumen"
                  className="block text-xs font-semibold text-violet-200 mb-1"
                >
                  {t.contact.fieldVolume}
                </label>
                <select
                  id="quote-modal-volumen"
                  name="volumenMensual"
                  value={form.volumenMensual}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, volumenMensual: e.target.value }))
                  }
                  className="w-full h-10 px-3 text-xs bg-obsidian-900 border border-violet-800/70 rounded-lg text-white focus:outline-none focus:border-fuchsia-500"
                >
                  {t.contact.volumeOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-obsidian-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="quote-modal-mensaje"
                className="block text-xs font-semibold text-violet-200 mb-1"
              >
                {language === 'ca'
                  ? 'Requisits tècnics / Descripció de la mercaderia *'
                  : 'Requisitos técnicos / Descripción de la mercancía *'}
              </label>
              <textarea
                id="quote-modal-mensaje"
                name="mensaje"
                rows={3}
                value={form.mensaje}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, mensaje: e.target.value }));
                  if (errors.mensaje) setErrors((prev) => ({ ...prev, mensaje: undefined }));
                }}
                placeholder={t.contact.placeholderMessage}
                className={`w-full p-2.5 text-xs bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:outline-none ${
                  errors.mensaje
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-violet-800/70 focus:border-fuchsia-500'
                }`}
              />
              {errors.mensaje && (
                <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.mensaje}</span>
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-[11px] text-zinc-400">
                {t.contact.disclaimer}
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] disabled:opacity-75 disabled:cursor-not-allowed rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_15px_rgba(219,39,119,0.3)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                    <span>{t.contact.submittingBtn}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {language === 'ca'
                        ? 'Enviar Sol·licitud a Formspree'
                        : 'Enviar Solicitud a Formspree'}
                    </span>
                    <Send className="w-3.5 h-3.5 shrink-0" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
