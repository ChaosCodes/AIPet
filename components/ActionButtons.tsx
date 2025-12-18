
import React, { useState } from 'react';
import { ACTIVITIES } from '../constants';
import { Activity, GameStats } from '../types';

interface ActionButtonsProps {
  stats: GameStats;
  onSelect: (activity: Activity) => void;
  disabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ stats, onSelect, disabled }) => {
  const [filter, setFilter] = useState<'STUDY' | 'PLAY' | 'WORK'>('STUDY');

  const filteredActivities = ACTIVITIES.filter(a => {
    if (a.category !== filter) return false;
    if (a.requirements) {
      return Object.entries(a.requirements).every(([stat, min]) => {
        return (stats[stat as keyof GameStats] || 0) >= (min as number);
      });
    }
    return true;
  });

  const getCatColor = (cat: string) => {
    if (cat === 'STUDY') return 'text-blue-500 bg-blue-50';
    if (cat === 'PLAY') return 'text-pink-500 bg-pink-50';
    return 'text-emerald-500 bg-emerald-50';
  };

  const getCatName = (cat: string) => {
    if (cat === 'STUDY') return '学习进度';
    if (cat === 'PLAY') return '休闲娱乐';
    return '打工赚钱';
  };

  const getStatName = (s: string) => {
    switch(s) {
      case 'INT': return '智';
      case 'STR': return '力';
      case 'CHR': return '魅';
      case 'GOLD': return '金';
      case 'STRS': return '压';
      default: return s;
    }
  }

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-4 bg-white/50 p-1 rounded-2xl border border-white">
        {(['STUDY', 'PLAY', 'WORK'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
              filter === cat 
              ? 'bg-white shadow-sm text-slate-700 scale-100' 
              : 'text-slate-400 hover:bg-white/30 scale-95'
            }`}
          >
            {getCatName(cat)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-10 text-slate-400 italic text-sm">
            该类别下暂无解锁的项目...
          </div>
        ) : (
          filteredActivities.map((act) => (
            <button
              key={act.id}
              onClick={() => onSelect(act)}
              disabled={disabled}
              className={`
                group flex items-center gap-4 p-4 rounded-3xl border-2 border-white transition-all text-left
                ${disabled ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:border-blue-200 hover:bg-white/80 active:scale-95'}
                bg-white/40
              `}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${getCatColor(act.category)}`}>
                <i className={`fas ${act.icon}`}></i>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-700 leading-tight">{act.label}</h4>
                  <div className="flex gap-1">
                    {Object.entries(act.baseChanges).map(([stat, val]) => (
                      <span key={stat} className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${val! > 0 ? 'text-emerald-500 bg-emerald-50' : 'text-pink-500 bg-pink-50'}`}>
                        {getStatName(stat)}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{act.description}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
