import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe, Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../i18n/types';

export type PageId = 'inicio' | 'servicios' | 'quienes-somos' | 'blog' | 'contacto';

interface NavbarProps {
  activePage: PageId;
  onNavigatePage: (page: PageId) => void;
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigatePage,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t, languages } = useLanguage();

  const navItems: { id: PageId; label: string }[] = [
    { id: 'inicio', label: t.nav.home },
    { id: 'servicios', label: t.nav.services },
    { id: 'quienes-somos', label: t.nav.about },
    { id: 'blog', label: t.nav.blog },
    { id: 'contacto', label: t.nav.contact },
  ];

  const currentLangOption = languages.find((l) => l.code === language) || languages[0];

  // Close dropdown on click outside
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [langDropdownOpen]);

  const handleSelectPage = (page: PageId) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
  };

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-violet-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 lg:gap-6">
        {/* Zone 1: Official TransRomero White-Violet-Magenta Logo (transparent, no box) */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleSelectPage('inicio');
          }}
          aria-label={t.nav.brandHomeLabel || `${COMPANY_INFO.brandName} — Ir a Inicio`}
          className="flex items-center py-1 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500 rounded"
        >
          <BrandLogo className="h-9 sm:h-11 w-auto" />
          <span className="sr-only">{COMPANY_INFO.brandName}</span>
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav
          aria-label={t.nav.home}
          className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPage(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500 rounded ${
                  isActive
                    ? 'text-white font-bold after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-gradient-to-r after:from-violet-500 after:to-fuchsia-500'
                    : 'text-zinc-300 hover:text-white after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-violet-500/60 after:opacity-0 hover:after:opacity-100 after:transition-opacity'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Language Selector + Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Desktop & Tablet Language Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
              aria-label={t.nav.selectLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 h-9 text-xs font-semibold text-zinc-200 bg-obsidian-850 hover:bg-[#1C1236] border border-violet-700/60 hover:border-fuchsia-500/70 rounded-lg transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400"
            >
              <Globe className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
              <span className="text-sm leading-none">{currentLangOption.flag}</span>
              <span className="font-mono text-xs uppercase tracking-wider text-white">
                {currentLangOption.code}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180 text-fuchsia-400' : ''
                }`}
              />
            </button>

            {/* Language Popover Menu */}
            {langDropdownOpen && (
              <div
                role="listbox"
                aria-label={t.nav.selectLanguage}
                className="absolute right-0 mt-2 w-48 bg-[#0D091B] border border-violet-700/70 rounded-xl p-1.5 shadow-[0_10px_35px_rgba(147,51,234,0.35)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-2.5 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-violet-900/60 mb-1">
                  {t.nav.selectLanguage}
                </div>
                {languages.map((item) => {
                  const isSelected = item.code === language;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectLanguage(item.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-violet-900/80 to-fuchsia-950/80 text-white font-semibold border border-fuchsia-500/50'
                          : 'text-zinc-300 hover:text-white hover:bg-obsidian-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{item.flag}</span>
                        <span>{item.nativeName}</span>
                      </div>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] font-mono uppercase text-zinc-500">
                          {item.code}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => {
              if (onOpenQuoteModal) {
                onOpenQuoteModal();
              } else {
                handleSelectPage('contacto');
              }
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 min-h-[38px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400 shadow-[0_0_15px_rgba(219,39,119,0.3)]"
          >
            {t.nav.requestQuote}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-obsidian-850 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-violet-900/50 bg-[#08060F] px-4 pt-3 pb-6 shadow-2xl">
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectPage(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between min-h-[44px] px-3.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-obsidian-850 text-white font-bold border border-violet-800/60'
                      : 'text-zinc-300 hover:bg-obsidian-850/70 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-mono text-fuchsia-400">
                      {t.nav.activeBadge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Language Grid */}
          <div className="mt-4 pt-4 border-t border-violet-900/60">
            <p className="text-xs font-semibold text-zinc-400 mb-2.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>{t.nav.selectLanguage}</span>
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {languages.map((item) => {
                const isSelected = item.code === language;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleSelectLanguage(item.code)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-violet-900 to-fuchsia-950 text-white font-bold border border-fuchsia-500/70 shadow-[0_0_12px_rgba(219,39,119,0.25)]'
                        : 'bg-obsidian-850 text-zinc-300 hover:text-white border border-violet-900/40'
                    }`}
                  >
                    <span className="text-sm leading-none">{item.flag}</span>
                    <span className="truncate">{item.nativeName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-violet-900/50">
            <button
              type="button"
              onClick={() => {
                if (onOpenQuoteModal) {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                } else {
                  handleSelectPage('contacto');
                }
              }}
              className="w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#DB2777] hover:from-[#5B21B6] hover:via-[#7E22CE] hover:to-[#BE185D] rounded-lg transition-all shadow-[0_0_15px_rgba(219,39,119,0.3)] cursor-pointer"
            >
              {t.nav.requestQuote}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
