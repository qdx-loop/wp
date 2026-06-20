import { PenLine, Search, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArticleStore } from '@/store/useArticleStore';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function Header() {
  const { searchQuery, setSearchQuery } = useArticleStore();
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
        <Link to="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80">
          <PenLine className="h-5 w-5 text-[var(--accent)]" />
          <span
            className="text-xl font-bold tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            LS
          </span>
        </Link>

        <div className="relative ml-auto flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'zh' ? '搜索文章...' : 'Search...'}
              className="h-9 w-40 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] pl-9 pr-8 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:w-56 focus:border-[var(--accent)] focus:outline-none md:w-52 md:focus:w-64"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={toggleLanguage}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            title={language === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{language === 'zh' ? '中' : 'EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
