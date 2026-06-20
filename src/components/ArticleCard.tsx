import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Article } from '@/types/article';
import { formatDate, estimateReadTime } from '@/utils/articles';
import { useArticleStore } from '@/store/useArticleStore';
import { useLanguageStore } from '@/store/useLanguageStore';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const { setSelectedTag } = useArticleStore();
  const { language } = useLanguageStore();

  const title = language === 'en' ? article.titleEn : article.title;
  const summary = language === 'en' ? article.summaryEn : article.summary;
  const tags = language === 'en' ? article.tagsEn : article.tags;
  const content = language === 'en' ? article.contentEn : article.content;
  const readTime = estimateReadTime(content, language);

  return (
    <article
      className="group animate-fade-in-up border-b border-[var(--border)] pb-10 pt-10 first:pt-0"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(article.date, language)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {readTime} {language === 'zh' ? '分钟阅读' : 'min read'}
        </span>
      </div>

      <Link to={`/post/${article.slug}`}>
        <h2
          className="mb-3 text-2xl font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] md:text-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
      </Link>

      <p className="mb-4 text-base leading-relaxed text-[var(--text-secondary)]">
        {summary}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={(e) => {
              e.preventDefault();
              setSelectedTag(tag);
            }}
            className="rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-secondary)]"
          >
            {tag}
          </button>
        ))}
      </div>

      <Link
        to={`/post/${article.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-all hover:gap-2.5"
      >
        {language === 'zh' ? '阅读全文' : 'Read more'}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
