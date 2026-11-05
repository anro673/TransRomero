/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ServicesCatalogPage } from './components/ServicesCatalogPage';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { BudgetContactSection, BudgetPrefillPayload } from './components/BudgetContactSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { LegalDocKey, LogisticsProduct } from './data/companyData';
import { LanguageProvider } from './context/LanguageContext';

const VALID_PAGES: PageId[] = ['inicio', 'servicios', 'quienes-somos', 'blog', 'contacto'];

function getPageFromHash(): PageId {
  const raw = window.location.hash.replace('#', '') as PageId;
  return VALID_PAGES.includes(raw) ? raw : 'inicio';
}

function MainApp() {
  const [activePage, setActivePage] = useState<PageId>(() => getPageFromHash());
  const [focusedProductId, setFocusedProductId] = useState<string | null>(null);
  const [budgetPrefill, setBudgetPrefill] = useState<BudgetPrefillPayload | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocKey | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(getPageFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateToPage = useCallback((page: PageId, skipScrollTop = false) => {
    setActivePage(page);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
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

  const handleQuoteProduct = useCallback(
    (product: LogisticsProduct) => {
      setBudgetPrefill({
        productId: product.id,
        timestamp: Date.now(),
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
        timestamp: Date.now(),
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
    <div className="min-h-screen flex flex-col bg-black text-zinc-100">
      <Navbar activePage={activePage} onNavigatePage={(p) => navigateToPage(p)} />

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
