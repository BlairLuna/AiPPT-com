import React from 'react';

interface FooterProps {
  onOpenRules: () => void;
  t: Record<string, string>;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRules, t }) => {
  return (
    <footer className="w-full py-8 text-center text-purple-900/60 text-xs px-4 relative z-10">
      <div className="flex justify-center items-center gap-4 mb-4 font-medium">
        <a href="https://www.aippt.com/help/privacy-policy" target="_blank" className="hover:text-purple-800">
          {t.footer_privacy}
        </a>
        <span className="opacity-30">|</span>
        <button onClick={onOpenRules} className="hover:text-purple-800 underline decoration-purple-800/30">
          {t.footer_rules}
        </button>
        <span className="opacity-30">|</span>
        <a href="https://www.aippt.com/help/terms-of-use" target="_blank" className="hover:text-purple-800">
          Terms
        </a>
      </div>
      <p className="mb-2">{t.footer_copy}</p>
      <p className="opacity-60">{t.footer_slogan}</p>
    </footer>
  );
};