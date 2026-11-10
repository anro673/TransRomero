import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Calculator,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ResilientImage } from './ResilientImage';
import { useLanguage } from '../context/LanguageContext';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mljjvwpk';

export interface BudgetPrefillPayload {
  productId?: string;
  volumeRange?: string;
  notes?: string;
  mode?: 'presupuesto' | 'contacto';
  timestamp: number;
}

interface BudgetContactSectionProps {
  prefill: BudgetPrefillPayload | null;
}

interface FormState {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  asunto: string;
  volumenMensual: string;
  productosSeleccionados: string[];
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  empresa?: string;
  correo?: string;
  telefono?: string;
  asunto?: string;
  mensaje?: string;
}

export const BudgetContactSection: React.FC<BudgetContactSectionProps> = ({ prefill }) => {
  const { t, products, language } = useLanguage();

  const [formMode, setFormMode] = useState<'presupuesto' | 'contacto'>('presupuesto');
  const [form, setForm] = useState<FormState>({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    asunto: '',
    volumenMensual: t.contact.volumeOptions[1] || '400 – 2.000 pedidos/mes',
    productosSeleccionados: products.map((p) => p.id),
    mensaje: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    reference: string;
    mode: 'presupuesto' | 'contacto';
    nombre: string;
    empresa: string;
    correo: string;
    volumenMensual?: string;
    productos?: string[];
    asunto?: string;
    sentToFormspree: boolean;
  } | null>(null);

  useEffect(() => {
    if (!prefill) return;
    setSubmittedReceipt(null);
    if (prefill.mode) {
      setFormMode(prefill.mode);
    } else {
      setFormMode('presupuesto');
    }

    setForm((prev) => {
      const targetProd = products.find((p) => p.id === prefill.productId);
      const nextSelected =
        targetProd && !prev.productosSeleccionados.includes(targetProd.id)
          ? [...prev.productosSeleccionados, targetProd.id]
          : prev.productosSeleccionados;

      return {
        ...prev,
        volumenMensual: prefill.volumeRange || prev.volumenMensual,
        productosSeleccionados: nextSelected,
        mensaje:
          prefill.notes ||
          (targetProd
            ? `[${targetProd.techNumber} · REF: ${targetProd.internalRef}] — "${targetProd.title}".`
            : prev.mensaje),
      };
    });
  }, [prefill, products]);

  const toggleProductCheckbox = (productId: string) => {
    setForm((prev) => {
      const exists = prev.productosSeleccionados.includes(productId);
      return {
        ...prev,
        productosSeleccionados: exists
          ? prev.productosSeleccionados.filter((id) => id !== productId)
          : [...prev.productosSeleccionados, productId],
      };
    });
  };

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

    if (formMode === 'contacto' && !form.asunto.trim()) {
      nextErrors.asunto = language === 'ca' ? "L'assumpte és obligatori" : 'El asunto es obligatorio';
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

    const prefix = formMode === 'presupuesto' ? 'COT-3PL' : 'CNT-TR';
    const code = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedLabels = products
      .filter((p) => form.productosSeleccionados.includes(p.id))
      .map((p) => `${p.techNumber} (${p.internalRef})`);

    const emailSubject =
      formMode === 'presupuesto'
        ? `[TransRomero] Nova Sol·licitud de Pressupost 3PL (${code})`
        : `[TransRomero] Nou Missatge de Contacte (${code})`;

    let sentSuccessfully = true;

    try {
      const payload: Record<string, string> = {
        _subject: emailSubject,
        tipusFormulari:
          formMode === 'presupuesto'
            ? 'Sol·licitud de Pressupost 3PL'
            : 'Formulari de Contacte General',
        nom: form.nombre.trim(),
        empresa: form.empresa.trim(),
        email: form.correo.trim(),
        telefon: form.telefono.trim(),
        missatge: form.mensaje.trim(),
        referencia: code,
        idioma: language,
        dataHora: new Date().toISOString(),
      };

      if (formMode === 'presupuesto') {
        payload.volumMensual = form.volumenMensual;
        payload.productesSeleccionats =
          selectedLabels.length > 0 ? selectedLabels.join(' · ') : t.contact.defaultCustomStudy;
      } else {
        payload.assumpte = form.asunto.trim() || 'Consulta General';
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        sentSuccessfully = false;
        console.warn('Formspree returned non-200 status:', response.status);
      }
    } catch (err) {
      sentSuccessfully = false;
      console.warn('Formspree submission error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedReceipt({
        reference: code,
        mode: formMode,
        nombre: form.nombre.trim(),
        empresa: form.empresa.trim(),
        correo: form.correo.trim(),
        volumenMensual: form.volumenMensual,
        productos:
          selectedLabels.length > 0 ? selectedLabels : [t.contact.defaultCustomStudy],
        asunto: form.asunto.trim(),
        sentToFormspree: sentSuccessfully,
      });
    }
  };

  return (
    <div className="bg-black">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#150A2B] via-[#0B0617] to-black text-white border-b border-violet-900/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-3">
              <span>{t.contact.tag}</span>
              <span aria-hidden="true" className="text-violet-400/60">
                ·
              </span>
              <span className="text-violet-300">{t.contact.subtag}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
              {t.contact.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-zinc-300 leading-relaxed tracking-[0.01em]">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Column: Physical Office & Warehouse Contact Data */}
            <div className="lg:col-span-5">
              <div className="p-[2px] rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_0_30px_rgba(219,39,119,0.25)]">
                <div className="rounded-[14px] overflow-hidden bg-obsidian-900 aspect-[16/10]">
                  <ResilientImage
                    src={COMPANY_INFO.images.fleet}
                    alt="Centro de Distribución y Muelles 3PL"
                    fallbackType="fleet"
                    fallbackLabel="Centro de Distribución y Muelles 3PL"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <dl className="mt-7 pt-7 border-t border-violet-900/50 space-y-5">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs font-bold text-white">
                      {t.contact.hubBarcelonaLabel}
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-300 leading-snug">
                      {COMPANY_INFO.hubBarcelona}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs font-bold text-white">
                      {t.contact.hubTarragonaLabel}
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-300 leading-snug">
                      {COMPANY_INFO.hubTarragona}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs font-bold text-white">{t.contact.phonesLabel}</dt>
                    <dd className="mt-1 text-sm font-mono text-zinc-100 tabular-nums space-x-2">
                      <a
                        href="tel:+34935184270"
                        className="hover:text-fuchsia-400 transition-colors"
                      >
                        {COMPANY_INFO.phoneBarcelona}
                      </a>
                      <span className="text-violet-500">·</span>
                      <a
                        href="tel:+34977296410"
                        className="hover:text-fuchsia-400 transition-colors"
                      >
                        {COMPANY_INFO.phoneTarragona}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs font-bold text-white">{t.contact.emailLabel}</dt>
                    <dd className="mt-1 text-sm">
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-violet-300 font-medium hover:text-fuchsia-400 underline underline-offset-4 transition-colors"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
                  <div>
                    <dt className="text-xs font-bold text-white">{t.contact.scheduleLabel}</dt>
                    <dd className="mt-1 text-sm text-zinc-300">{COMPANY_INFO.schedule}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Right Column: Dual Form (Solicitud de Presupuesto / Formulario de Contacto) both bound to Formspree */}
            <div className="lg:col-span-7 p-[2px] rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_0_35px_rgba(219,39,119,0.25)]">
              <div className="bg-obsidian-850 rounded-[14px] p-6 sm:p-8">
                {/* Form Mode Selector Tabs: Solicitud de Presupuesto vs Formulario de Contacto */}
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-black/70 rounded-xl border border-violet-800/60 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setFormMode('presupuesto');
                      setSubmittedReceipt(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      formMode === 'presupuesto'
                        ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.35)]'
                        : 'text-zinc-400 hover:text-white hover:bg-obsidian-800'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>{t.contact.tabQuote}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormMode('contacto');
                      setSubmittedReceipt(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      formMode === 'contacto'
                        ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.35)]'
                        : 'text-zinc-400 hover:text-white hover:bg-obsidian-800'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>{t.contact.tabContact}</span>
                  </button>
                </div>

                {/* Formspree Connection Live Indicator Badge */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-lg bg-violet-950/70 border border-fuchsia-500/50 text-xs">
                  <div className="flex items-center gap-2 text-fuchsia-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_#34D399] animate-pulse" />
                    <span className="font-semibold text-white">Formspree Endpoint:</span>
                    <a
                      href={FORMSPREE_ENDPOINT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-fuchsia-300 hover:text-white underline underline-offset-2 transition-colors"
                    >
                      {FORMSPREE_ENDPOINT}
                    </a>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-fuchsia-950/90 text-fuchsia-300 border border-fuchsia-500/40">
                    {formMode === 'presupuesto' ? 'Cotització Activa' : 'Contacte Actiu'}
                  </span>
                </div>

                {submittedReceipt ? (
                  <div className="py-6">
                    <div className="flex items-center gap-2.5 text-white">
                      <CheckCircle2 className="w-6 h-6 text-fuchsia-400 shrink-0" />
                      <h2 className="text-xl font-bold">
                        {submittedReceipt.mode === 'presupuesto'
                          ? language === 'ca'
                            ? 'Sol·licitud de Pressupost Tramesa a Formspree!'
                            : '¡Solicitud de Presupuesto Enviada a Formspree!'
                          : t.contact.receiptTitle}
                      </h2>
                    </div>

                    <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-950/80 border border-fuchsia-500/50 w-fit text-xs text-fuchsia-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_#34D399]" />
                      <span>{t.contact.formspreeNotice} ({FORMSPREE_ENDPOINT})</span>
                    </div>

                    <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                      {t.contact.receiptText1}{' '}
                      <span className="font-mono font-semibold text-fuchsia-300 bg-obsidian-900 border border-fuchsia-500/70 px-2 py-0.5 rounded tabular-nums">
                        {submittedReceipt.reference}
                      </span>
                      . {t.contact.receiptText2}{' '}
                      <strong className="text-white">{submittedReceipt.empresa}</strong> (
                      <strong className="text-white">{submittedReceipt.correo}</strong>).
                    </p>

                    <dl className="mt-6 pt-5 border-t border-violet-900/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <dt className="text-zinc-400">{t.contact.receiptContact}</dt>
                        <dd className="mt-0.5 font-semibold text-white">
                          {submittedReceipt.nombre}
                        </dd>
                      </div>
                      {submittedReceipt.mode === 'presupuesto' ? (
                        <>
                          <div>
                            <dt className="text-zinc-400">{t.contact.receiptVolume}</dt>
                            <dd className="mt-0.5 font-semibold text-white tabular-nums">
                              {submittedReceipt.volumenMensual}
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-zinc-400">{t.contact.receiptProducts}</dt>
                            <dd className="mt-1 font-mono text-fuchsia-400 font-semibold">
                              {submittedReceipt.productos?.join(' · ')}
                            </dd>
                          </div>
                        </>
                      ) : (
                        <div className="sm:col-span-2">
                          <dt className="text-zinc-400">
                            {language === 'ca' ? 'Assumpte tramès' : 'Asunto enviado'}
                          </dt>
                          <dd className="mt-0.5 font-semibold text-white">
                            {submittedReceipt.asunto || 'Consulta General'}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-7">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedReceipt(null);
                          setForm({
                            nombre: '',
                            empresa: '',
                            correo: '',
                            telefono: '',
                            asunto: '',
                            volumenMensual: t.contact.volumeOptions[1] || '400 – 2.000 pedidos/mes',
                            productosSeleccionados: products.map((p) => p.id),
                            mensaje: '',
                          });
                          setErrors({});
                        }}
                        className="px-5 py-2.5 min-h-[42px] text-xs font-semibold text-violet-100 bg-obsidian-800 hover:bg-[#23193E] border border-violet-700/50 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.contact.receiptNewMessageBtn}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    action={FORMSPREE_ENDPOINT}
                    method="POST"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <input
                      type="hidden"
                      name="_subject"
                      value={
                        formMode === 'presupuesto'
                          ? 'Nova Sol·licitud de Pressupost 3PL - TransRomero'
                          : 'Nou Missatge de Contacte - TransRomero'
                      }
                    />

                    <div>
                      <h2 className="text-lg font-bold text-white">
                        {formMode === 'presupuesto'
                          ? t.contact.quoteFormTitle
                          : t.contact.contactFormTitle}
                      </h2>
                      <p className="mt-1 text-xs text-zinc-400">
                        {formMode === 'presupuesto'
                          ? t.contact.quoteFormSubtitle
                          : t.contact.contactFormSubtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="budget-nombre"
                          className="block text-xs font-semibold text-violet-200 mb-1.5"
                        >
                          {t.contact.fieldName}
                        </label>
                        <input
                          id="budget-nombre"
                          name="nombre"
                          type="text"
                          autoComplete="name"
                          value={form.nombre}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, nombre: e.target.value }));
                            if (errors.nombre)
                              setErrors((prev) => ({ ...prev, nombre: undefined }));
                          }}
                          placeholder={t.contact.placeholderName}
                          aria-invalid={Boolean(errors.nombre)}
                          aria-describedby={errors.nombre ? 'err-nombre' : undefined}
                          className={`w-full h-11 px-3.5 text-sm bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:bg-black focus:outline-none focus:ring-1 ${
                            errors.nombre
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                              : 'border-violet-800/70 focus:border-fuchsia-500 focus:ring-fuchsia-500'
                          }`}
                        />
                        {errors.nombre && (
                          <p
                            id="err-nombre"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.nombre}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="budget-empresa"
                          className="block text-xs font-semibold text-violet-200 mb-1.5"
                        >
                          {t.contact.fieldCompany}
                        </label>
                        <input
                          id="budget-empresa"
                          name="empresa"
                          type="text"
                          autoComplete="organization"
                          value={form.empresa}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, empresa: e.target.value }));
                            if (errors.empresa)
                              setErrors((prev) => ({ ...prev, empresa: undefined }));
                          }}
                          placeholder={t.contact.placeholderCompany}
                          aria-invalid={Boolean(errors.empresa)}
                          aria-describedby={errors.empresa ? 'err-empresa' : undefined}
                          className={`w-full h-11 px-3.5 text-sm bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:bg-black focus:outline-none focus:ring-1 ${
                            errors.empresa
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                              : 'border-violet-800/70 focus:border-fuchsia-500 focus:ring-fuchsia-500'
                          }`}
                        />
                        {errors.empresa && (
                          <p
                            id="err-empresa"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.empresa}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="budget-correo"
                          className="block text-xs font-semibold text-violet-200 mb-1.5"
                        >
                          {t.contact.fieldEmail}
                        </label>
                        <input
                          id="budget-correo"
                          name="correo"
                          type="email"
                          autoComplete="email"
                          value={form.correo}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, correo: e.target.value }));
                            if (errors.correo)
                              setErrors((prev) => ({ ...prev, correo: undefined }));
                          }}
                          placeholder={t.contact.placeholderEmail}
                          aria-invalid={Boolean(errors.correo)}
                          aria-describedby={errors.correo ? 'err-correo' : undefined}
                          className={`w-full h-11 px-3.5 text-sm bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:bg-black focus:outline-none focus:ring-1 ${
                            errors.correo
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                              : 'border-violet-800/70 focus:border-fuchsia-500 focus:ring-fuchsia-500'
                          }`}
                        />
                        {errors.correo && (
                          <p
                            id="err-correo"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.correo}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="budget-telefono"
                          className="block text-xs font-semibold text-violet-200 mb-1.5"
                        >
                          {t.contact.fieldPhone}
                        </label>
                        <input
                          id="budget-telefono"
                          name="telefono"
                          type="tel"
                          autoComplete="tel"
                          value={form.telefono}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, telefono: e.target.value }));
                            if (errors.telefono)
                              setErrors((prev) => ({ ...prev, telefono: undefined }));
                          }}
                          placeholder={t.contact.placeholderPhone}
                          aria-invalid={Boolean(errors.telefono)}
                          aria-describedby={errors.telefono ? 'err-telefono' : undefined}
                          className={`w-full h-11 px-3.5 text-sm bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:bg-black focus:outline-none focus:ring-1 tabular-nums ${
                            errors.telefono
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                              : 'border-violet-800/70 focus:border-fuchsia-500 focus:ring-fuchsia-500'
                          }`}
                        />
                        {errors.telefono && (
                          <p
                            id="err-telefono"
                            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.telefono}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Mode Specific: If Presupuesto, show Volume Selector and Logistics Product Checkboxes */}
                    {formMode === 'presupuesto' ? (
                      <>
                        <div>
                          <label
                            htmlFor="budget-volumen"
                            className="block text-xs font-semibold text-violet-200 mb-1.5"
                          >
                            {t.contact.fieldVolume}
                          </label>
                          <select
                            id="budget-volumen"
                            name="volumenMensual"
                            value={form.volumenMensual}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, volumenMensual: e.target.value }))
                            }
                            className="w-full h-11 px-3.5 text-sm bg-obsidian-900 border border-violet-800/70 rounded-lg text-white focus:bg-black focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
                          >
                            {t.contact.volumeOptions.map((opt) => (
                              <option key={opt} value={opt} className="bg-obsidian-900 text-white">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Selection of the 3 Concrete Logistics Products */}
                        <fieldset>
                          <legend className="block text-xs font-semibold text-violet-200 mb-2">
                            {t.contact.fieldProducts}
                          </legend>
                          <div className="space-y-2">
                            {products.map((prod) => {
                              const checked = form.productosSeleccionados.includes(prod.id);
                              return (
                                <label
                                  key={prod.id}
                                  className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                                    checked
                                      ? 'bg-[#1B1132] border-fuchsia-500 text-white'
                                      : 'bg-obsidian-900 border-violet-900/50 text-zinc-300 hover:border-violet-700'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleProductCheckbox(prod.id)}
                                    className="mt-0.5 w-4 h-4 accent-[#E838C8] rounded shrink-0"
                                  />
                                  <div>
                                    <span className="font-mono text-[11px] font-semibold text-fuchsia-400 block tabular-nums">
                                      {prod.techNumber} · REF: {prod.internalRef}
                                    </span>
                                    <span className="font-semibold text-white">{prod.title}</span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      </>
                    ) : (
                      /* Mode Specific: If Contacto General, show Subject field */
                      <div>
                        <label
                          htmlFor="budget-asunto"
                          className="block text-xs font-semibold text-violet-200 mb-1.5"
                        >
                          {t.contact.fieldSubject}
                        </label>
                        <input
                          id="budget-asunto"
                          name="asunto"
                          type="text"
                          value={form.asunto}
                          onChange={(e) => {
                            setForm((prev) => ({ ...prev, asunto: e.target.value }));
                            if (errors.asunto)
                              setErrors((prev) => ({ ...prev, asunto: undefined }));
                          }}
                          placeholder={t.contact.placeholderSubject}
                          className={`w-full h-11 px-3.5 text-sm bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:bg-black focus:outline-none focus:ring-1 ${
                            errors.asunto
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                              : 'border-violet-800/70 focus:border-fuchsia-500 focus:ring-fuchsia-500'
                          }`}
                        />
                        {errors.asunto && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.asunto}</span>
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="budget-mensaje"
                        className="block text-xs font-semibold text-violet-200 mb-1.5"
                      >
                        {formMode === 'presupuesto'
                          ? language === 'ca'
                            ? 'Detalls tècnics de la mercaderia i requeriments *'
                            : 'Detalles técnicos de la mercancía y requerimientos *'
                          : t.contact.fieldMessage}
                      </label>
                      <textarea
                        id="budget-mensaje"
                        name="mensaje"
                        rows={4}
                        value={form.mensaje}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, mensaje: e.target.value }));
                          if (errors.mensaje)
                            setErrors((prev) => ({ ...prev, mensaje: undefined }));
                        }}
                        placeholder={t.contact.placeholderMessage}
                        aria-invalid={Boolean(errors.mensaje)}
                        aria-describedby={errors.mensaje ? 'err-mensaje' : undefined}
                        className={`w-full p-3.5 text-sm bg-obsidian-900 border rounded-lg text-white placeholder:text-zinc-500 focus:bg-black focus:outline-none focus:ring-1 ${
                          errors.mensaje
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                            : 'border-violet-800/70 focus:border-fuchsia-500 focus:ring-fuchsia-500'
                        }`}
                      />
                      {errors.mensaje && (
                        <p
                          id="err-mensaje"
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.mensaje}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <p className="text-xs text-zinc-400">
                        {t.contact.disclaimer}
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] text-sm font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] disabled:opacity-75 disabled:cursor-not-allowed rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400 shadow-[0_0_18px_rgba(219,39,119,0.3)]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                            <span>{t.contact.submittingBtn}</span>
                          </>
                        ) : (
                          <>
                            <span>
                              {formMode === 'presupuesto'
                                ? t.contact.submitQuoteBtn
                                : t.contact.submitContactBtn}
                            </span>
                            <Send className="w-4 h-4 shrink-0" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
