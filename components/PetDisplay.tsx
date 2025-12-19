
import React from 'react';
import { GameStats } from '../types';

interface PetDisplayProps {
  stats: GameStats;
}

const PetDisplay: React.FC<PetDisplayProps> = ({ stats }) => {
  const turn = stats.TURN;
  let image = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=egg&backgroundColor=ffd5dc';
  let animationClass = 'animate-shake';

  if (turn > 16) {
    image = `https://api.dicebear.com/7.x/adventurer/svg?seed=evolution-${turn}&backgroundColor=b6e3f4`;
    animationClass = 'animate-float animate-breathe';
  } else if (turn > 4) {
    image = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=juvenile-${turn}&backgroundColor=ffdfba`;
    animationClass = 'animate-float';
  }

  const StatBar = ({ label, value, color, icon }: { label: string, value: number, color: string, icon: string }) => (
    <div className="space-y-1 w-full">
      <div className="flex justify-between items-end px-1">
        <span className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1.5">
          <i className={`fas ${icon} text-[8px] opacity-70`}></i> {label}
        </span>
        <span className="text-[10px] font-black text-slate-900">{value}%</span>
      </div>
      <div className="h-2 bg-slate-100/80 rounded-full overflow-hidden border border-slate-50 shadow-inner">
        <div 
          className={`h-full transition-all duration-1000 ${color}`} 
          style={{ width: `${Math.min(100, value)}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-md rounded-[3.5rem] relative overflow-hidden shadow-2xl border-[6px] border-white">
      {/* HUD Accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-slate-200"></div>
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-slate-200"></div>

      {/* Main Pet Area */}
      <div className={`relative z-10 mb-8 ${animationClass}`}>
        <div className="w-52 h-52 rounded-full bg-white border-[12px] border-white p-2 shadow-2xl flex items-center justify-center relative group">
           <div className={`absolute inset-0 rounded-full opacity-20 transition-all duration-1000 ${stats.STRS > 80 ? 'bg-red-500 animate-pulse' : 'bg-blue-400 opacity-5'}`}></div>
           <img src={image} alt="AI宠物" className="w-4/5 h-4/5 object-contain relative z-10" />
        </div>
      </div>
      
      {/* Active Modifiers Area */}
      <div className="z-20 w-full mb-6 flex flex-wrap justify-center gap-2 min-h-[28px]">
         {stats.modifiers.length > 0 ? (
           stats.modifiers.map(mod => (
             <div key={mod.id} className="group relative">
               <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-help">
                 <i className={`fas ${mod.icon || 'fa-tag'}`}></i>
                 {mod.name}
               </div>
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-40 p-3 bg-slate-800 text-white text-[10px] rounded-2xl shadow-2xl z-[100] border border-slate-700">
                 <p className="font-bold mb-1">{mod.name}</p>
                 <p className="opacity-70 leading-relaxed mb-2">{mod.description}</p>
                 <div className="border-t border-slate-700 pt-1 flex flex-wrap gap-1">
                   {Object.entries(mod.statChangesPerTurn).map(([s, v]) => (
                     <span key={s} className={(v as number) > 0 ? 'text-emerald-400' : 'text-pink-400'}>
                       {s}{(v as number) > 0 ? '+' : ''}{v as number}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
           ))
         ) : (
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic opacity-40">No Modifiers</span>
         )}
      </div>

      <div className="z-10 w-full max-w-sm space-y-5 px-2">
        {/* Attributes Section */}
        <div className="space-y-3 p-6 bg-white/60 rounded-[2.5rem] border border-white shadow-sm">
          <StatBar label="Strength" value={stats.STR} color="bg-orange-500" icon="fa-dumbbell" />
          <StatBar label="Intelligence" value={stats.INT} color="bg-blue-500" icon="fa-brain" />
          <StatBar label="Charisma" value={stats.CHR} color="bg-pink-500" icon="fa-star" />
        </div>

        {/* Stress & Gold Section */}
        <div className="space-y-4">
          <StatBar 
            label="Stress Level" 
            value={stats.STRS} 
            color={stats.STRS > 85 ? 'bg-red-500' : 'bg-slate-900'} 
            icon="fa-bolt" 
          />

          <div className="flex items-center justify-between bg-yellow-400/10 px-6 py-3 rounded-2xl border-2 border-yellow-400/20 shadow-inner group transition-all hover:bg-yellow-400/20">
             <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest">Credit Balance</span>
             <span className="font-black text-lg text-yellow-700 tracking-tighter">${stats.GOLD}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDisplay;
