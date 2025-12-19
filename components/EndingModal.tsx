
import React from 'react';
import { GameStats } from '../types';
import { calculateEnding } from '../utils/gameUtils';

interface EndingModalProps {
  stats: GameStats;
  onRestart: () => void;
}

const EndingModal: React.FC<EndingModalProps> = ({ stats, onRestart }) => {
  const ending = calculateEnding(stats);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-md w-full glass border-4 border-white rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-8 text-center bg-white/50 backdrop-blur-md">
          <div className="text-[10px] font-black text-slate-400 mb-2 tracking-[0.3em]">人生阶段性结算报告</div>
          <h2 className={`text-4xl font-black mb-6 tracking-tighter ${ending.type === 'FAILURE' ? 'text-pink-600' : 'text-blue-500'}`}>
            {ending.title}
          </h2>
          <img src={ending.image} alt="结局" className="w-full h-40 object-cover rounded-2xl mb-6 grayscale hover:grayscale-0 transition-all border-4 border-white shadow-lg" />
          <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium italic">
            "{ending.description}"
          </p>
          
          <div className="grid grid-cols-3 gap-2 mb-8 p-4 bg-white/40 rounded-3xl border border-white font-bold text-[10px]">
            <div><div className="text-slate-400">力量指数</div><div className="text-orange-500 text-lg">{stats.STR}</div></div>
            <div><div className="text-slate-400">智力指数</div><div className="text-blue-500 text-lg">{stats.INT}</div></div>
            <div><div className="text-slate-400">魅力指数</div><div className="text-pink-500 text-lg">{stats.CHR}</div></div>
          </div>

          <button
            onClick={onRestart}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl transition-all hover:bg-slate-800 active:scale-95 shadow-xl"
          >
            重新投胎，开启新人生
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndingModal;
