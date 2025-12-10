import React from 'react';
import { SliderValue } from '../types';
import { Layers } from 'lucide-react';

interface SliderSectionProps {
  value: SliderValue;
  onChange: (val: SliderValue) => void;
  disabled: boolean;
}

export const SliderSection: React.FC<SliderSectionProps> = ({ value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Map standard range input (0-3) to our specific steps
    const index = parseInt(e.target.value, 10);
    const steps: SliderValue[] = [5, 10, 15, 20];
    onChange(steps[index]);
  };

  // Convert current value back to index for the input
  const currentIndex = [5, 10, 15, 20].indexOf(value);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl w-full border border-white/50 mb-6 relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-purple-100 p-2 rounded-xl">
          <Layers className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="font-semibold text-brand-text text-lg">
          选择您需要的 PPT 套数
        </h3>
      </div>

      <div className="mb-8 text-center relative z-10">
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 transform scale-100 group-hover:scale-105">
          {value} <span className="text-2xl text-purple-400 font-bold">套</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">预计为您节省 {(value * 2.5).toFixed(1)} 小时工作时间</p>
      </div>

      <div className="relative z-10 px-2">
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={currentIndex}
          onChange={handleChange}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
        />
        <div className="flex justify-between mt-3 text-xs font-medium text-gray-400 select-none">
          <span>5套</span>
          <span>10套</span>
          <span>15套</span>
          <span>20套</span>
        </div>
      </div>
    </div>
  );
};