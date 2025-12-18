
export interface GameStats {
  STR: number;
  INT: number;
  CHR: number;
  GOLD: number;
  STRS: number;
  TURN: number;
}

export interface GameEvent {
  location: string;
  text: string;
  changes: Partial<GameStats>;
}

export type PetStage = 'EGG' | 'LARVA' | 'JUVENILE' | 'ADULT';

export interface Activity {
  id: string;
  category: 'STUDY' | 'PLAY' | 'WORK';
  label: string;
  description: string;
  icon: string;
  requirements?: Partial<GameStats>;
  baseChanges: Partial<GameStats>;
}

export interface ShopItem {
  id: string;
  label: string;
  description: string;
  cost: number;
  icon: string;
  effect: Partial<GameStats>;
}

export interface Ending {
  title: string;
  description: string;
  type: 'SUCCESS' | 'FAILURE';
  image: string;
}
