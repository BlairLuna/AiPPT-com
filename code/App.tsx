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
import { TRANSLATIONS } from './translations';

const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  console.log(`[Analytics] ${eventName}`, properties);
};

const App: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<SliderValue>(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prize, setPrize] = useState<DiscountCode | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [lang, setLang] = useState('en');

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  useEffect(() => {
    trackEvent('Page View');
    const savedPrize = localStorage.getItem('aippt_prize_v2');
    if (savedPrize) {
      try {
        setPrize(JSON.parse(savedPrize));
      } catch (e) {
        localStorage.removeItem('aippt_prize_v2');
      }
    }
    // Set default lang based on browser if needed, staying with 'en' default for now
  }, []);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3, angle: 60, spread: 55, origin: { x: 0 },
        colors: ['#E7B5F0', '#8B5CF6', '#ffffff']
      });
      confetti({
        particleCount: 3, angle: 120, spread: 55, origin: { x: 1 },
        colors: ['#E7B5F0', '#8B5CF6', '#ffffff']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleDraw = useCallback(() => {
    if (isDrawing || prize) return;

    trackEvent('Click Draw', { selectedSets: sliderValue });
    setIsDrawing(true);

    setTimeout(() => {
      const rand = Math.random();
      let selectedPrize: DiscountCode;
      if (rand > 0.9) selectedPrize = PRIZE_POOL[2];
      else if (rand > 0.6) selectedPrize = PRIZE_POOL[1];
      else selectedPrize = PRIZE_POOL[0];

      setPrize(selectedPrize);
      localStorage.setItem('aippt_prize_v2', JSON.stringify(selectedPrize));
      setIsDrawing(false);
      trackEvent('Prize Won', { code: selectedPrize.code });
      triggerConfetti();
    }, 1200);
  }, [isDrawing, prize, sliderValue]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#E7B5F0] relative overflow-x-hidden selection:bg-purple-200 font-sans text-slate-800">
      
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/30 rounded-full blur-[80px] animate-float"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] bg-pink-300/20 rounded-full blur-[60px] animate-float-delayed"></div>
        <div className="absolute top-[20%] right-[10%] w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      <Header currentLang={lang} onLanguageChange={setLang} t={t} />

      <main className="flex-1 w-full max-w-md px-5 py-6 z-10 flex flex-col items-center justify-center">
        
        {/* Hero */}
        <div className="text-center mb-10 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-block px-4 py-1.5 bg-white/40 backdrop-blur-md rounded-full text-purple-900 text-[10px] md:text-xs font-bold mb-4 border border-white/30 shadow-sm tracking-wider">
            {t.hero_badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-brand-text mb-4 leading-tight tracking-tight drop-shadow-sm">
            {t.hero_title_1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
              {t.hero_title_2}
            </span>
          </h1>
          <p className="text-purple-900/70 font-medium max-w-[300px] mx-auto text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{__html: t.hero_desc.replace(/\n/g, '<br/>')}}></p>
        </div>

        {/* Content */}
        <div className="w-full transition-all duration-500 min-h-[360px]">
          {!prize ? (
            <div className="animate-[fadeInUp_0.5s_ease-out]">
              <SliderSection 
                value={sliderValue} 
                onChange={setSliderValue} 
                disabled={isDrawing}
                t={t}
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
                    <span>{t.btn_drawing}</span>
                  </>
                ) : (
                  <>
                    <Zap className="fill-white w-5 h-5" />
                    <span>{t.btn_draw}</span>
                  </>
                )}
              </button>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mt-10">
                  <div className="bg-white/30 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20">
                      <div className="text-lg font-bold text-brand-text">10K+</div>
                      <div className="text-[10px] font-bold text-purple-900/60 uppercase">{t.stat_reviews}</div>
                  </div>
                  <div className="bg-white/30 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20">
                      <div className="text-lg font-bold text-brand-text">5s</div>
                      <div className="text-[10px] font-bold text-purple-900/60 uppercase">{t.stat_time}</div>
                  </div>
                  <div className="bg-white/30 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20">
                      <div className="text-lg font-bold text-brand-text">3000+</div>
                      <div className="text-[10px] font-bold text-purple-900/60 uppercase">{t.stat_templates}</div>
                  </div>
              </div>
            </div>
          ) : (
            <ResultCard prize={prize} t={t} />
          )}
        </div>

      </main>

      <Footer onOpenRules={() => setShowRules(true)} t={t} />
      
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} t={t} />
    </div>
  );
};

export default App;