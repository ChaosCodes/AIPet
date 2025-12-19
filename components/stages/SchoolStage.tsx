
import React from 'react';
import { TurnPlan } from '../../types';

interface Props {
  plan: TurnPlan;
  onUpdate: (patch: Partial<TurnPlan>) => void;
}

const SUBJECTS = [
  { id: 'MATH', label: '逻辑/奥数', icon: 'fa-calculator', color: 'text-blue-500', gain: 'INT+++', cost: 25, stress: 12 },
  { id: 'ART', label: '创意/艺术', icon: 'fa-palette', color: 'text-pink-500', gain: 'CHR++', cost: 25, stress: 6 },
  { id: 'SPORT', label: '体能/竞技', icon: 'fa-medal', color: 'text-orange-500', gain: 'STR+++', cost: 25, stress: 10 },
  { id: 'SOCIAL', label: '演说/社交', icon: 'fa-comments', color: 'text-emerald-500', gain: 'CHR+++', cost: 25, stress: 8 },
];

const SchoolStage: React.FC<Props> = ({ plan, onUpdate }) => {
  const toggleSubject = (id: string) => {
    const next = plan.schoolSubjects.includes(id)
      ? plan.schoolSubjects.filter(i => i !== id)
      : plan.schoolSubjects.length < 3 ? [...plan.schoolSubjects, id] : plan.schoolSubjects;
    onUpdate({ schoolSubjects: next });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tighter">学业资源配比</h3>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">排定重点科目 ({plan.schoolSubjects.length}/3) · 影响未来职业门槛</p>
      </div>

      <div className="space-y-3">
        {SUBJECTS.map(s => (
          <button
            key={s.id}
            onClick={() => toggleSubject(s.id)}
            className={`w-full p-5 rounded-[1.8rem] border-2 flex items-center justify-between transition-all group
              ${plan.schoolSubjects.includes(s.id)
                ? 'bg-slate-900 border-slate-900 text-white translate-x-2 shadow-xl'
                : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}
          >
            <div className="flex items-center gap-4">
              <i className={`fas ${s.icon} ${plan.schoolSubjects.includes(s.id) ? 'text-blue-400' : s.color} transition-colors`}></i>
              <div className="flex flex-col items-start">
                <span className="text-xs font-black">{s.label}</span>
                <div className="flex gap-2 mt-1">
                  <span className={`text-[7px] font-black uppercase ${plan.schoolSubjects.includes(s.id) ? 'text-white/40' : 'text-slate-300'}`}>
                    ${s.cost} / +{s.stress} STRS
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
               <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${plan.schoolSubjects.includes(s.id) ? 'bg-blue-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                 {s.gain}
               </span>
               {plan.schoolSubjects.includes(s.id) && (
                 <i className="fas fa-check-circle text-blue-400 animate-breathe"></i>
               )}
            </div>
          </button>
        ))}
      </div>
      
      <p className="text-center text-[8px] font-black text-slate-300 uppercase tracking-widest">
        * 注意：过度选择高压科目可能导致期末神经崩溃
      </p>
    </div>
  );
};

export default SchoolStage;
