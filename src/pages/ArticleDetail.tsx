import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import Header from '@/components/Header';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useArticleStore } from '@/store/useArticleStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import { loadArticles, formatDate, estimateReadTime } from '@/utils/articles';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { articles, setArticles, getArticleBySlug, getAdjacentArticles, setSelectedTag } = useArticleStore();
  const { language } = useLanguageStore();

  useEffect(() => {
    if (articles.length === 0) {
      const loaded = loadArticles();
      setArticles(loaded);
    }
  }, [articles.length, setArticles]);

  const article = slug ? getArticleBySlug(slug) : undefined;
  const { prev, next } = slug ? getAdjacentArticles(slug) : { prev: null, next: null };

  useEffect(() => {
    if (articles.length > 0 && !article) {
      navigate('/');
    }
  }, [articles, article, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <Header />
        <div className="flex h-96 items-center justify-center text-[var(--text-muted)]">
          {language === 'zh' ? '加载中...' : 'Loading...'}
        </div>
      </div>
    );
  }

  const title = language === 'en' ? article.titleEn : article.title;
  const tags = language === 'en' ? article.tagsEn : article.tags;
  const content = language === 'en' ? article.contentEn : article.content;
  const readTime = estimateReadTime(content, language);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'zh' ? '返回首页' : 'Back to home'}
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.date, language)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readTime} {language === 'zh' ? '分钟阅读' : 'min read'}
            </span>
          </div>

          <h1
            className="mb-6 text-3xl font-bold text-[var(--text-primary)] md:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  navigate('/');
                }}
                className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-secondary)] px-3 py-1 text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-secondary)]"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </button>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article className="animate-fade-in-up">
          <MarkdownRenderer content={content} />
        </article>

        {/* Article Navigation */}
        <nav className="mt-16 border-t border-[var(--border)] pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {prev ? (
              <Link
                to={`/post/${prev.slug}`}
                className="group flex flex-col rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4 transition-all hover:border-[var(--accent)]/30"
              >
                <span className="mb-2 inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <ArrowLeft className="h-3 w-3" />
                  {language === 'zh' ? '上一篇' : 'Previous'}
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                  {language === 'en' ? prev.titleEn : prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                to={`/post/${next.slug}`}
                className="group flex flex-col items-end rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-right transition-all hover:border-[var(--accent)]/30"
              >
                <span className="mb-2 inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  {language === 'zh' ? '下一篇' : 'Next'}
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                  {language === 'en' ? next.titleEn : next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--text-muted)]">
        <p> LS</p>
      </footer>
    </div>
  );
}
