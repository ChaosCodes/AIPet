
export type StatType = 'STR' | 'INT' | 'CHR' | 'GOLD' | 'STRS';

export interface GameCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: StatType;
  baseValue: number;
  multiplier?: number; // Balatro-style Mult
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE';
  color: string;
}

export interface TraitCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  effect: (stats: GameStats, playedCards: GameCard[]) => Partial<GameStats>;
  passiveMult?: Partial<Record<StatType, number>>;
}

export interface GameStats {
  STR: number; 
  INT: number; 
  CHR: number; 
  GOLD: number; 
  STRS: number; 
  TURN: number;
  LUCK: number; // Reroll points
  modifiers: StatusEffect[];
  activeTraits: TraitCard[];
}

export interface StatusEffect {
  id: string;
  name: string;
  description: string;
  icon: string;
  statChangesPerTurn: Partial<Omit<GameStats, 'TURN' | 'modifiers' | 'activeTraits'>>;
}

export type LifeStage = 'INFANCY' | 'SCHOOL' | 'WORK';

export interface TurnPlan {
  riskAppetite: 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE';
  selectedCardIds: string[];
  // Added properties for game stage logic
  infancySensations: string[];
  schoolSubjects: string[];
  workProject?: {
    id: string;
    label: string;
    desc: string;
    intensity: number;
    icon: string;
    baseCost: number;
    baseStress: number;
    style: 'SLACK' | 'GRIND' | 'INNOVATE';
  };
}

export interface TurnResult {
  text: string;
  socialMedia?: string;
  changes?: Partial<GameStats>;
  newModifier?: StatusEffect;
}

export interface Ending {
  title: string;
  description: string;
  type: 'SUCCESS' | 'FAILURE';
  image: string;
}
