export type SupportedLanguage = 'es' | 'ca' | 'en' | 'fr' | 'de' | 'it';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'es', label: 'Español', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ca', label: 'Català', nativeName: 'Català', flag: '🏴󠁥󠁳󠁣󠁴󠁿' },
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹' },
];

export interface UiTranslations {
  nav: {
    home: string;
    services: string;
    about: string;
    blog: string;
    contact: string;
    requestQuote: string;
    openMenu: string;
    closeMenu: string;
    activeBadge: string;
    selectLanguage: string;
    brandHomeLabel: string;
  };
  hero: {
    badgeSlogan: string;
    title: string;
    subtitle: string;
    guaranteeTitle: string;
    guaranteeText: string;
    ctaQuote: string;
    ctaCatalog: string;
    heroImageAlt: string;
    heroImageCaption: string;
    kpis: { figure: string; detail: string }[];
  };
  home: {
    catalogTag: string;
    catalogSubtag: string;
    catalogTitle: string;
    viewAllDatasheets: string;
    mostDemandedBadge: string;
    baseTariffLabel: string;
    fromPrefix: string;
    quoteButton: string;
    datasheetButton: string;
    ctaBannerTag: string;
    ctaBannerTitle: string;
    ctaBannerText: string;
    ctaBannerQuote: string;
    ctaBannerExplore: string;
  };
  howItWorks: {
    tag: string;
    subtag: string;
    title: string;
    subtitle: string;
    stepPrefix: string;
    img1CaptionTitle: string;
    img1CaptionDetail: string;
    img2CaptionTitle: string;
    img2CaptionDetail: string;
  };
  whyChooseUs: {
    tag: string;
    subtag: string;
    title: string;
    subtitle: string;
    calculatorTag: string;
    calculatorTitle: string;
    calculatorSubtitle: string;
    monthlyOrdersLabel: string;
    ordersUnit: string;
    storedPalletsLabel: string;
    palletsUnit: string;
    appliedScaleLabel: string;
    monthlyStorageLabel: string;
    pickingEmbalajeLabel: string;
    shippingLabel: string;
    totalMonthlyEstimate: string;
    avgPerOrder: string;
    ctaApplyVolume: string;
    tierPyme: string;
    tierGrowth: string;
    tierHighVolume: string;
    sliderOrdersMin: string;
    sliderOrdersMid: string;
    sliderOrdersMax: string;
    sliderPalletsMin: string;
    sliderPalletsMid: string;
    sliderPalletsMax: string;
  };
  statsTestimonials: {
    tag: string;
    subtag: string;
    title: string;
    subtitle: string;
    clientsSectionTitle: string;
  };
  catalog: {
    tag: string;
    subtag: string;
    title: string;
    subtitle: string;
    advisoryTitle: string;
    advisoryText: string;
    advisoryBadge: string;
    recommendedBadge: string;
    techNumberLabel: string;
    internalRefLabel: string;
    tariffReferenceLabel: string;
    fromPrefix: string;
    ctaQuoteProduct: string;
    ctaSummarySheet: string;
    definitionTitle: string;
    keyFeaturesTitle: string;
    specTableTitle: string;
    coverageTag: string;
    coverageTitle: string;
    modalTechTitle: string;
    modalClose: string;
    modalQuoteThisRef: string;
    modalLabelCode: string;
    modalLabelRef: string;
    modalLabelNorm: string;
    modalLabelTariff: string;
  };
  about: {
    tag: string;
    subtag: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    check1: string;
    check2: string;
    check3: string;
    ctaContact: string;
    ctaCatalog: string;
    headquartersCaption: string;
    pillars: { code: string; title: string; detail: string }[];
  };
  blog: {
    tag: string;
    subtag: string;
    title: string;
    subtitle: string;
    allArticlesCategory: string;
    byAuthorPrefix: string;
    readArticleBtn: string;
    modalCloseBtn: string;
    modalFormulaTitle: string;
  };
  contact: {
    tag: string;
    subtag: string;
    title: string;
    subtitle: string;
    hubBarcelonaLabel: string;
    hubTarragonaLabel: string;
    phonesLabel: string;
    emailLabel: string;
    scheduleLabel: string;
    formTitle: string;
    formSubtitle: string;
    fieldName: string;
    placeholderName: string;
    fieldCompany: string;
    placeholderCompany: string;
    fieldEmail: string;
    placeholderEmail: string;
    fieldPhone: string;
    placeholderPhone: string;
    fieldVolume: string;
    fieldProducts: string;
    fieldMessage: string;
    placeholderMessage: string;
    submitBtn: string;
    disclaimer: string;
    receiptTitle: string;
    receiptText1: string;
    receiptText2: string;
    receiptContact: string;
    receiptVolume: string;
    receiptProducts: string;
    receiptNewMessageBtn: string;
    defaultCustomStudy: string;
    errors: {
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
    };
    volumeOptions: string[];
  };
  footer: {
    sloganDetail: string;
    navMenuTitle: string;
    hubsTitle: string;
    barcelonaLabel: string;
    tarragonaLabel: string;
    legalNotice: string;
    privacy: string;
    cookies: string;
    academicNoticePrefix: string;
    academicNotice: string;
    allRightsReserved: string;
  };
  legalModal: {
    badge: string;
    closeBtn: string;
    tabAviso: string;
    tabPrivacidad: string;
    tabCookies: string;
    understoodClose: string;
  };
}
