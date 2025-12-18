
import React, { useEffect, useRef } from 'react';
import { GameEvent } from '../types';

interface EventLogProps {
  events: GameEvent[];
}

const EventLog: React.FC<EventLogProps> = ({ events }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [events]);

  const getStatName = (s: string) => {
    switch(s) {
      case 'INT': return '智力';
      case 'STR': return '力量';
      case 'CHR': return '魅力';
      case 'GOLD': return '金钱';
      case 'STRS': return '压力';
      default: return s;
    }
  }

  return (
    <div className="mt-6 kawaii-card rounded-3xl p-6 h-64 overflow-y-auto custom-scrollbar flex flex-col gap-4" ref={scrollRef}>
      {events.length === 0 ? (
        <div className="text-slate-300 font-bold italic h-full flex flex-col items-center justify-center gap-3">
          <i className="fas fa-comment-dots fa-3x opacity-20"></i>
          <p>准备好开始新的一月了吗？</p>
        </div>
      ) : (
        events.map((ev, idx) => (
          <div key={idx} className="animate-fadeIn flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-black px-3 py-0.5 rounded-full uppercase tracking-tighter text-white
                ${ev.location === 'Market' || ev.location === '商店' ? 'bg-yellow-400' : 'bg-blue-400'}
              `}>
                {ev.location}
              </span>
            </div>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-slate-50 relative">
              <div className="absolute -top-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-bottom-[8px] border-white"></div>
              
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{ev.text}</p>
              
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                {Object.entries(ev.changes).map(([stat, val]) => (
                  <div key={stat} className={`text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1
                    ${(val as number) > 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-pink-50 text-pink-500'}
                  `}>
                    <span className="uppercase">{getStatName(stat)}</span>
                    <span>{(val as number) > 0 ? '↑' : '↓'} {Math.abs(val as number)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventLog;
