import {
  Story,
  GameState,
  GameStats,
  Choice,
  DialogNode,
  EndingType,
  EncounteredTactic,
  StatEffect,
} from '@/types/chat';

const INITIAL_STATS: GameStats = {
  affection: 50,
  alertness: 50,
  money: 10000,
  socialCircle: 80,
};

export function createInitialState(story: Story): GameState {
  return {
    currentNodeId: story.startNodeId,
    stats: { ...INITIAL_STATS },
    history: [],
    encounteredTactics: [],
    ending: null,
    isEnded: false,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function applyStatEffect(stats: GameStats, effect: StatEffect): GameStats {
  return {
    affection: clamp(stats.affection + (effect.affection ?? 0), 0, 100),
    alertness: clamp(stats.alertness + (effect.alertness ?? 0), 0, 100),
    money: Math.max(0, stats.money + (effect.money ?? 0)),
    socialCircle: clamp(stats.socialCircle + (effect.socialCircle ?? 0), 0, 100),
  };
}

export function applyChoice(state: GameState, choice: Choice, story: Story): GameState {
  const newStats = choice.effect ? applyStatEffect(state.stats, choice.effect) : state.stats;
  const nextNode = story.nodes[choice.nextNodeId];

  // Track PUA tactic if present on the next node
  let newTactics = state.encounteredTactics;
  if (nextNode?.tacticId && nextNode.tacticExplanation) {
    const alreadyEncountered = state.encounteredTactics.some(
      (t) => t.tacticId === nextNode.tacticId
    );
    if (!alreadyEncountered) {
      const tactic: EncounteredTactic = {
        tacticId: nextNode.tacticId,
        nodeId: nextNode.id,
        explanation: nextNode.tacticExplanation,
      };
      newTactics = [...state.encounteredTactics, tactic];
    }
  }

  return {
    ...state,
    currentNodeId: choice.nextNodeId,
    stats: newStats,
    encounteredTactics: newTactics,
  };
}

export function getCurrentNode(state: GameState, story: Story): DialogNode | undefined {
  return story.nodes[state.currentNodeId];
}

export function isEndingNode(node: DialogNode): boolean {
  return node.choices.length === 0 && !node.nextNodeId;
}

export function determineEnding(stats: GameStats): EndingType {
  // High alertness + good social circle + money preserved = awakened
  if (stats.alertness >= 70 && stats.socialCircle >= 60 && stats.money >= 7000) {
    return 'awakened';
  }
  // Moderate alertness but some damage = hesitant
  if (stats.alertness >= 50 && (stats.socialCircle >= 40 || stats.money >= 5000)) {
    return 'hesitant';
  }
  // Low alertness with significant damage = trapped
  if (stats.alertness >= 30 || stats.money >= 3000) {
    return 'trapped';
  }
  // Very low alertness, isolated, broke = controlled
  return 'controlled';
}

export function finalizeGame(state: GameState): GameState {
  const ending = determineEnding(state.stats);
  return {
    ...state,
    ending,
    isEnded: true,
  };
}

export function getEndingInfo(ending: EndingType): { title: string; description: string; emoji: string } {
  switch (ending) {
    case 'awakened':
      return {
        title: '觉醒离开',
        emoji: '🌟',
        description: '你成功识破了PUA的操控手段，果断地保护了自己。你的警觉和独立让你避免了一段有害的关系。',
      };
    case 'hesitant':
      return {
        title: '认清但心软',
        emoji: '🌤️',
        description: '你隐约感觉到了不对劲，但感情的羁绊让你难以决断。你看清了一些真相，但代价不小。',
      };
    case 'trapped':
      return {
        title: '深陷其中',
        emoji: '🌧️',
        description: '你渐渐失去了自我判断力，被操控而不自知。你的社交圈在缩小，经济也受到了影响。',
      };
    case 'controlled':
      return {
        title: '完全被控制',
        emoji: '⛈️',
        description: '你已经完全被PUA操控，失去了朋友、金钱和独立思考能力。这是最糟糕的结局，但认识到这些手段永远不晚。',
      };
  }
}

// Calculate story progress as percentage
export function getProgress(state: GameState, story: Story): number {
  const totalNodes = Object.keys(story.nodes).length;
  const visitedNodes = new Set(state.history.map(() => state.currentNodeId));
  // Rough estimate based on history length vs total possible
  const msgCount = state.history.length;
  const estimatedTotal = totalNodes * 2; // avg ~2 messages per node interaction
  return Math.min(100, Math.round((msgCount / estimatedTotal) * 100));
}
