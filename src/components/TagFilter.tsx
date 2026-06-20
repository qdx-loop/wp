import { X } from 'lucide-react';
import { useArticleStore } from '@/store/useArticleStore';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function TagFilter() {
  const { getAllTags, selectedTag, setSelectedTag } = useArticleStore();
  const { language } = useLanguageStore();
  const tags = getAllTags(language);

  if (tags.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm text-[var(--text-muted)]">
          {language === 'zh' ? '标签:' : 'Tags:'}
        </span>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm transition-all duration-200 ${
              selectedTag === tag
                ? 'bg-[var(--accent)] text-[var(--bg-primary)]'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tag}
            {selectedTag === tag && <X className="h-3 w-3" />}
          </button>
        ))}
      </div>
    </div>
  );
}
