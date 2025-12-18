
import React, { useState, useEffect } from 'react';
import StatusBar from './components/StatusBar';
import PetDisplay from './components/PetDisplay';
import ActionButtons from './components/ActionButtons';
import EventLog from './components/EventLog';
import Store from './components/Store';
import EndingModal from './components/EndingModal';
import { GameStats, GameEvent, Activity, ShopItem } from './types';
import { INITIAL_STATS, MAX_TURNS, MAX_STRESS, MOCK_EVENTS } from './constants';
import { generateNarrativeEvent } from './services/geminiService';

const App: React.FC = () => {
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'STORE'>('SCHEDULE');

  const handleActivity = async (activity: Activity) => {
    if (isProcessing || isGameOver) return;
    setIsProcessing(true);

    try {
      let event: GameEvent;
      try {
        event = await generateNarrativeEvent(stats, activity.label);
      } catch (e) {
        const fallback = MOCK_EVENTS[activity.category][0];
        event = {
          ...fallback,
          location: activity.label,
          changes: activity.baseChanges
        };
      }

      setStats(prev => {
        const nextStats = { ...prev };
        const effectiveChanges = event.changes || activity.baseChanges;
        Object.entries(effectiveChanges).forEach(([key, value]) => {
          const k = key as keyof GameStats;
          if (typeof value === 'number') {
            nextStats[k] = Math.max(0, (nextStats[k] || 0) + value);
          }
        });
        nextStats.TURN += 1;
        return nextStats;
      });

      setEvents(prev => [...prev, event]);
    } catch (err) {
      console.error("Game loop error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyItem = (item: ShopItem) => {
    if (stats.GOLD < item.cost) return;

    setStats(prev => {
      const nextStats = { ...prev };
      nextStats.GOLD -= item.cost;
      Object.entries(item.effect).forEach(([key, value]) => {
        const k = key as keyof GameStats;
        if (typeof value === 'number') {
          nextStats[k] = Math.max(0, (nextStats[k] || 0) + value);
        }
      });
      return nextStats;
    });

    setEvents(prev => [...prev, {
      location: '商店',
      text: `购买了 ${item.label}！${item.description}`,
      changes: item.effect
    }]);
  };

  useEffect(() => {
    if (stats.STRS >= MAX_STRESS || stats.TURN > MAX_TURNS) {
      setIsGameOver(true);
    }
  }, [stats]);

  const restartGame = () => {
    setStats(INITIAL_STATS);
    setEvents([]);
    setIsGameOver(false);
    setActiveTab('SCHEDULE');
  };

  return (
    <div className="min-h-screen p-6 md:p-8 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <header className="mb-8 text-center relative">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-1">
            宠物养成模拟器 ✨
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            命运序列 // {stats.TURN} / {MAX_TURNS} 月
          </p>
        </header>

        {/* Global Stats */}
        <StatusBar stats={stats} />

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pet Visuals & Events */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <PetDisplay turn={stats.TURN} />
            <div className="hidden lg:block">
              <h3 className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest px-2">成长足迹</h3>
              <EventLog events={events} />
            </div>
          </div>

          {/* Right Column: Interaction Tabs */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="kawaii-card rounded-[2rem] p-6">
              <div className="flex items-center justify-between mb-4 border-b-2 border-slate-50 pb-4">
                 <div className="flex gap-6">
                    <button 
                      onClick={() => setActiveTab('SCHEDULE')}
                      className={`text-sm font-black transition-all ${activeTab === 'SCHEDULE' ? 'text-blue-500 scale-110' : 'text-slate-300 hover:text-slate-400'}`}
                    >
                      <i className="fas fa-calendar-check mr-2"></i>培养计划
                    </button>
                    <button 
                      onClick={() => setActiveTab('STORE')}
                      className={`text-sm font-black transition-all ${activeTab === 'STORE' ? 'text-yellow-500 scale-110' : 'text-slate-300 hover:text-slate-400'}`}
                    >
                      <i className="fas fa-shopping-bag mr-2"></i>小卖部
                    </button>
                 </div>
                 <div className="text-[10px] font-bold text-slate-400 italic">
                    {activeTab === 'SCHEDULE' ? '规划每月的成长路径' : '投资稀有道具'}
                 </div>
              </div>

              {activeTab === 'SCHEDULE' ? (
                <ActionButtons 
                  stats={stats} 
                  onSelect={handleActivity} 
                  disabled={isProcessing || isGameOver} 
                />
              ) : (
                <Store gold={stats.GOLD} onBuy={handleBuyItem} />
              )}

              {isProcessing && (
                <div className="mt-8 text-center animate-pulse text-pink-400 font-bold text-sm">
                  <i className="fas fa-wand-magic-sparkles mr-2"></i> 正在生成命运事件...
                </div>
              )}
            </div>

            {/* Mobile Event Log */}
            <div className="lg:hidden">
              <EventLog events={events} />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
        制作: 奇迹宠物实验室 &bull; 2024
      </footer>

      {isGameOver && (
        <EndingModal stats={stats} onRestart={restartGame} />
      )}
    </div>
  );
};

export default App;
