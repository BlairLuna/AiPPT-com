import React from 'react';
import { X, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-purple-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        <div className="bg-gradient-to-r from-purple-100 to-pink-50 p-4 border-b border-purple-100 flex justify-between items-center">
          <h3 className="font-bold text-brand-text flex items-center gap-2">
            <ShieldCheck size={18} className="text-purple-600"/>
            活动规则
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/50 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-4 text-sm text-gray-600">
          <div className="flex gap-3">
            <div className="mt-0.5"><Clock size={16} className="text-purple-500"/></div>
            <div>
              <p className="font-semibold text-gray-800">活动时间</p>
              <p>即日起至 2024年12月31日</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mt-0.5"><AlertCircle size={16} className="text-purple-500"/></div>
            <div>
              <p className="font-semibold text-gray-800">兑换说明</p>
              <ul className="list-disc pl-4 space-y-1 mt-1 text-xs">
                <li>折扣码有效期为获取后 7 天内。</li>
                <li>仅限 AiPPT 注册用户使用。</li>
                <li>每个折扣码仅能使用一次。</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-500">
             为保障活动公平，同一设备/IP 仅限参与一次抽奖。若发现恶意刷奖行为，平台有权取消奖励。
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};