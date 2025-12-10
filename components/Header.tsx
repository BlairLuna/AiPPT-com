import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Globe, ChevronDown, ExternalLink } from 'lucide-react';

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
  { label: '官网', url: 'https://www.aippt.com/' },
  { label: 'Blog', url: 'https://www.aippt.com/blog' },
  { label: '价格', url: 'https://www.aippt.com/price' },
];

export const Header: React.FC = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full py-4 px-4 flex items-center justify-between max-w-6xl mx-auto relative z-40">
      {/* Logo Area */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-purple-50">
           <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
        </div>
        <span className="font-bold text-lg md:text-xl text-brand-text tracking-tight hidden xs:block font-sans">
          AiPPT.com
        </span>
      </div>

      {/* Navigation & Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Navigation Buttons */}
        <nav className="flex items-center gap-1 md:gap-2">
          {LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium text-purple-900/70 hover:text-purple-900 hover:bg-white/60 hover:shadow-sm transition-all border border-transparent hover:border-purple-100 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-[1px] h-5 bg-purple-900/10 mx-1 hidden sm:block"></div>

        {/* Language Switcher */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`
              flex items-center justify-center gap-1.5 px-2 py-2 md:px-3 md:py-1.5 rounded-full transition-all border
              ${isLangOpen ? 'bg-white border-purple-200 shadow-md text-purple-800' : 'bg-transparent border-transparent hover:bg-white/50 text-purple-900/70 hover:text-purple-900'}
            `}
            aria-label="Select Language"
          >
            <Globe size={18} />
            <ChevronDown size={14} className={`hidden md:block transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isLangOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 py-2 overflow-hidden animate-[fadeIn_0.2s_ease-out] z-50">
              <div className="px-4 py-2 text-[10px] font-bold text-purple-300 uppercase tracking-widest border-b border-gray-50 mb-1">
                Language
              </div>
              <div className="max-h-[320px] overflow-y-auto scrollbar-hide">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between group"
                    onClick={() => setIsLangOpen(false)}
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{lang.label}</span>
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