
import { GameStats, LifeStage, Ending } from '../types';
import { MAX_TURNS, MAX_STRESS } from '../constants';

/**
 * 根据回合数获取当前生命阶段
 */
export const getLifeStage = (turn: number): LifeStage => {
  if (turn <= 8) return 'INFANCY';
  if (turn <= 16) return 'SCHOOL';
  return 'WORK';
};

/**
 * 应用属性变化，包含态度修正和边界检查
 */
export const applyStatChanges = (
  currentStats: GameStats,
  impact: Partial<GameStats>,
  selectedAttitudeId?: string
): GameStats => {
  const next = { ...currentStats };
  
  // 1. 应用基础影响
  Object.entries(impact).forEach(([key, value]) => {
    // Correctly filter out non-numeric fields from GameStats
    if (key === 'modifiers' || key === 'TURN' || key === 'activeTraits') return;
    
    const k = key as keyof GameStats;
    const val = value as number;
    
    // Explicitly check that both target and source are numbers to satisfy TypeScript
    if (typeof next[k] === 'number' && typeof val === 'number') {
      (next as any)[k] = Math.max(0, (next[k] as number) + val);
    }
  });

  // 2. 应用态度修正逻辑
  if (['STRICT', 'NERD', 'HARDCORE'].includes(selectedAttitudeId || '')) {
    next.STRS += 8;
    next.INT += 5;
  } else if (['TENDER', 'SOCIAL', 'SLACKER'].includes(selectedAttitudeId || '')) {
    next.STRS = Math.max(0, next.STRS - 12);
    next.CHR += 5;
  }

  return next;
};

/**
 * 结局判定逻辑
 */
export const calculateEnding = (stats: GameStats): Ending => {
  if (stats.STRS >= MAX_STRESS) {
    return {
      title: "结局：提前燃尽的社畜",
      description: "高强度的压力终究击垮了你。你递交了辞呈，决定回老家开个猫咖。虽然平淡，但你终于找回了睡眠。",
      type: 'FAILURE',
      image: 'https://picsum.photos/seed/burnout/500/500'
    };
  }

  const max = Math.max(stats.STR, stats.INT, stats.CHR);
  if (stats.INT === max && stats.GOLD > 1000) {
    return {
      title: "结局：首席技术合伙人",
      description: "凭借过人的才华和积累的资本，你成为了行业的领军人物。现在是你给别人画饼的时候了。",
      type: 'SUCCESS',
      image: 'https://picsum.photos/seed/cto/500/500'
    };
  } else if (stats.CHR === max) {
    return {
      title: "结局：满级带货博主",
      description: "职场不适合你，但你的人格魅力征服了互联网。你离职后开启了直播生涯，成为了顶流。",
      type: 'SUCCESS',
      image: 'https://picsum.photos/seed/influencer/500/500'
    };
  } else {
    return {
      title: "结局：职场老油条",
      description: "你完美地游走在内卷与摆烂之间。虽然没大富大贵，但你是公司里活得最久、最舒适的那个。",
      type: 'SUCCESS',
      image: 'https://picsum.photos/seed/expert/500/500'
    };
  }
};
