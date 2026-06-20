import { create } from 'zustand';
import type { Article } from '@/types/article';

interface ArticleState {
  articles: Article[];
  selectedTag: string | null;
  searchQuery: string;
  setArticles: (articles: Article[]) => void;
  setSelectedTag: (tag: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredArticles: (lang: 'zh' | 'en') => Article[];
  getAllTags: (lang: 'zh' | 'en') => string[];
  getArticleBySlug: (slug: string) => Article | undefined;
  getAdjacentArticles: (slug: string) => { prev: Article | null; next: Article | null };
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  selectedTag: null,
  searchQuery: '',

  setArticles: (articles) => set({ articles }),

  setSelectedTag: (tag) => set({ selectedTag: tag }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredArticles: (lang: 'zh' | 'en') => {
    const { articles, selectedTag, searchQuery } = get();
    let result = articles;

    if (selectedTag) {
      result = result.filter((article) => {
        const tags = lang === 'en' ? article.tagsEn : article.tags;
        return tags.includes(selectedTag);
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((article) => {
        const title = lang === 'en' ? article.titleEn : article.title;
        const summary = lang === 'en' ? article.summaryEn : article.summary;
        const content = lang === 'en' ? article.contentEn : article.content;
        return (
          title.toLowerCase().includes(query) ||
          summary.toLowerCase().includes(query) ||
          content.toLowerCase().includes(query)
        );
      });
    }

    return result;
  },

  getAllTags: (lang: 'zh' | 'en') => {
    const { articles } = get();
    const tagSet = new Set<string>();
    articles.forEach((article) => {
      const tags = lang === 'en' ? article.tagsEn : article.tags;
      tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  },

  getArticleBySlug: (slug) => {
    const { articles } = get();
    return articles.find((article) => article.slug === slug);
  },

  getAdjacentArticles: (slug) => {
    const { articles } = get();
    const index = articles.findIndex((article) => article.slug === slug);
    if (index === -1) return { prev: null, next: null };

    return {
      prev: index > 0 ? articles[index - 1] : null,
      next: index < articles.length - 1 ? articles[index + 1] : null,
    };
  },
}));
