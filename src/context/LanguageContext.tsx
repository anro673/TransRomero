import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LanguageOption, SUPPORTED_LANGUAGES, SupportedLanguage, UiTranslations } from '../i18n/types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import {
  getLocalizedProducts,
  getLocalizedOperations,
  getLocalizedSteps,
  getLocalizedWhyChooseUs,
  getLocalizedStats,
  getLocalizedTestimonials,
  getLocalizedArticles,
  getLocalizedLegalDocuments,
  LocalizedCoreOperation,
} from '../i18n/dataTranslations';
import {
  LogisticsProduct,
  WorkflowStep,
  WhyChooseUsItem,
  ImpactStat,
  ClientTestimonial,
  BlogArticle,
  LegalDocument,
  LegalDocKey,
} from '../data/companyData';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: UiTranslations;
  languages: LanguageOption[];
  products: LogisticsProduct[];
  operations: LocalizedCoreOperation[];
  steps: WorkflowStep[];
  whyChooseUs: WhyChooseUsItem[];
  stats: ImpactStat[];
  testimonials: ClientTestimonial[];
  blogArticles: BlogArticle[];
  legalDocs: Record<LegalDocKey, LegalDocument>;
  formatCurrency: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'transromero_lang';

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'es';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }
    // Also inspect browser navigator language
    const navLang = navigator.language.slice(0, 2).toLowerCase();
    if (navLang === 'ca' || navLang === 'en' || navLang === 'fr' || navLang === 'de' || navLang === 'it') {
      return navLang as SupportedLanguage;
    }
  } catch {
    // ignore
  }
  return 'es';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => getInitialLanguage());

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.es, [language]);
  const products = useMemo(() => getLocalizedProducts(language), [language]);
  const operations = useMemo(() => getLocalizedOperations(language), [language]);
  const steps = useMemo(() => getLocalizedSteps(language), [language]);
  const whyChooseUs = useMemo(() => getLocalizedWhyChooseUs(language), [language]);
  const stats = useMemo(() => getLocalizedStats(language), [language]);
  const testimonials = useMemo(() => getLocalizedTestimonials(language), [language]);
  const blogArticles = useMemo(() => getLocalizedArticles(language), [language]);
  const legalDocs = useMemo(() => getLocalizedLegalDocuments(language), [language]);

  const formatCurrency = useMemo(() => {
    return (amount: number) => {
      const locale =
        language === 'ca'
          ? 'ca-ES'
          : language === 'en'
          ? 'en-GB'
          : language === 'fr'
          ? 'fr-FR'
          : language === 'de'
          ? 'de-DE'
          : language === 'it'
          ? 'it-IT'
          : 'es-ES';
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(amount);
    };
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t,
    languages: SUPPORTED_LANGUAGES,
    products,
    operations,
    steps,
    whyChooseUs,
    stats,
    testimonials,
    blogArticles,
    legalDocs,
    formatCurrency,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
