import { useEffect } from 'react';
import { FileText } from 'lucide-react';
import Header from '@/components/Header';
import TagFilter from '@/components/TagFilter';
import ArticleCard from '@/components/ArticleCard';
import { useArticleStore } from '@/store/useArticleStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import { loadArticles } from '@/utils/articles';

export default function Home() {
  const { articles, setArticles, getFilteredArticles, selectedTag, setSelectedTag } = useArticleStore();
  const { language } = useLanguageStore();
  const filteredArticles = getFilteredArticles(language);

  useEffect(() => {
    const loaded = loadArticles();
    setArticles(loaded);
  }, [setArticles]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1
            className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            LS
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            {language === 'zh' ? '记录技术思考，分享生活感悟' : 'Tech thoughts and life reflections'}
          </p>
        </div>

        {/* Tag Filter */}
        <TagFilter />

        {/* Selected Tag Indicator */}
        {selectedTag && (
          <div className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span>{language === 'zh' ? '筛选结果:' : 'Filter:'}</span>
            <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-medium text-[var(--bg-primary)]">
              {selectedTag}
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className="ml-2 text-[var(--accent)] hover:underline"
            >
              {language === 'zh' ? '清除筛选' : 'Clear'}
            </button>
          </div>
        )}

        {/* Article Count */}
        <div className="mb-6 text-sm text-[var(--text-muted)]">
          {language === 'zh' ? `共 ${filteredArticles.length} 篇文章` : `${filteredArticles.length} articles`}
        </div>

        {/* Article List */}
        {filteredArticles.length > 0 ? (
          <div>
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)]">
            <FileText className="mb-4 h-12 w-12 opacity-50" />
            <p className="text-lg">{language === 'zh' ? '暂无文章' : 'No articles'}</p>
            <p className="mt-2 text-sm">{language === 'zh' ? '在 articles 目录添加 Markdown 文件即可' : 'Add Markdown files to the articles directory'}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--text-muted)]">
        <p> LS</p>
      </footer>
    </div>
  );
}
