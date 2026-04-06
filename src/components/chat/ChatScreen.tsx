'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Choice, Story, GameState, DialogNode, GameStats, EncounteredTactic } from '@/types/chat';
import { createInitialState, applyChoice, getCurrentNode, isEndingNode, finalizeGame, getEndingInfo } from '@/lib/game-engine';
import { ChevronLeft, Ellipsis, Smile, PlusCircle } from 'lucide-react';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import ChoicePanel from './ChoicePanel';

interface ChatScreenProps {
  story: Story;
  onStatsChange?: (stats: GameStats, tactics: EncounteredTactic[], progress: number) => void;
  onGameEnd?: (state: GameState) => void;
}

export default function ChatScreen({ story, onStatsChange, onGameEnd }: ChatScreenProps) {
  const [gameState, setGameState] = useState<GameState>(() => createInitialState(story));
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const nodesMsgCount = useRef(0);

  const currentNode: DialogNode | undefined = getCurrentNode(gameState, story);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages, isTyping, scrollToBottom]);

  // Notify parent of stat changes
  useEffect(() => {
    if (onStatsChange) {
      nodesMsgCount.current += 1;
      const totalNodes = Object.keys(story.nodes).length;
      const progress = Math.min(100, Math.round((nodesMsgCount.current / totalNodes) * 100));
      onStatsChange(gameState.stats, gameState.encounteredTactics, progress);
    }
  }, [gameState.stats, gameState.encounteredTactics, onStatsChange, story.nodes]);

  // Play through NPC messages for the current node
  const playNodeMessages = useCallback(
    (node: DialogNode, addTacticAlert: boolean) => {
      const npcMessages = node.messages.filter((m) => m.sender === 'npc' || m.sender === 'system');

      // If this node has a tactic and we should show it, add alert first
      const allMessages = [...npcMessages];
      if (addTacticAlert && node.tacticId && node.tacticExplanation) {
        allMessages.push({
          id: `tactic-${node.id}-${Date.now()}`,
          sender: 'system',
          content: node.tacticExplanation,
          timestamp: 0,
          type: 'tactic-alert',
        });
      }

      let delay = 400;

      allMessages.forEach((msg, index) => {
        // Show typing for npc messages
        if (msg.sender === 'npc') {
          setTimeout(() => {
            setIsTyping(true);
          }, delay);
          delay += 600 + Math.min(msg.content.length * 30, 1500);
        } else {
          delay += 300;
        }

        const currentDelay = delay;

        setTimeout(() => {
          setIsTyping(false);
          const newMsg = { ...msg, id: `${msg.id}-${Date.now()}`, timestamp: Date.now() };
          setDisplayedMessages((prev) => [...prev, newMsg]);
          setGameState((prev) => ({
            ...prev,
            history: [...prev.history, newMsg],
          }));

          // After last message, show choices or auto-advance or end
          if (index === allMessages.length - 1) {
            setTimeout(() => {
              if (node.choices.length > 0) {
                setShowChoices(true);
              } else if (node.nextNodeId) {
                const nextNode = story.nodes[node.nextNodeId];
                if (nextNode) {
                  setGameState((prev) => ({
                    ...prev,
                    currentNodeId: node.nextNodeId!,
                  }));
                  playNodeMessages(nextNode, true);
                }
              } else {
                // Ending node
                setGameState((prev) => {
                  const finalState = finalizeGame(prev);
                  onGameEnd?.(finalState);
                  return finalState;
                });
                setIsEnded(true);
              }
            }, 500);
          }
        }, currentDelay);

        delay += 200;
      });
    },
    [story.nodes, onGameEnd]
  );

  // Start the story
  useEffect(() => {
    if (hasStarted.current || !currentNode) return;
    hasStarted.current = true;
    playNodeMessages(currentNode, false);
  }, [currentNode, playNodeMessages]);

  const handleChoice = (choice: Choice) => {
    setShowChoices(false);

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: choice.text,
      timestamp: Date.now(),
      type: 'text',
    };

    setDisplayedMessages((prev) => [...prev, userMsg]);

    // Apply choice through engine
    setGameState((prev) => {
      const newState = applyChoice(prev, choice, story);
      return {
        ...newState,
        history: [...prev.history, userMsg],
      };
    });

    // Play next node
    const nextNode = story.nodes[choice.nextNodeId];
    if (nextNode) {
      setTimeout(() => {
        playNodeMessages(nextNode, true);
      }, 600);
    }
  };

  const endingInfo = gameState.ending ? getEndingInfo(gameState.ending) : null;

  return (
    <div className="flex flex-col h-full bg-[#ededed]">
      {/* WeChat header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#ededed] border-b border-border/30">
        <button className="text-foreground/60 p-1 hover:text-foreground/80 transition-colors">
          <ChevronLeft className="size-5" />
        </button>
        <span
          className="text-[17px] font-medium text-foreground"
          style={{
            fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {story.npcName}
        </span>
        <button className="text-foreground/60 p-1 hover:text-foreground/80 transition-colors">
          <Ellipsis className="size-5" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-1 py-3 space-y-3 scrollbar-hide">
        {/* Time header */}
        <div className="text-center">
          <span
            className="text-[11px] text-muted-foreground bg-foreground/5 px-2.5 py-0.5 rounded-full"
            style={{
              fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
            }}
          >
            下午 2:30
          </span>
        </div>

        {displayedMessages.map((msg, index) => {
          if (msg.type === 'tactic-alert') {
            return (
              <div key={msg.id} className="px-3 py-2 animate-fadeIn">
                <div className="bg-amber-50 ring-1 ring-amber-200 rounded-xl px-4 py-3 text-[13px] text-amber-900 leading-relaxed"
                  style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
                >
                  {msg.content}
                </div>
              </div>
            );
          }
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="text-center px-4 py-1 animate-fadeIn">
                <span
                  className="text-[12px] text-gray-500 leading-relaxed"
                  style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
                >
                  {msg.content}
                </span>
              </div>
            );
          }
          const prevMsg = index > 0 ? displayedMessages[index - 1] : null;
          const showAvatar = !prevMsg || prevMsg.sender !== msg.sender;
          return <ChatBubble key={msg.id} message={msg} showAvatar={showAvatar} />;
        })}

        {isTyping && <TypingIndicator />}

        {isEnded && endingInfo && (
          <div className="text-center py-4 animate-fadeIn">
            <div
              className="inline-block bg-white/90 rounded-2xl px-6 py-4 shadow-md"
              style={{
                fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
              }}
            >
              <p className="text-2xl mb-1">{endingInfo.emoji}</p>
              <p className="text-lg font-bold text-gray-900 mb-2">{endingInfo.title}</p>
              <p className="text-xs text-gray-600 leading-relaxed max-w-[260px]">
                {endingInfo.description}
              </p>
              <div className="mt-3 pt-3 border-t border-gray-200 text-[11px] text-gray-400 space-y-1">
                <p>好感度: {gameState.stats.affection} | 警觉度: {gameState.stats.alertness}</p>
                <p>金钱: {gameState.stats.money}元 | 社交圈: {gameState.stats.socialCircle}</p>
                <p>识别PUA手法: {gameState.encounteredTactics.length}/9</p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Choice panel */}
      {showChoices && currentNode && (
        <ChoicePanel choices={currentNode.choices} onSelect={handleChoice} />
      )}

      {/* WeChat input bar (decorative) */}
      {!showChoices && !isEnded && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f6f6f6] border-t border-border/30">
          <button className="text-muted-foreground hover:text-foreground/70 transition-colors">
            <Smile className="size-5" />
          </button>
          <div className="flex-1 bg-white rounded-lg h-9 ring-1 ring-border/50" />
          <button className="text-muted-foreground hover:text-foreground/70 transition-colors">
            <PlusCircle className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
