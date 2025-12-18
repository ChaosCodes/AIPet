
import React from 'react';
import { GameStats } from '../types';
import { MAX_TURNS, MAX_STRESS } from '../constants';

interface StatusBarProps {
  stats: GameStats;
}

const StatusBar: React.FC<StatusBarProps> = ({ stats }) => {
  const stressPercent = Math.min(100, (stats.STRS / MAX_STRESS) * 100);
  const turnPercent = (stats.TURN / MAX_TURNS) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* 成長進度 */}
      <div className="kawaii-card p-4 rounded-3xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            <i className="fas fa-calendar-alt mr-2"></i>成長阶段
          </span>
          <span className="text-sm font-bold text-slate-600">{stats.TURN} / {MAX_TURNS} 月</span>
        </div>
        <div className="w-full bg-blue-50 h-3 rounded-full overflow-hidden border border-blue-100">
          <div 
            className="bg-gradient-to-r from-blue-300 to-blue-400 h-full transition-all duration-700 rounded-full" 
            style={{ width: `${turnPercent}%` }}
          ></div>
        </div>
      </div>

      {/* 属性摘要 */}
      <div className="kawaii-card p-4 rounded-3xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <i className="fas fa-star mr-2"></i>各项能力
          </span>
          <span className="text-sm font-bold text-emerald-600">
            <i className="fas fa-coins mr-1 text-yellow-400"></i>{stats.GOLD}
          </span>
        </div>
        <div className="flex justify-between text-[10px] font-bold">
          <div className="flex flex-col items-center">
            <span className="text-slate-400">力量</span>
            <span className="text-orange-400 text-sm">{stats.STR}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-400">智力</span>
            <span className="text-blue-400 text-sm">{stats.INT}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-slate-400">魅力</span>
            <span className="text-pink-400 text-sm">{stats.CHR}</span>
          </div>
        </div>
      </div>

      {/* 压力计 */}
      <div className="kawaii-card p-4 rounded-3xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
            <i className="fas fa-face-tired mr-2"></i>心理压力
          </span>
          <span className={`text-sm font-bold ${stats.STRS > 80 ? 'text-pink-600 animate-bounce' : 'text-slate-600'}`}>
            {stats.STRS}%
          </span>
        </div>
        <div className="w-full bg-pink-50 h-3 rounded-full overflow-hidden border border-pink-100">
          <div 
            className={`${stats.STRS > 80 ? 'bg-pink-500' : 'bg-pink-300'} h-full transition-all duration-700 rounded-full`} 
            style={{ width: `${stressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
