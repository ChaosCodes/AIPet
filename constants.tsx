
import { Activity, ShopItem, GameEvent } from './types';

export const INITIAL_STATS = {
  STR: 10,
  INT: 10,
  CHR: 10,
  GOLD: 50,
  STRS: 0,
  TURN: 1
};

export const MAX_TURNS = 24;
export const MAX_STRESS = 100;

export const ACTIVITIES: Activity[] = [
  // --- 学习 (STUDY) ---
  {
    id: 'study_1',
    category: 'STUDY',
    label: '翻看绘本',
    description: '看点彩色的图画，启蒙智力。',
    icon: 'fa-book-open',
    baseChanges: { INT: 3, STRS: 2 }
  },
  {
    id: 'study_2',
    category: 'STUDY',
    label: '少儿编程',
    description: '从小就开始学习0和1的奥秘。',
    icon: 'fa-code',
    requirements: { INT: 20 },
    baseChanges: { INT: 8, STRS: 8 }
  },
  {
    id: 'study_3',
    category: 'STUDY',
    label: '奥数竞赛',
    description: '挑战逻辑极限，当然压力也很大。',
    icon: 'fa-brain',
    requirements: { INT: 60 },
    baseChanges: { INT: 20, STRS: 20 }
  },
  {
    id: 'study_4',
    category: 'STUDY',
    label: '量子力学',
    description: '遇事不决，量子力学。',
    icon: 'fa-atom',
    requirements: { INT: 120 },
    baseChanges: { INT: 40, STRS: 30 }
  },
  // --- 娱乐 (PLAY) ---
  {
    id: 'play_1',
    category: 'PLAY',
    label: '公园散步',
    description: '呼吸新鲜空气，放松心情。',
    icon: 'fa-sun',
    baseChanges: { STRS: -15, CHR: 2, GOLD: -5 }
  },
  {
    id: 'play_2',
    category: 'PLAY',
    label: '去游乐园',
    description: '奢侈的快乐，心情大好。',
    icon: 'fa-fort-awesome',
    baseChanges: { STRS: -30, CHR: 10, GOLD: -50 }
  },
  {
    id: 'play_3',
    category: 'PLAY',
    label: '电子竞技',
    description: '在虚拟世界寻找成就感。',
    icon: 'fa-gamepad',
    requirements: { CHR: 30 },
    baseChanges: { STRS: -20, CHR: 15, GOLD: -20 }
  },
  // --- 劳动 (WORK) ---
  {
    id: 'work_1',
    category: 'WORK',
    label: '捡矿泉水瓶',
    description: '体验生活艰辛，赚点零花钱。',
    icon: 'fa-recycle',
    baseChanges: { GOLD: 15, STR: 2, STRS: 5 }
  },
  {
    id: 'work_2',
    category: 'WORK',
    label: '送外卖',
    description: '在城市中穿梭，锻炼体魄。',
    icon: 'fa-motorcycle',
    requirements: { STR: 30 },
    baseChanges: { GOLD: 45, STR: 10, STRS: 15 }
  },
  {
    id: 'work_3',
    category: 'WORK',
    label: '兼职程序员',
    description: '用代码换取高额报酬，熬夜辛苦。',
    icon: 'fa-laptop-code',
    requirements: { INT: 80 },
    baseChanges: { GOLD: 120, INT: 5, STRS: 25 }
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'item_1',
    label: '肥宅快乐水',
    description: '吨吨吨，压力全消！',
    cost: 30,
    icon: 'fa-bottle-water',
    effect: { STRS: -35 }
  },
  {
    id: 'item_2',
    label: '五年高考三年模拟',
    description: '虽然很痛苦，但智力飞涨。',
    cost: 80,
    icon: 'fa-book',
    effect: { INT: 20, STRS: 15 }
  },
  {
    id: 'item_3',
    label: '黄金运动鞋',
    description: '穿上它，你就是这条街最靓的仔。',
    cost: 150,
    icon: 'fa-shoe-prints',
    effect: { CHR: 25, STR: 10 }
  },
  {
    id: 'item_4',
    label: '降压药',
    description: '强制冷却过热的大脑。',
    cost: 100,
    icon: 'fa-pills',
    effect: { STRS: -60 }
  }
];

export const MOCK_EVENTS: Record<string, GameEvent[]> = {
  'STUDY': [{ location: '学校', text: '你埋头苦读，感觉大脑在燃烧。', changes: { INT: 5 } }],
  'PLAY': [{ location: '家里', text: '彻底的放松，你感觉自己又活过来了。', changes: { STRS: -10 } }],
  'WORK': [{ location: '工地', text: '汗水不会骗人，兜里多了不少钱。', changes: { GOLD: 20 } }]
};
