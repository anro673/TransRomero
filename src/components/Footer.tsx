import React from 'react';
import { COMPANY_INFO, LegalDocKey } from '../data/companyData';
import { PageId } from './Navbar';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigatePage: (page: PageId) => void;
  onOpenLegal: (docKey: LegalDocKey) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onOpenLegal }) => {
  const { t, language, setLanguage, languages } = useLanguage();

  return (
    <footer className="bg-[#05030A] text-zinc-300 border-t-2 border-fuchsia-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Lockup & Positioning */}
          <div className="lg:col-span-5">
            <div className="flex items-center">
              <BrandLogo className="h-10 sm:h-11 w-auto" />
              <span className="sr-only">{COMPANY_INFO.brandName}</span>
            </div>

            <p className="mt-4 text-sm text-zinc-300 leading-relaxed max-w-md tracking-[0.01em]">
              {COMPANY_INFO.slogan}. {t.footer.sloganDetail}
            </p>

            <p className="mt-4 text-xs text-fuchsia-400 font-mono tabular-nums">
              {COMPANY_INFO.legalName} · NIF {COMPANY_INFO.nif}
            </p>

            {/* Language Switcher Badges in Footer */}
            <div className="mt-6 pt-5 border-t border-violet-900/50">
              <span className="text-xs font-semibold text-zinc-400 block mb-2">
                {t.nav.selectLanguage}:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                      language === l.code
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold shadow-xs'
                        : 'bg-obsidian-850 hover:bg-obsidian-800 text-zinc-300 hover:text-white border border-violet-900/50'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5 Mandatory Navigation Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white tracking-wide">{t.footer.navMenuTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { id: 'inicio' as PageId, label: t.nav.home },
                { id: 'servicios' as PageId, label: t.nav.services },
                { id: 'quienes-somos' as PageId, label: t.nav.about },
                { id: 'blog' as PageId, label: t.nav.blog },
                { id: 'contacto' as PageId, label: t.nav.contact },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigatePage(item.id);
                    }}
                    className="text-zinc-300 hover:text-fuchsia-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Physical Contact Data & Legal Links */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              {t.footer.hubsTitle}
            </h3>
            <div className="mt-4 text-xs text-zinc-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-violet-400">{t.footer.barcelonaLabel}</strong> {COMPANY_INFO.hubBarcelona}
              </p>
              <p>
                <strong className="text-violet-400">{t.footer.tarragonaLabel}</strong> {COMPANY_INFO.hubTarragona}
              </p>
              <p className="font-mono tabular-nums pt-1 text-white">
                {COMPANY_INFO.phoneBarcelona} · {COMPANY_INFO.email}
              </p>
            </div>

            <div className="mt-5 pt-5 border-t border-violet-900/50 flex flex-wrap items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => onOpenLegal('aviso-legal')}
                className="text-violet-200 hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                {t.footer.legalNotice}
              </button>
              <span aria-hidden="true" className="text-violet-700">
                ·
              </span>
              <button
                type="button"
                onClick={() => onOpenLegal('privacidad')}
                className="text-violet-200 hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                {t.footer.privacy}
              </button>
              <span aria-hidden="true" className="text-violet-700">
                ·
              </span>
              <button
                type="button"
                onClick={() => onOpenLegal('cookies')}
                className="text-violet-200 hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                {t.footer.cookies}
              </button>
            </div>
          </div>
        </div>

        {/* Academic / Fictitious Notice */}
        <div className="mt-12 pt-8 border-t border-violet-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-zinc-400">
          <p className="leading-relaxed max-w-3xl">
            <strong className="text-white">{t.footer.academicNoticePrefix}</strong> {t.footer.academicNotice}
          </p>
          <p className="shrink-0 tabular-nums text-zinc-400">
            © {new Date().getFullYear()} {COMPANY_INFO.brandName} · {t.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};
