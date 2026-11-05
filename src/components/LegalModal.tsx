import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { LegalDocKey } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface LegalModalProps {
  docKey: LegalDocKey | null;
  onClose: () => void;
  onSelectDoc: (key: LegalDocKey) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docKey, onClose, onSelectDoc }) => {
  const { t, legalDocs } = useLanguage();

  useEffect(() => {
    if (!docKey) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [docKey, onClose]);

  if (!docKey) return null;
  const doc = legalDocs[docKey];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-obsidian-850 border border-violet-700/60 rounded-xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-violet-900/60">
          <div>
            <p className="text-xs font-semibold text-fuchsia-400">
              {t.legalModal.badge} ({doc.updatedAt})
            </p>
            <h2 id="legal-modal-title" className="mt-1 text-xl font-bold text-white">
              {doc.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.legalModal.closeBtn}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-obsidian-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 p-1 bg-obsidian-900 border border-violet-900/60 rounded-lg w-fit">
          {(
            [
              { key: 'aviso-legal', label: t.legalModal.tabAviso },
              { key: 'privacidad', label: t.legalModal.tabPrivacidad },
              { key: 'cookies', label: t.legalModal.tabCookies },
            ] as { key: LegalDocKey; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelectDoc(tab.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                docKey === tab.key
                  ? 'bg-gradient-to-r from-[#6D28D9] to-[#DB2777] text-white shadow-xs'
                  : 'text-violet-200 hover:text-white hover:bg-obsidian-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          {doc.sections.map((sec) => (
            <div key={sec.heading}>
              <h3 className="text-sm font-bold text-white">{sec.heading}</h3>
              <p className="mt-1.5 text-sm text-zinc-300 leading-relaxed tracking-[0.01em]">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 pt-4 border-t border-violet-900/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] to-[#DB2777] hover:from-[#5B21B6] hover:to-[#BE185D] rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(219,39,119,0.3)]"
          >
            {t.legalModal.understoodClose}
          </button>
        </div>
      </div>
    </div>
  );
};
