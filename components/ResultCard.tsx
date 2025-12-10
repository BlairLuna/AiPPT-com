import React, { useState } from 'react';
import { DiscountCode } from '../types';
import { Check, Copy, ExternalLink, Gift } from 'lucide-react';
import { EXTERNAL_LINKS } from '../constants';

interface ResultCardProps {
  prize: DiscountCode;
}

export const ResultCard: React.FC<ResultCardProps> = ({ prize }) => {
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
        <div className="p-6 text-center">
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 animate-bounce-slow">
            <Gift className="w-8 h-8 text-purple-600" />
          </div>

          <h2 className="text-2xl font-bold text-brand-text mb-1">恭喜获得</h2>
          <p className="text-purple-600 font-medium mb-6">{prize.label}</p>

          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between mb-6 border border-gray-200 border-dashed">
            <code className="text-xl font-mono font-bold text-gray-800 tracking-wider">
              {prize.code}
            </code>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white text-purple-600 shadow-sm hover:shadow active:scale-95'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? '已复制' : '复制'}
            </button>
          </div>

          <button
            onClick={handleRedeem}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>立即去官网兑换</span>
            <ExternalLink size={18} />
          </button>
          
          <p className="text-xs text-gray-400 mt-4">
            *请前往官网 个人中心 - 兑换码 处使用
          </p>
        </div>
      </div>
    </div>
  );
};