
import React from 'react';
import { SHOP_ITEMS } from '../constants';
import { ShopItem, GameStats } from '../types';

interface StoreProps {
  gold: number;
  onBuy: (item: ShopItem) => void;
}

const Store: React.FC<StoreProps> = ({ gold, onBuy }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {SHOP_ITEMS.map((item) => {
        const canAfford = gold >= item.cost;
        return (
          <div 
            key={item.id} 
            className={`kawaii-card p-4 rounded-3xl border-2 transition-all ${canAfford ? 'border-yellow-200 hover:scale-[1.02]' : 'opacity-60 border-slate-200 grayscale'}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl shadow-inner">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-700">{item.label}</h4>
                <p className="text-[10px] text-slate-400 leading-tight">{item.description}</p>
              </div>
              <button
                disabled={!canAfford}
                onClick={() => onBuy(item)}
                className={`px-4 py-2 rounded-2xl font-black text-xs transition-all ${
                  canAfford 
                  ? 'bg-yellow-400 text-white hover:bg-yellow-500 shadow-lg shadow-yellow-200 active:scale-90' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                ${item.cost}
              </button>
            </div>
            <div className="mt-2 flex gap-2">
               {Object.entries(item.effect).map(([stat, val]) => (
                <span key={stat} className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${val! > 0 ? 'text-emerald-500 bg-emerald-50' : 'text-pink-500 bg-pink-50'}`}>
                  {getStatName(stat)} {val! > 0 ? '+' : ''}{val}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Store;
