
import React from 'react';
import { GameStats, Ending } from '../types';

interface EndingModalProps {
  stats: GameStats;
  onRestart: () => void;
}

const EndingModal: React.FC<EndingModalProps> = ({ stats, onRestart }) => {
  const getEnding = (): Ending => {
    if (stats.STRS >= 100) {
      return {
        title: "崩溃结局：精神破碎",
        description: "太重的学业压力和生活负担压垮了你的宠物。它选择了逃避现实，成为了一个电子废墟中的孤影。",
        type: 'FAILURE',
        image: 'https://picsum.photos/seed/glitch/500/500'
      };
    }

    const max = Math.max(stats.STR, stats.INT, stats.CHR);
    if (stats.INT === max) {
      return {
        title: "辉煌结局：大科学家",
        description: "你的宠物凭借超凡的智慧，成为了数字世界的首席架构师。它改变了整个文明的演化进程。",
        type: 'SUCCESS',
        image: 'https://picsum.photos/seed/cyber-brain/500/500'
      };
    } else if (stats.STR === max) {
      return {
        title: "巅峰结局：传奇斗士",
        description: "无坚不摧的力量，坚韧不拔的意志。你的宠物成为了守护次元平衡的最强战神。",
        type: 'SUCCESS',
        image: 'https://picsum.photos/seed/cyber-knight/500/500'
      };
    } else {
      return {
        title: "完美结局：全民偶像",
        description: "闪耀的光芒，动人的魅力。你的宠物成为了链接所有生命情感的超级明星，被万众瞩目。",
        type: 'SUCCESS',
        image: 'https://picsum.photos/seed/cyber-star/500/500'
      };
    }
  };

  const ending = getEnding();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-md w-full glass border-4 border-white rounded-[3rem] overflow-hidden shadow-2xl">
        <img src={ending.image} alt="结局" className="w-full h-48 object-cover border-b-4 border-white" />
        
        <div className="p-8 text-center bg-white/50 backdrop-blur-md">
          <h2 className={`text-3xl font-black mb-4 tracking-tighter ${ending.type === 'FAILURE' ? 'text-pink-600' : 'text-blue-500'}`}>
            {ending.title}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
            {ending.description}
          </p>
          
          <div className="grid grid-cols-3 gap-2 mb-8 p-4 bg-white/40 rounded-3xl border border-white font-bold text-xs">
            <div><div className="text-slate-400">力量</div><div className="text-orange-500 text-lg">{stats.STR}</div></div>
            <div><div className="text-slate-400">智力</div><div className="text-blue-500 text-lg">{stats.INT}</div></div>
            <div><div className="text-slate-400">魅力</div><div className="text-pink-500 text-lg">{stats.CHR}</div></div>
          </div>

          <button
            onClick={onRestart}
            className="w-full py-4 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            开启新轮回
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndingModal;
