import { create } from 'zustand';

export type Language = 'zh' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

function detectBrowserLanguage(): Language {
  const lang = navigator.language || (navigator as any).userLanguage || 'zh';
  return lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: detectBrowserLanguage(),

  setLanguage: (lang) => set({ language: lang }),

  toggleLanguage: () =>
    set((state) => ({ language: state.language === 'zh' ? 'en' : 'zh' })),
}));
