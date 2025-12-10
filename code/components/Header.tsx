import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: Record<string, string>;
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
];

const LINKS = [
  { labelKey: 'nav_official', url: 'https://www.aippt.com/' },
  { labelKey: 'nav_blog', url: 'https://www.aippt.com/blog' },
  { labelKey: 'nav_price', url: 'https://www.aippt.com/price' },
];

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange, t }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangLabel = LANGUAGES.find(l => l.code === currentLang)?.label || 'English';

  return (
    <header className="w-full py-6 px-4 flex items-center justify-between max-w-6xl mx-auto relative z-40">
      {/* Logo Text Only - Icon removed */}
      <a href="https://www.aippt.com" className="font-bold text-xl md:text-2xl text-brand-text tracking-tight font-sans hover:opacity-80 transition-opacity">
        AiPPT.com
      </a>

      {/* Navigation & Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        <nav className="flex items-center gap-1 md:gap-2">
          {LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium text-purple-900/70 hover:text-purple-900 hover:bg-white/60 hover:shadow-sm transition-all border border-transparent hover:border-purple-100 whitespace-nowrap"
            >
              {t[link.labelKey] || 'Link'}
            </a>
          ))}
        </nav>

        <div className="w-[1px] h-5 bg-purple-900/10 mx-1 hidden sm:block"></div>

        {/* Language Switcher */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`
              flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full transition-all border
              ${isLangOpen ? 'bg-white border-purple-200 shadow-md text-purple-800' : 'bg-transparent border-transparent hover:bg-white/50 text-purple-900/70 hover:text-purple-900'}
            `}
          >
            <Globe size={16} />
            <span className="text-sm font-medium hidden md:inline">{currentLangLabel}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 py-2 overflow-hidden animate-[fadeIn_0.2s_ease-out] z-50">
              <div className="max-h-[320px] overflow-y-auto scrollbar-hide">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors font-medium"
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLangOpen(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};