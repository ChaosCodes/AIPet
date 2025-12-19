
import React from 'react';
import { GameCard } from '../../types';

interface Props {
  hand: GameCard[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  rerollsLeft: number;
  onReroll: () => void;
}

const InfancyStage: React.FC<Props> = ({ hand, selectedIds, onToggle, rerollsLeft, onReroll }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tighter">本月发育手牌</h3>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          从 5 张冲动中选择 3 张执行 ({selectedIds.length}/3)
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-8 relative">
        {hand.map((card, idx) => {
          const isSelected = selectedIds.includes(idx.toString());
          return (
            <button
              key={idx}
              onClick={() => onToggle(idx.toString())}
              className={`w-32 h-44 rounded-3xl p-4 flex flex-col items-center justify-between transition-all duration-300 border-4 relative group
                ${isSelected 
                  ? `${card.color} border-slate-900 -translate-y-8 shadow-[0_25px_50px_rgba(0,0,0,0.2)] scale-110 z-20` 
                  : `bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:-translate-y-2 z-10`}
              `}
            >
              <div className="flex flex-col items-center gap-2">
                <i className={`fas ${card.icon} text-2xl ${isSelected ? 'text-white' : 'text-slate-200'}`}></i>
                <span className={`text-[11px] font-black leading-tight text-center ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {card.name}
                </span>
              </div>

              <div className="w-full flex flex-col gap-1 items-center">
                 <div className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${isSelected ? 'bg-black/20 text-white' : 'bg-slate-50 text-slate-500'}`}>
                   +{card.baseValue} {card.type}
                 </div>
                 {card.multiplier && (
                   <div className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${isSelected ? 'bg-white text-slate-900' : 'bg-blue-50 text-blue-500'}`}>
                     x{card.multiplier}
                   </div>
                 )}
              </div>

              {card.rarity !== 'COMMON' && (
                <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[7px] font-black border-2 border-white shadow-sm ${card.rarity === 'RARE' ? 'bg-yellow-400 text-yellow-900' : 'bg-purple-400 text-white'}`}>
                  {card.rarity}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button 
          onClick={onReroll}
          disabled={rerollsLeft <= 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
            ${rerollsLeft > 0 ? 'bg-indigo-50 text-indigo-600 border-2 border-indigo-100 hover:bg-indigo-100' : 'bg-slate-50 text-slate-200 cursor-not-allowed'}
          `}
        >
          <i className="fas fa-rotate"></i> 重抽 ({rerollsLeft})
        </button>
        <p className="text-[8px] font-black text-slate-300 uppercase italic">
          * 每次重抽消耗 1 点 LUCK
        </p>
      </div>
    </div>
  );
};

export default InfancyStage;
