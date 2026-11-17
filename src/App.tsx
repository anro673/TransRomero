/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { Navbar, PageId } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ServicesCatalogPage } from './components/ServicesCatalogPage';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { BudgetContactSection, BudgetPrefillPayload } from './components/BudgetContactSection';
import { QuickQuoteModal, QuickQuotePrefill } from './components/QuickQuoteModal';
import TrackingPage from './app/tracking/page';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { LegalDocKey, LogisticsProduct } from './data/companyData';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const VALID_PAGES: PageId[] = ['inicio', 'servicios', 'quienes-somos', 'tracking', 'blog', 'contacto'];

function getPageFromHash(): PageId {
  const raw = window.location.hash.replace('#', '') as PageId;
  if (VALID_PAGES.includes(raw)) return raw;
  if (window.location.pathname.replace(/\/+$/, '') === '/tracking') return 'tracking';
  return 'inicio';
}

function MainApp() {
  const { language, t } = useLanguage();
  const [activePage, setActivePage] = useState<PageId>(() => getPageFromHash());
  const [focusedProductId, setFocusedProductId] = useState<string | null>(null);
  const [budgetPrefill, setBudgetPrefill] = useState<BudgetPrefillPayload | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocKey | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalPrefill, setQuoteModalPrefill] = useState<QuickQuotePrefill | null>(null);

  useEffect(() => {
    const syncRoute = () => {
      setActivePage(getPageFromHash());
    };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const navigateToPage = useCallback((page: PageId, skipScrollTop = false) => {
    setActivePage(page);
    if (page === 'tracking') {
      if (window.location.pathname.replace(/\/+$/, '') !== '/tracking' || window.location.hash) {
        window.history.pushState(null, '', '/tracking');
      }
    } else {
      const targetHash = page === 'inicio' ? '' : `#${page}`;
      const targetUrl = page === 'inicio' ? '/' : `/#${page}`;
      if (window.location.pathname !== '/' || window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetUrl);
      }
    }
    if (!skipScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleOpenProductInCatalog = useCallback(
    (productId: string) => {
      setFocusedProductId(productId);
      navigateToPage('servicios', true);
    },
    [navigateToPage]
  );

  const handleOpenQuoteModal = useCallback((prefillData?: QuickQuotePrefill) => {
    setQuoteModalPrefill(prefillData || null);
    setIsQuoteModalOpen(true);
  }, []);

  const handleQuoteProduct = useCallback(
    (product: LogisticsProduct) => {
      setBudgetPrefill({
        productId: product.id,
        mode: 'presupuesto',
        timestamp: Date.now(),
      });
      setQuoteModalPrefill({
        productId: product.id,
        productTitle: product.title,
        notes: `Sol·licitud de pressupost per a: ${product.techNumber} · ${product.title} (REF: ${product.internalRef})`,
      });
      navigateToPage('contacto');
      window.setTimeout(() => {
        const input = document.getElementById('budget-nombre');
        if (input) input.focus({ preventScroll: true });
      }, 350);
    },
    [navigateToPage]
  );

  const handleApplyVolumeEstimate = useCallback(
    (estimateSummary: string, volumeRangeLabel: string) => {
      setBudgetPrefill({
        volumeRange: volumeRangeLabel,
        notes: estimateSummary,
        mode: 'presupuesto',
        timestamp: Date.now(),
      });
      setQuoteModalPrefill({
        volumeRange: volumeRangeLabel,
        notes: estimateSummary,
      });
      navigateToPage('contacto');
      window.setTimeout(() => {
        const input = document.getElementById('budget-nombre');
        if (input) input.focus({ preventScroll: true });
      }, 350);
    },
    [navigateToPage]
  );

  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100 relative">
      <Navbar
        activePage={activePage}
        onNavigatePage={(p) => navigateToPage(p)}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      <main className="flex-1">
        {activePage === 'inicio' && (
          <HomeView
            onNavigatePage={(p) => navigateToPage(p)}
            onOpenProductInCatalog={handleOpenProductInCatalog}
            onQuoteProduct={handleQuoteProduct}
            onApplyVolumeEstimate={handleApplyVolumeEstimate}
          />
        )}

        {activePage === 'servicios' && (
          <ServicesCatalogPage
            initialFocusedProductId={focusedProductId}
            onClearFocusedProduct={() => setFocusedProductId(null)}
            onQuoteProduct={handleQuoteProduct}
          />
        )}

        {activePage === 'quienes-somos' && (
          <AboutPage onNavigatePage={(p) => navigateToPage(p)} />
        )}

        {activePage === 'tracking' && <TrackingPage />}

        {activePage === 'blog' && <BlogPage />}

        {activePage === 'contacto' && <BudgetContactSection prefill={budgetPrefill} />}
      </main>

      {/* Dark Corporate Footer repeated across every page */}
      <Footer
        onNavigatePage={(p) => navigateToPage(p)}
        onOpenLegal={(key) => setActiveLegalDoc(key)}
      />

      <LegalModal
        docKey={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
        onSelectDoc={(key) => setActiveLegalDoc(key)}
      />

      {/* Standalone Quick Quote Modal connected directly to Formspree mljjvwpk */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        prefill={quoteModalPrefill}
      />

      {/* Floating Fast Quote Trigger (Formspree mljjvwpk) */}
      <aside aria-label="Sol·licitud de Pressupost Express" className="fixed bottom-5 right-5 z-30">
        <button
          type="button"
          onClick={() => handleOpenQuoteModal()}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500 shadow-[0_0_25px_rgba(219,39,119,0.45)] border border-fuchsia-400/50 transition-all duration-200 hover:scale-105 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
          title="Sol·licitar pressupost tècnic 3PL (Enllaç Formspree)"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_#34D399] animate-pulse" />
          <Zap className="w-4 h-4 text-yellow-300 shrink-0" />
          <span className="hidden sm:inline">
            {language === 'ca'
              ? 'Demanar Pressupost Express'
              : language === 'en'
              ? 'Instant 3PL Quote'
              : 'Solicitar Presupuesto Express'}
          </span>
          <span className="sm:hidden">{t.nav.requestQuote}</span>
        </button>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
