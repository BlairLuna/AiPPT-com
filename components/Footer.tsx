import React from 'react';

interface FooterProps {
  onOpenRules: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRules }) => {
  return (
    <footer className="w-full py-8 text-center text-purple-900/60 text-xs px-4 relative z-10">
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={onOpenRules} className="hover:text-purple-800 underline decoration-purple-800/30">
          活动规则
        </button>
        <span>|</span>
        <a href="#" className="hover:text-purple-800">隐私政策</a>
        <span>|</span>
        <a href="#" className="hover:text-purple-800">联系客服</a>
      </div>
      <p className="mb-2">© 2024 AiPPT Technology. All rights reserved.</p>
      <p className="opacity-70">让演示更简单，让表达更出众</p>
    </footer>
  );
};