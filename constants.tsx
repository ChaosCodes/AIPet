
import { GameCard, TraitCard, GameStats } from './types';

export const INITIAL_STATS: GameStats = {
  STR: 10,
  INT: 10,
  CHR: 10,
  GOLD: 200, 
  STRS: 0,
  TURN: 1,
  LUCK: 3,
  modifiers: [],
  activeTraits: []
};

export const MAX_TURNS = 24;
export const MAX_STRESS = 100;
export const MAX_STAT = 100;

export const INFANCY_CARD_POOL: GameCard[] = [
  { id: 'cry', name: '大声啼哭', type: 'CHR', baseValue: 12, multiplier: 1.2, rarity: 'COMMON', color: 'bg-pink-400', icon: 'fa-face-tired', description: '引起注意，增加魅力，但也增加压力。' },
  { id: 'crawl', name: '翻滚爬行', type: 'STR', baseValue: 15, multiplier: 1.1, rarity: 'COMMON', color: 'bg-orange-400', icon: 'fa-person-running', description: '探索物理边界，强健体魄。' },
  { id: 'stare', name: '深度发呆', type: 'STRS', baseValue: -8, multiplier: 0.8, rarity: 'COMMON', color: 'bg-blue-300', icon: 'fa-eyes', description: '降低压力，但成长缓慢。' },
  { id: 'scribble', name: '乱涂乱画', type: 'INT', baseValue: 8, multiplier: 1.5, rarity: 'UNCOMMON', color: 'bg-indigo-400', icon: 'fa-pen-nib', description: '虽然费钱，但极大地激发逻辑。' },
  { id: 'grab', name: '抓周', type: 'GOLD', baseValue: 50, multiplier: 1.2, rarity: 'RARE', color: 'bg-yellow-400', icon: 'fa-hand-holding-dollar', description: '对资源的原始渴望。' },
  { id: 'giggle', name: '无理由咯咯笑', type: 'CHR', baseValue: 8, multiplier: 2.0, rarity: 'UNCOMMON', color: 'bg-rose-400', icon: 'fa-face-laugh-squint', description: '纯粹的快乐，魅力翻倍。' },
  { id: 'mimic', name: '模仿表情', type: 'INT', baseValue: 10, multiplier: 1.2, rarity: 'COMMON', color: 'bg-emerald-400', icon: 'fa-masks-theater', description: '学习人类社会的初步逻辑。' }
];

export const INITIAL_TRAITS: TraitCard[] = [
  {
    id: 'curiosity',
    name: '好奇宝宝',
    icon: 'fa-magnifying-glass',
    description: '每出一张 INT 牌，最终 INT 额外 x 1.2。',
    effect: (stats, cards) => ({}) // Logic handled in engine
  },
  {
    id: 'good_boy',
    name: '乖孩子',
    icon: 'fa-angel',
    description: '本月若压力未增加，结算后 GOLD +20。',
    effect: (stats, cards) => ({})
  }
];
