
import React from 'react';
import { TurnPlan } from '../../types';

interface Props {
  plan: TurnPlan;
  onUpdate: (patch: Partial<TurnPlan>) => void;
}

const PROJECTS = [
  { id: 'MAINTAIN', label: '常规维护', desc: '低风险低回报，适合回血', intensity: 1, icon: 'fa-mug-hot', baseCost: 40, baseStress: 15 },
  { id: 'CRITICAL', label: '核心竞标', desc: '高压力的阶级跨越机会', intensity: 2, icon: 'fa-fire', baseCost: 80, baseStress: 30 },
  { id: 'DISRUPT', label: '颠覆式研发', desc: '极高风险，可能改变赛道', intensity: 3, icon: 'fa-rocket', baseCost: 120, baseStress: 45 },
];

const STYLES: {id: 'SLACK' | 'GRIND' | 'INNOVATE', label: string, badge: string, mod: string}[] = [
  { id: 'SLACK', label: '摸鱼平衡', badge: '压力 -20%', mod: 'Low Risk' },
  { id: 'GRIND', label: '内卷致死', badge: '压力 1.5x', mod: 'High Output' },
  { id: 'INNOVATE', label: '思维破圈', badge: '金钱 2.0x', mod: 'Bonus Potential' },
];

const WorkStage: React.FC<Props> = ({ plan, onUpdate }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tighter">职场资源博弈</h3>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">选择项目载体 · 投入决定阶级上限</p>
      </div>

      <div className="space-y-4">
        {PROJECTS.map(p => (
          <button
            key={p.id}
            onClick={() => onUpdate({ workProject: { ...p, style: plan.workProject?.style || 'SLACK' } })}
            className={`w-full p-6 rounded-[2.5rem] border-2 text-left transition-all relative group
              ${plan.workProject?.id === p.id 
                ? 'bg-blue-600 border-blue-800 text-white shadow-2xl scale-[1.02]' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 shadow-sm'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <i className={`fas ${p.icon} ${plan.workProject?.id === p.id ? 'text-white' : 'text-blue-500'}`}></i>
                <span className="text-sm font-black">{p.label}</span>
              </div>
              <div className="flex gap-2">
                <span className={`text-[8px] font-black px-2 py-1 rounded-lg ${plan.workProject?.id === p.id ? 'bg-white/20 text-white' : 'bg-yellow-50 text-yellow-600'}`}>
                  ${p.baseCost}
                </span>
                <span className={`text-[8px] font-black px-2 py-1 rounded-lg ${plan.workProject?.id === p.id ? 'bg-white/20 text-white' : 'bg-pink-50 text-pink-600'}`}>
                  +{p.baseStress} STRS
                </span>
              </div>
            </div>
            <p className={`text-[10px] font-bold ${plan.workProject?.id === p.id ? 'text-blue-100' : 'text-slate-400'}`}>{p.desc}</p>
          </button>
        ))}
      </div>

      {plan.workProject && (
        <div className="p-8 bg-slate-950 rounded-[3rem] animate-modalPop border-[6px] border-slate-900 shadow-2xl">
           <div className="flex flex-col items-center mb-6">
             <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">Execution Style</p>
             <p className="text-[11px] font-black text-white uppercase">选择本月执行作风</p>
           </div>
           
           <div className="grid grid-cols-1 gap-3">
              {STYLES.map(s => (
                <button
                  key={s.id}
                  onClick={() => onUpdate({ workProject: { ...plan.workProject!, style: s.id } })}
                  className={`px-6 py-4 rounded-2xl border-2 flex items-center justify-between transition-all group
                    ${plan.workProject?.style === s.id 
                      ? 'bg-white border-white text-slate-900 scale-105 shadow-xl' 
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black uppercase">{s.label}</span>
                    <span className="text-[7px] font-black opacity-40 uppercase tracking-widest mt-0.5">{s.mod}</span>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-1 rounded-lg ${plan.workProject?.style === s.id ? 'bg-slate-900 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    {s.badge}
                  </span>
                </button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default WorkStage;
