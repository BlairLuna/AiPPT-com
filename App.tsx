import React, { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SliderSection } from './components/SliderSection';
import { ResultCard } from './components/ResultCard';
import { RulesModal } from './components/RulesModal';
import { SliderValue, DiscountCode } from './types';
import { PRIZE_POOL } from './constants';
import { Zap } from 'lucide-react';

// Mock Analytics function for scalability
const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  console.log(`[Analytics] ${eventName}`, properties);
  // In production: mixpanel.track(eventName, properties) or gtag('event', ...)
};

const App: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<SliderValue>(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prize, setPrize] = useState<DiscountCode | null>(null);
  const [showRules, setShowRules] = useState(false);

  // Check for previous session (Anti-abuse logic)
  useEffect(() => {
    trackEvent('Page View');
    const savedPrize = localStorage.getItem('aippt_prize_v1');
    if (savedPrize) {
      try {
        setPrize(JSON.parse(savedPrize));
      } catch (e) {
        localStorage.removeItem('aippt_prize_v1');
      }
    }
  }, []);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E7B5F0', '#8B5CF6', '#ffffff']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E7B5F0', '#8B5CF6', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleDraw = useCallback(() => {
    if (isDrawing || prize) return;

    trackEvent('Click Draw', { selectedSets: sliderValue });
    setIsDrawing(true);

    // Simulate network request / calculation delay
    setTimeout(() => {
      // Weighted Random Logic
      // 0-0.6: 10% off (Common)
      // 0.6-0.9: 20% off (Rare)
      // 0.9-1.0: 30% off (Legendary)
      const rand = Math.random();
      let selectedPrize: DiscountCode;

      if (rand > 0.9) {
        selectedPrize = PRIZE_POOL[2]; // 30% off
      } else if (rand > 0.6) {
        selectedPrize = PRIZE_POOL[1]; // 20% off
      } else {
        selectedPrize = PRIZE_POOL[0]; // 10% off
      }

      setPrize(selectedPrize);
      
      // Save to local storage (Simple anti-abuse)
      localStorage.setItem('aippt_prize_v1', JSON.stringify(selectedPrize));
      
      setIsDrawing(false);
      trackEvent('Prize Won', { code: selectedPrize.code });
      triggerConfetti();
    }, 1200);
  }, [isDrawing, prize, sliderValue]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#E7B5F0] relative overflow-x-hidden selection:bg-purple-200">
      
      {/* Decorative Background Elements (Tech/Lively Feel) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/30 rounded-full blur-[80px] animate-float"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] bg-pink-300/20 rounded-full blur-[60px] animate-float-delayed"></div>
        <div className="absolute top-[20%] right-[10%] w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      <Header />

      <main className="flex-1 w-full max-w-md px-5 py-6 z-10 flex flex-col items-center justify-center">
        
        {/* Hero Text */}
        <div className="text-center mb-10 animate-[fadeInDown_0.8s_ease-out]">
          <div className="inline-block px-3 py-1 bg-white/40 backdrop-blur-md rounded-full text-purple-900 text-xs font-bold mb-3 border border-white/20 shadow-sm">
            ✨ AI 生产力大解放
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-brand-text mb-3 leading-tight tracking-tight">
            AI 生成 PPT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
              效率提升 100%
            </span>
          </h1>
          <p className="text-purple-900/70 font-medium max-w-[280px] mx-auto text-sm md:text-base">
            拖动滑块选择你的工作量，<br/>立即抽取专属 AI 加速折扣
          </p>
        </div>

        {/* Content Area */}
        <div className="w-full transition-all duration-500 min-h-[360px]">
          {!prize ? (
            <div className="animate-[fadeInUp_0.5s_ease-out]">
              <SliderSection 
                value={sliderValue} 
                onChange={setSliderValue} 
                disabled={isDrawing}
              />

              <button
                onClick={handleDraw}
                disabled={isDrawing}
                className={`
                  w-full py-4 rounded-2xl font-bold text-lg text-white shadow-xl flex items-center justify-center gap-2
                  transition-all duration-200 transform
                  ${isDrawing 
                    ? 'bg-purple-400 cursor-not-allowed scale-95 opacity-80' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 hover:scale-[1.02] active:scale-95 hover:shadow-purple-500/30 ring-4 ring-white/20'
                  }
                `}
              >
                {isDrawing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>AI 正在计算欧气值...</span>
                  </>
                ) : (
                  <>
                    <Zap className="fill-white w-5 h-5" />
                    <span>立即抽奖</span>
                  </>
                )}
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-purple-800/50 font-medium flex items-center justify-center gap-1">
                   <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                   已有 12,450+ 用户参与活动
                </p>
              </div>
            </div>
          ) : (
            <ResultCard prize={prize} />
          )}
        </div>

      </main>

      <Footer onOpenRules={() => setShowRules(true)} />
      
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
};

export default App;