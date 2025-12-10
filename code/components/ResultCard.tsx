import React, { useState } from 'react';
import { DiscountCode } from '../types';
import { Check, Copy, ExternalLink, Gift } from 'lucide-react';
import { EXTERNAL_LINKS } from '../constants';

interface ResultCardProps {
  prize: DiscountCode;
  t: Record<string, string>;
}

export const ResultCard: React.FC<ResultCardProps> = ({ prize, t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prize.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleRedeem = () => {
    window.open(EXTERNAL_LINKS.officialSite, '_blank');
  };

  return (
    <div className="w-full animate-[fadeIn_0.5s_ease-out]">
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-1 shadow-2xl border border-purple-100 overflow-hidden">
        <div className="p-8 text-center">
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6 animate-bounce-slow">
            <Gift className="w-10 h-10 text-purple-600" />
          </div>

          <h2 className="text-3xl font-bold text-brand-text mb-2">{t.result_title}</h2>
          <p className="text-purple-600 font-medium mb-8 text-lg">{t.result_subtitle}</p>

          <div className="bg-white rounded-2xl p-5 flex items-center justify-between mb-8 border border-purple-100 shadow-sm cursor-pointer hover:border-purple-300 transition-colors group" onClick={handleCopy}>
            <div className="text-left">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{t.label_code}</div>
              <code className="text-2xl font-mono font-black text-gray-800 tracking-wider">
                {prize.code}
              </code>
            </div>
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-700'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? t.copied : t.copy}
            </button>
          </div>

          <button
            onClick={handleRedeem}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-2 mb-6"
          >
            <span>{t.btn_redeem}</span>
            <ExternalLink size={18} />
          </button>
          
          <p className="text-base font-bold text-purple-800/80 bg-purple-100/50 py-3 rounded-lg border border-purple-200/50">
            {t.result_note}
          </p>
        </div>
      </div>
    </div>
  );
};