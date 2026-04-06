// PUA tactic identifiers
export type PuaTacticId =
  | 'future-faking'        // 画饼承诺
  | 'hot-and-cold'         // 忽冷忽热
  | 'intermittent-reinforcement' // 间歇强化
  | 'triangulation'        // 三角测量
  | 'gaslighting'          // 煤气灯效应
  | 'guilt-tripping'       // 内疚操控
  | 'isolation'            // 孤立控制
  | 'financial-exploitation' // 金钱榨取
  | 'fake-breakup';        // 假意抽离

export interface PuaTactic {
  id: PuaTacticId;
  name: string;
  description: string;
}

export const PUA_TACTICS: Record<PuaTacticId, PuaTactic> = {
  'future-faking': { id: 'future-faking', name: '画饼承诺', description: '描绘美好未来但不兑现' },
  'hot-and-cold': { id: 'hot-and-cold', name: '忽冷忽热', description: '时而热情时而冷漠' },
  'intermittent-reinforcement': { id: 'intermittent-reinforcement', name: '间歇强化', description: '不规律给予关心' },
  'triangulation': { id: 'triangulation', name: '三角测量', description: '提及其他追求者制造竞争' },
  'gaslighting': { id: 'gaslighting', name: '煤气灯效应', description: '否定对方感受' },
  'guilt-tripping': { id: 'guilt-tripping', name: '内疚操控', description: '放大失误让对方补偿' },
  'isolation': { id: 'isolation', name: '孤立控制', description: '让对方疏远朋友' },
  'financial-exploitation': { id: 'financial-exploitation', name: '金钱榨取', description: '各种理由借钱' },
  'fake-breakup': { id: 'fake-breakup', name: '假意抽离', description: '用"退回朋友"试探底线' },
};

// Ending types
export type EndingType = 'awakened' | 'hesitant' | 'trapped' | 'controlled';

export interface Ending {
  type: EndingType;
  title: string;
  description: string;
}

// Messages
export interface Message {
  id: string;
  sender: 'user' | 'npc' | 'system';
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'emoji' | 'tactic-alert';
}

// Stat effects on choices
export interface StatEffect {
  affection?: number;    // 好感度
  alertness?: number;    // 警觉度
  money?: number;        // 金钱
  socialCircle?: number; // 社交圈
}

// Choices
export interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  effect?: StatEffect;
}

// Dialog nodes
export interface DialogNode {
  id: string;
  messages: Message[];
  choices: Choice[];
  nextNodeId?: string;
  tacticId?: PuaTacticId;
  tacticExplanation?: string;
}

// Game stats (4 dimensions)
export interface GameStats {
  affection: number;    // 好感度 0-100, start 50
  alertness: number;    // 警觉度 0-100, start 50
  money: number;        // 金钱, start 10000
  socialCircle: number; // 社交圈 0-100, start 80
}

// Encountered tactic record
export interface EncounteredTactic {
  tacticId: PuaTacticId;
  nodeId: string;
  explanation: string;
}

// Game state
export interface GameState {
  currentNodeId: string;
  stats: GameStats;
  history: Message[];
  encounteredTactics: EncounteredTactic[];
  ending: EndingType | null;
  isEnded: boolean;
}

// Story
export interface Story {
  id: string;
  title: string;
  description: string;
  npcName: string;
  nodes: Record<string, DialogNode>;
  startNodeId: string;
}
