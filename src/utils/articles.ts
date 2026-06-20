import type { Article } from '@/types/article';

// @ts-ignore - Vite glob import
const articleFiles = import.meta.glob('/articles/*.md', { query: '?raw', import: 'default', eager: true });

const SPLIT_MARKER = '---EN---';

function parseFrontmatter(content: string): { data: Record<string, any>; body: string } {
  const lines = content.split('\n');
  let data: Record<string, any> = {};
  let body = content;
  let frontmatterEnd = -1;

  if (lines[0]?.trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        frontmatterEnd = i;
        break;
      }
    }
  }

  if (frontmatterEnd > 0) {
    const frontmatterLines = lines.slice(1, frontmatterEnd);
    for (const line of frontmatterLines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1);
          data[key] = value.split(',').map((v) => v.trim()).filter(Boolean);
        } else {
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          data[key] = value;
        }
      }
    }
    body = lines.slice(frontmatterEnd + 1).join('\n').trim();
  }

  return { data, body };
}

function splitBilingualContent(body: string): { zh: string; en: string } {
  const index = body.indexOf(SPLIT_MARKER);
  if (index === -1) {
    return { zh: body, en: body };
  }
  return {
    zh: body.slice(0, index).trim(),
    en: body.slice(index + SPLIT_MARKER.length).trim(),
  };
}

export function loadArticles(): Article[] {
  const articles: Article[] = [];

  for (const [path, content] of Object.entries(articleFiles)) {
    const raw = content as string;
    const parsed = parseFrontmatter(raw);
    const filename = path.split('/').pop() || '';
    const slug = filename.replace(/\.md\?raw$/, '');

    const { zh, en } = splitBilingualContent(parsed.body);

    articles.push({
      slug,
      title: parsed.data.title || 'Untitled',
      titleEn: parsed.data.titleEn || parsed.data.title || 'Untitled',
      date: parsed.data.date || new Date().toISOString().split('T')[0],
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
      tagsEn: Array.isArray(parsed.data.tagsEn) ? parsed.data.tagsEn : (Array.isArray(parsed.data.tags) ? parsed.data.tags : []),
      summary: parsed.data.summary || '',
      summaryEn: parsed.data.summaryEn || parsed.data.summary || '',
      content: zh,
      contentEn: en,
    });
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatDate(dateStr: string, lang: 'zh' | 'en' = 'zh'): string {
  const date = new Date(dateStr);
  if (lang === 'en') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function estimateReadTime(content: string, lang: 'zh' | 'en' = 'zh'): number {
  const wordsPerMinute = lang === 'zh' ? 400 : 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
