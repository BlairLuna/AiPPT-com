import React from 'react';
import { X, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Record<string, string>;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose, t }) => {
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
        <div className="bg-gradient-to-r from-purple-50 to-white p-5 border-b border-purple-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-brand-text flex items-center gap-2">
            <ShieldCheck size={20} className="text-purple-600"/>
            {t.modal_title}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-5 text-sm text-gray-600">
          <div className="flex gap-4">
            <div className="mt-0.5 bg-purple-50 p-1.5 rounded-lg h-fit"><Clock size={16} className="text-purple-600"/></div>
            <div>
              <p className="font-bold text-gray-900 mb-1">{t.modal_time_label}</p>
              <p className="text-purple-700 font-medium">{t.modal_time_val}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-0.5 bg-purple-50 p-1.5 rounded-lg h-fit"><AlertCircle size={16} className="text-purple-600"/></div>
            <div>
              <p className="font-bold text-gray-900 mb-1">{t.modal_note_label}</p>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-600 leading-relaxed">
                <li>{t.modal_note_1}</li>
                <li>{t.modal_note_2}</li>
                <li>{t.modal_note_3}</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-500 leading-relaxed">
             {t.modal_disclaimer}
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-100 text-center">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-purple-900/10"
          >
            {t.modal_btn}
          </button>
        </div>
      </div>
    </div>
  );
};