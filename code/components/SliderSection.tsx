import React from 'react';
import { SliderValue } from '../types';
import { Layers } from 'lucide-react';

interface SliderSectionProps {
  value: SliderValue;
  onChange: (val: SliderValue) => void;
  disabled: boolean;
  t: Record<string, string>;
}

export const SliderSection: React.FC<SliderSectionProps> = ({ value, onChange, disabled, t }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    const steps: SliderValue[] = [5, 10, 15, 20];
    onChange(steps[index]);
  };

  const currentIndex = [5, 10, 15, 20].indexOf(value);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl w-full border border-white/50 mb-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-purple-100 p-2 rounded-xl">
          <Layers className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="font-semibold text-brand-text text-lg">
          {t.card_title}
        </h3>
      </div>

      <div className="mb-8 text-center relative z-10">
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 transform scale-100 group-hover:scale-105">
          {value} <span className="text-2xl text-purple-400 font-bold">{t.unit_sets}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {t.time_saved}
          <span className="font-bold text-purple-600">{(value * 2.5).toFixed(1)}</span>
          {t.time_unit}
        </p>
      </div>

      <div className="relative z-10 px-2 py-4">
        {/* Custom CSS for the slider to match the original gradient look */}
        <style>{`
          .custom-range {
            -webkit-appearance: none;
            width: 100%;
            background: transparent;
            cursor: pointer;
          }
          .custom-range:focus {
            outline: none;
          }
          /* Track */
          .custom-range::-webkit-slider-runnable-track {
            width: 100%;
            height: 12px;
            background: linear-gradient(90deg, #C084FC 0%, #F472B6 100%);
            border-radius: 999px;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
          }
          .custom-range::-moz-range-track {
            width: 100%;
            height: 12px;
            background: linear-gradient(90deg, #C084FC 0%, #F472B6 100%);
            border-radius: 999px;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
          }
          /* Thumb */
          .custom-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            margin-top: -10px; /* Center thumb on track */
            box-shadow: 0 4px 10px rgba(0,0,0,0.15), 0 0 0 4px rgba(255, 255, 255, 0.5);
            border: 4px solid #A855F7;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          }
          .custom-range::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 15px rgba(168, 85, 247, 0.3), 0 0 0 6px rgba(255, 255, 255, 0.3);
          }
          .custom-range::-moz-range-thumb {
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            border: 4px solid #A855F7;
          }
        `}</style>
        
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={currentIndex}
          onChange={handleChange}
          disabled={disabled}
          className="custom-range"
        />
        <div className="flex justify-between mt-3 text-xs font-medium text-gray-400 select-none">
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
      </div>
    </div>
  );
};