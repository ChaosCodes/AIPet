
import React from 'react';
import { PetStage } from '../types';

interface PetDisplayProps {
  turn: number;
}

const PetDisplay: React.FC<PetDisplayProps> = ({ turn }) => {
  let stage: PetStage = 'EGG';
  let image = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=egg&backgroundColor=ffd5dc';
  let stageLabel = '暖呼呼的宠物蛋';
  let animationClass = 'animate-shake';

  if (turn > 18) {
    stage = 'ADULT';
    image = `https://api.dicebear.com/7.x/adventurer/svg?seed=evolution-${turn}&backgroundColor=b6e3f4`;
    stageLabel = '终极进化体';
    animationClass = 'animate-float animate-breathe';
  } else if (turn > 10) {
    stage = 'JUVENILE';
    image = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=juvenile-${turn}&backgroundColor=ffdfba`;
    stageLabel = '活跃的成长期';
    animationClass = 'animate-float';
  } else if (turn > 4) {
    stage = 'LARVA';
    image = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=larva-${turn}&backgroundColor=ffffba`;
    stageLabel = '数字幼虫期';
    animationClass = 'animate-breathe';
  }

  const getStageName = (s: PetStage) => {
    switch(s) {
      case 'EGG': return '胚胎期';
      case 'LARVA': return '幼儿期';
      case 'JUVENILE': return '青少年期';
      case 'ADULT': return '成年期';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 kawaii-card rounded-[3rem] relative overflow-hidden">
      <div className="absolute top-10 left-10 text-pink-300 opacity-50 animate-pulse"><i className="fas fa-star fa-2x"></i></div>
      <div className="absolute bottom-20 right-10 text-yellow-300 opacity-50 animate-bounce"><i className="fas fa-moon fa-lg"></i></div>
      <div className="absolute top-1/2 left-4 text-blue-200 opacity-30 animate-pulse"><i className="fas fa-cloud fa-2x"></i></div>

      <div className={`relative z-10 mb-8 ${animationClass}`}>
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-white to-pink-50 border-8 border-white p-4 shadow-inner flex items-center justify-center">
          <img 
            src={image} 
            alt="AI宠物" 
            className="w-full h-full object-contain" 
          />
        </div>
        <div className="mt-4 mx-auto w-32 h-4 bg-black/5 rounded-[100%] blur-md"></div>
      </div>
      
      <div className="z-10 text-center">
        <span className="px-4 py-1 bg-pink-100 text-pink-500 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">
          {getStageName(stage)}
        </span>
        <h2 className="text-3xl font-black text-slate-700 mt-2">{stageLabel}</h2>
        <p className="text-sm text-slate-400 mt-1 font-medium">第 {turn} 个月</p>
      </div>
    </div>
  );
};

export default PetDisplay;
