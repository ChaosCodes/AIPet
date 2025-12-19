
import React, { useState, useEffect } from 'react';
import PetDisplay from './components/PetDisplay';
import EventLog from './components/EventLog';
import EndingModal from './components/EndingModal';
import InfancyStage from './components/stages/InfancyStage';
import { useGameEngine } from './hooks/useGameEngine';

const LOADING_TEXTS = ["正在解析神经连接...", "重塑神经网络...", "由于算力不足正在排队...", "解构因果链路..."];

const App: React.FC = () => {
  const engine = useGameEngine();
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval: number;
    if (engine.isProcessing) {
      interval = window.setInterval(() => {
        setLoadingTextIndex(prev => (prev + 1) % LOADING_TEXTS.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [engine.isProcessing]);

  const isFateIncident = engine.lastResult?.text.includes('[') && engine.lastResult?.text.includes(']');

  return (
    <div className="min-h-screen flex bg-[#f5f2ee] text-slate-800 font-sans selection:bg-blue-100 overflow-hidden">
      
      {/* Control Button - Adjusted positioning to work with drawer */}
      <div className={`fixed top-8 left-8 z-[1100] transition-all duration-500 ${showSettings ? 'translate-x-72' : 'translate-x-0'}`}>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-2xl border-4 bg-white border-white ${showSettings ? 'text-indigo-600' : 'text-slate-400'} hover:scale-110 active:scale-95 group`}
        >
          <i className={`fas fa-cog text-xl transition-transform duration-500 ${showSettings ? 'rotate-180' : 'group-hover:rotate-45'}`}></i>
        </button>
      </div>

      {/* Settings Drawer (Compact) */}
      <div className={`fixed inset-y-0 left-0 z-[1000] w-80 bg-white/80 backdrop-blur-2xl border-r border-slate-200 transition-transform duration-500 ease-out shadow-[20px_0_50px_rgba(0,0,0,0.05)] ${showSettings ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 pt-28">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">实验配置 (System)</h3>
          </div>

          <div className="flex-1 space-y-10 overflow-y-auto custom-scrollbar pr-2">
            {/* AI Narrator Toggle */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block px-1">核心协议</span>
              <div className="flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-slate-900 uppercase">Gemini AI 模式</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase mt-1">动态生成成长叙事</span>
                </div>
                <button 
                  onClick={() => engine.setUseAI(!engine.useAI)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${engine.useAI ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${engine.useAI ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>

            {/* Debug Info */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block px-1">环境状态</span>
              <div className="bg-slate-900 rounded-[2rem] p-6 text-[9px] font-bold text-slate-400 space-y-3 shadow-xl">
                <div className="flex justify-between"><span>Engine Build</span><span className="text-white">v1.0.4-Balatro</span></div>
                <div className="flex justify-between"><span>Neural Link</span><span className="text-emerald-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> Active</span></div>
                <div className="flex justify-between"><span>Latency</span><span className="text-white">~32ms</span></div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-8 border-t border-slate-100">
              <button 
                onClick={() => {
                  if (confirm("确定要放弃当前的进化路径并重新开始吗？")) {
                    engine.restart();
                    setShowSettings(false);
                  }
                }}
                className="w-full py-4 bg-pink-50 text-pink-600 border border-pink-100 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-pink-100 transition-colors"
              >
                重启进化进程 (Restart)
              </button>
            </div>
          </div>

          <div className="mt-auto pt-6 text-center">
             <p className="text-[8px] font-black text-slate-200 uppercase tracking-widest">© 2025 EVO-LAB CARD EDITION</p>
          </div>
        </div>
      </div>

      {/* Main Content Overlay for Settings Drawer */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-[900] bg-slate-900/5 transition-opacity duration-500"
          onClick={() => setShowSettings(false)}
        ></div>
      )}

      <main className={`flex-1 flex flex-col items-center transition-all duration-700 ${engine.showResult ? 'blur-2xl opacity-40 grayscale' : ''}`}>
        <div className="w-full max-w-6xl p-6 md:p-12 lg:p-16 flex flex-col items-center">
          <header className="text-center mb-10 relative">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900">EVO-LAB <span className="text-indigo-600">CARD EDITION</span></h1>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Balatro-Style Evolution Sim</p>
          </header>

          <div className="w-full flex flex-col lg:flex-row gap-10 items-start justify-center">
            <div className="w-full lg:w-[40%] lg:sticky lg:top-12">
              <PetDisplay stats={engine.stats} />
            </div>

            <div className="w-full lg:w-[60%] flex flex-col gap-6">
              <section className="bg-white/95 backdrop-blur-2xl rounded-[3.5rem] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.04)] border border-white">
                <div className="flex justify-between items-center mb-10">
                   <div>
                     <h2 className="text-2xl font-black text-slate-900 uppercase">月度发育</h2>
                     <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Month {engine.stats.TURN}/24 · INFANCY</p>
                   </div>
                   <div className="text-right p-4 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <span className="text-[8px] font-black text-slate-300 uppercase block mb-1">本月Luck</span>
                      <div className="flex items-center justify-end gap-2 text-indigo-600">
                        <i className="fas fa-star text-[10px]"></i>
                        <span className="text-lg font-black">{engine.stats.LUCK}</span>
                      </div>
                   </div>
                </div>

                {engine.isProcessing ? (
                  <div className="flex flex-col items-center justify-center py-24 text-indigo-600">
                    <div className="w-16 h-16 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
                    <p className="font-black uppercase tracking-[0.2em] text-[10px]">{LOADING_TEXTS[loadingTextIndex]}</p>
                  </div>
                ) : (
                  <>
                    <InfancyStage 
                      hand={engine.hand} 
                      selectedIds={engine.selectedIds} 
                      onToggle={engine.toggleCard}
                      rerollsLeft={engine.stats.LUCK}
                      onReroll={engine.rerollHand}
                    />
                    
                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                       <div className="flex flex-col gap-2">
                         <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">预估属性变动</p>
                         <div className="flex flex-wrap gap-2">
                            {Object.entries(engine.calculation).map(([s, v]) => {
                              const value = v as number;
                              return (
                                <div key={s} className={`px-3 py-1.5 rounded-xl font-black text-[10px] border shadow-sm ${value >= 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-pink-50 text-pink-600 border-pink-100'}`}>
                                  {s} {value > 0 ? '+' : ''}{value}
                                </div>
                              );
                            })}
                         </div>
                       </div>

                       <button
                         onClick={engine.executeTurn}
                         disabled={engine.selectedIds.length === 0}
                         className={`w-full md:w-auto px-12 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-2xl active:scale-95 ${engine.selectedIds.length === 0 ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' : 'bg-slate-950 text-white hover:bg-indigo-600'}`}
                       >
                         同步并继续进化 <i className="fas fa-dna text-[10px]"></i>
                       </button>
                    </div>
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <aside className="w-80 bg-white/80 backdrop-blur-3xl border-l border-slate-200 hidden xl:flex flex-col">
        <div className="p-10 border-b border-slate-100 text-center"><h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">因果观测历史</h3></div>
        <div className="flex-1 overflow-hidden p-6"><EventLog history={engine.history} /></div>
      </aside>

      {/* Result Modal */}
      {engine.showResult && engine.lastResult && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={engine.closeResult}></div>
          <div className={`max-w-2xl w-full bg-white rounded-[4rem] overflow-hidden shadow-2xl border-[12px] relative z-10 animate-modalPop transition-colors ${isFateIncident ? 'border-orange-400' : 'border-white'}`}>
            <div className="p-12 md:p-20 text-center relative">
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-12">同步完成 · Month {engine.stats.TURN - 1}</div>
              <blockquote className="text-2xl font-black text-slate-900 leading-tight italic mb-12">"{engine.lastResult.text}"</blockquote>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                 {Object.entries(engine.lastResult.changes || {}).map(([s, v]) => (
                   <div key={s} className={`px-5 py-3 rounded-2xl font-black text-xs border border-white shadow-md ${(v as number) > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-pink-50 text-pink-600'}`}>
                     {s} {(v as number) > 0 ? '+' : ''}{v as number}
                   </div>
                 ))}
              </div>
              <button onClick={engine.closeResult} className={`w-full py-6 text-white font-black rounded-3xl shadow-2xl transition-all uppercase tracking-[0.3em] text-xs bg-slate-950 hover:bg-indigo-600`}>
                确认状态并继续
              </button>
            </div>
          </div>
        </div>
      )}

      {engine.isGameOver && <EndingModal stats={engine.stats} onRestart={engine.restart} />}
    </div>
  );
};

export default App;
