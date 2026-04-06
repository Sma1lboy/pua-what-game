'use client';

import { useState, useCallback } from 'react';
import PhoneMockup from '@/components/chat/PhoneMockup';
import ChatScreen from '@/components/chat/ChatScreen';
import ScoreSidebar from '@/components/ScoreSidebar';
import fullStory from '@/data/full-story';
import { GameStats, EncounteredTactic } from '@/types/chat';

export default function Home() {
  const [stats, setStats] = useState<GameStats>({
    affection: 50,
    alertness: 50,
    money: 10000,
    socialCircle: 80,
  });
  const [tactics, setTactics] = useState<EncounteredTactic[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleStatsChange = useCallback(
    (newStats: GameStats, newTactics: EncounteredTactic[], newProgress: number) => {
      setStats(newStats);
      setTactics(newTactics);
      setProgress(newProgress);
    },
    []
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-4 py-8 gap-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1
          className="text-4xl font-bold text-white tracking-wide"
          style={{
            fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          PUA - 你说什么
        </h1>
        <p
          className="text-purple-300/80 text-sm"
          style={{
            fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          识别操控，保护自己 — 一款PUA觉醒互动游戏
        </p>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="lg:hidden text-purple-300 text-sm border border-purple-500/30 rounded-full px-4 py-1.5 hover:bg-purple-500/10 transition-colors"
        style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
      >
        {showSidebar ? '隐藏状态面板' : '查看状态面板'}
      </button>

      {/* Layout: Phone + Sidebar */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
        {/* Mobile sidebar (above phone) */}
        {showSidebar && (
          <div className="lg:hidden w-full max-w-[390px]">
            <ScoreSidebar stats={stats} encounteredTactics={tactics} progress={progress} />
          </div>
        )}

        {/* Phone with chat */}
        <PhoneMockup>
          <ChatScreen story={fullStory} onStatsChange={handleStatsChange} />
        </PhoneMockup>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <ScoreSidebar stats={stats} encounteredTactics={tactics} progress={progress} />
        </div>
      </div>
    </main>
  );
}
