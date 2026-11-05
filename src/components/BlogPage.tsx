import React, { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { BlogArticle } from '../data/companyData';
import { ResilientImage } from './ResilientImage';
import { useLanguage } from '../context/LanguageContext';

export const BlogPage: React.FC = () => {
  const { t, blogArticles } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  // Extract distinct categories from the active articles
  const availableCategories = [
    { id: 'all', label: t.blog.allArticlesCategory },
    ...Array.from(new Set(blogArticles.map((a) => a.category))).map((cat) => ({
      id: cat,
      label: cat,
    })),
  ];

  useEffect(() => {
    if (!activeArticle) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeArticle]);

  const filteredArticles =
    selectedCategory === 'all'
      ? blogArticles
      : blogArticles.filter((art) => art.category === selectedCategory);

  return (
    <div className="bg-black min-h-[70vh]">
      <section className="bg-gradient-to-b from-[#150A2B] via-[#0B0617] to-black text-white border-b border-violet-900/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-fuchsia-400 mb-3">
                <span>{t.blog.tag}</span>
                <span aria-hidden="true" className="text-violet-400/60">
                  ·
                </span>
                <span className="text-violet-300">
                  {t.blog.subtag}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
                {t.blog.title}
              </h1>
              <p className="mt-3 text-base text-zinc-300 leading-relaxed tracking-[0.01em]">
                {t.blog.subtitle}
              </p>
            </div>

            {/* Category Filter Controls */}
            <div
              role="group"
              aria-label="Filtrar artículos por categoría"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-obsidian-850 border border-violet-800/60 rounded-lg w-fit"
            >
              {availableCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#DB2777] text-white shadow-xs'
                      : 'text-violet-200 hover:text-white hover:bg-obsidian-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-obsidian-850 border border-violet-900/50 hover:border-fuchsia-500/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-black border-b border-violet-900/40">
                    <ResilientImage
                      src={article.image}
                      alt={article.imageAlt}
                      fallbackType={article.fallbackType}
                      fallbackLabel={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Clean Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                      <span className="font-semibold text-fuchsia-400">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="mt-3 text-lg font-bold text-white leading-snug">
                      <button
                        type="button"
                        onClick={() => setActiveArticle(article)}
                        className="text-left hover:text-fuchsia-400 transition-colors cursor-pointer"
                      >
                        {article.title}
                      </button>
                    </h2>

                    <p className="mt-2.5 text-sm text-zinc-300 leading-relaxed line-clamp-4 tracking-[0.01em]">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-violet-900/40 flex items-center justify-between gap-4">
                  <div className="text-xs text-zinc-400">
                    <strong className="font-semibold text-white block">{article.author}</strong>
                    <span>{article.authorRole}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-violet-300 hover:text-fuchsia-400 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                  >
                    <span>{t.blog.readArticleBtn}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-fuchsia-400" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full Technical Article Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-reader-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-obsidian-850 border border-violet-700/60 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-violet-900/60">
              <div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                  <span className="font-semibold text-fuchsia-400">{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2
                  id="blog-reader-title"
                  className="mt-2 text-xl sm:text-2xl font-bold text-white leading-snug"
                >
                  {activeArticle.title}
                </h2>
                <p className="mt-1.5 text-xs text-zinc-400">
                  {t.blog.byAuthorPrefix} <strong className="text-white">{activeArticle.author}</strong> ·{' '}
                  {activeArticle.authorRole}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label={t.blog.modalCloseBtn}
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-obsidian-800 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-zinc-200 leading-relaxed tracking-[0.01em]">
              {activeArticle.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-6 p-4 bg-obsidian-900 border border-violet-800/60 rounded-lg">
              <p className="text-xs font-bold text-fuchsia-400 mb-1">
                {t.blog.modalFormulaTitle}
              </p>
              <p className="font-mono text-xs text-violet-100 tabular-nums">
                {activeArticle.technicalFormula}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-violet-900/60 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 min-h-[40px] text-xs font-semibold text-white bg-gradient-to-r from-[#6D28D9] to-[#DB2777] hover:from-[#5B21B6] hover:to-[#BE185D] rounded-lg transition-all cursor-pointer shadow-[0_0_15px_rgba(219,39,119,0.3)]"
              >
                {t.blog.modalCloseBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
