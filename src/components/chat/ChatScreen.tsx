'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Choice, Story, GameState, DialogNode } from '@/types/chat';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import ChoicePanel from './ChoicePanel';

interface ChatScreenProps {
  story: Story;
}

export default function ChatScreen({ story }: ChatScreenProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentNodeId: story.startNodeId,
    score: 0,
    mood: 50,
    history: [],
  });
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const currentNode: DialogNode | undefined = story.nodes[gameState.currentNodeId];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages, isTyping, scrollToBottom]);

  // Play through NPC messages for the current node
  const playNodeMessages = useCallback(
    (node: DialogNode, existingHistory: Message[]) => {
      const npcMessages = node.messages.filter((m) => m.sender === 'npc');
      let delay = 400;

      npcMessages.forEach((msg, index) => {
        // Show typing
        setTimeout(() => {
          setIsTyping(true);
        }, delay);

        // Show message
        delay += 800 + msg.content.length * 40;
        const currentDelay = delay;

        setTimeout(() => {
          setIsTyping(false);
          const newMsg = { ...msg, id: `${msg.id}-${Date.now()}`, timestamp: Date.now() };
          setDisplayedMessages((prev) => [...prev, newMsg]);
          setGameState((prev) => ({
            ...prev,
            history: [...prev.history, newMsg],
          }));

          // After last NPC message, show choices or auto-advance
          if (index === npcMessages.length - 1) {
            setTimeout(() => {
              if (node.choices.length > 0) {
                setShowChoices(true);
              } else if (node.nextNodeId) {
                // Auto-advance to next node
                const nextNode = story.nodes[node.nextNodeId];
                if (nextNode) {
                  setGameState((prev) => ({
                    ...prev,
                    currentNodeId: node.nextNodeId!,
                  }));
                  playNodeMessages(nextNode, [
                    ...existingHistory,
                    ...npcMessages.map((m) => ({
                      ...m,
                      id: `${m.id}-${Date.now()}`,
                      timestamp: Date.now(),
                    })),
                  ]);
                }
              } else {
                setIsEnded(true);
              }
            }, 500);
          }
        }, currentDelay);

        delay += 200;
      });
    },
    [story.nodes]
  );

  // Start the story
  useEffect(() => {
    if (hasStarted.current || !currentNode) return;
    hasStarted.current = true;
    playNodeMessages(currentNode, []);
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
    setGameState((prev) => ({
      ...prev,
      currentNodeId: choice.nextNodeId,
      score: prev.score + (choice.effect?.score ?? 0),
      mood: Math.max(0, Math.min(100, prev.mood + (choice.effect?.mood ?? 0))),
      history: [...prev.history, userMsg],
    }));

    // Play next node
    const nextNode = story.nodes[choice.nextNodeId];
    if (nextNode) {
      setTimeout(() => {
        playNodeMessages(nextNode, [...gameState.history, userMsg]);
      }, 600);
    }
  };

  const getEndingLabel = (): string => {
    if (gameState.score >= 30) return '🎉 完美结局';
    if (gameState.score >= 10) return '😊 不错的开始';
    if (gameState.score >= 0) return '😐 普通结局';
    return '💔 社死现场';
  };

  return (
    <div className="flex flex-col h-full bg-[#ededed]">
      {/* WeChat header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#ededed] border-b border-gray-300/50">
        <button className="text-gray-700 p-1">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          className="text-[17px] font-medium text-gray-900"
          style={{
            fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          小雨
        </span>
        <button className="text-gray-700 p-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="4" cy="10" r="1.5" fill="currentColor" />
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            <circle cx="16" cy="10" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-1 py-3 space-y-3 scrollbar-hide">
        {/* Time header */}
        <div className="text-center">
          <span
            className="text-[11px] text-gray-500 bg-gray-300/50 px-2 py-0.5 rounded"
            style={{
              fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
            }}
          >
            下午 2:30
          </span>
        </div>

        {displayedMessages.map((msg, index) => {
          const prevMsg = index > 0 ? displayedMessages[index - 1] : null;
          const showAvatar = !prevMsg || prevMsg.sender !== msg.sender;
          return <ChatBubble key={msg.id} message={msg} showAvatar={showAvatar} />;
        })}

        {isTyping && <TypingIndicator />}

        {isEnded && (
          <div className="text-center py-4 animate-fadeIn">
            <div
              className="inline-block bg-white/80 rounded-xl px-5 py-3 shadow-sm"
              style={{
                fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
              }}
            >
              <p className="text-lg mb-1">{getEndingLabel()}</p>
              <p className="text-xs text-gray-500">
                得分: {gameState.score} | 好感度: {gameState.mood}
              </p>
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
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f6f6f6] border-t border-gray-300/50">
          <button className="text-gray-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 9.5a1 1 0 112 0 1 1 0 01-2 0zM14 9.5a1 1 0 112 0 1 1 0 01-2 0z" fill="currentColor" />
              <path d="M8.5 14s1.5 2 3.5 2 3.5-2 3.5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex-1 bg-white rounded-md h-9 border border-gray-200" />
          <button className="text-gray-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
