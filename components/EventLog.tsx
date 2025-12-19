
import React, { useEffect, useRef } from 'react';
import { TurnResult } from '../types';

interface EventLogProps {
  history: TurnResult[];
}

const EventLog: React.FC<EventLogProps> = ({ history }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar flex flex-col gap-5 pr-3" ref={scrollRef}>
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-slate-200">
          <i className="fas fa-dna text-4xl mb-4 opacity-30 animate-spin-slow"></i>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center opacity-50">数据链路空白<br/>等待首次推演</p>
        </div>
      ) : (
        history.map((h, idx) => (
          <div key={idx} className="group animate-fadeIn bg-white border-2 border-slate-50 p-5 rounded-[2rem] hover:border-blue-100 transition-all shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                 <span className="w-5 h-5 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[9px] font-black">
                   {idx + 1}
                 </span>
                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Evolution Log</span>
               </div>
               {h.newModifier && <i className={`fas ${h.newModifier.icon} text-blue-500 text-xs`}></i>}
            </div>
            <p className="text-[11px] font-bold text-slate-600 leading-relaxed mb-4 italic">
              "{h.text.length > 80 ? h.text.substring(0, 80) + '...' : h.text}"
            </p>
            <div className="flex flex-wrap gap-1.5 border-t border-slate-50 pt-4">
               {/* Fix: Filter out 'modifiers' which is an array and cannot be directly rendered in a span. 
                   Cast v to number to satisfy ReactNode requirements for rendering. */}
               {Object.entries(h.changes || {})
                 .filter(([k, v]) => k !== 'modifiers' && (v as any) !== 0)
                 .map(([s, v]) => (
                 <span key={s} className={`text-[8px] font-black px-2.5 py-1 rounded-lg border
                    ${(v as number) > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-50' : 'bg-pink-50 text-pink-600 border-pink-50'}
                 `}>
                    {s} {(v as number) > 0 ? '+' : ''}{v as number}
                 </span>
               ))}
            </div>
            <div className="absolute right-0 bottom-0 p-4 opacity-0 group-hover:opacity-[0.03] transition-opacity">
               <i className="fas fa-fingerprint text-6xl"></i>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventLog;
