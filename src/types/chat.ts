export interface Message {
  id: string;
  sender: 'user' | 'npc';
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'emoji';
}

export interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  effect?: {
    mood?: number;
    score?: number;
  };
}

export interface DialogNode {
  id: string;
  messages: Message[];
  choices: Choice[];
  nextNodeId?: string;
}

export interface GameState {
  currentNodeId: string;
  score: number;
  mood: number;
  history: Message[];
}

export interface Story {
  id: string;
  title: string;
  description: string;
  nodes: Record<string, DialogNode>;
  startNodeId: string;
}
