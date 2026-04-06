'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import PhoneMockup from '@/components/chat/PhoneMockup';
import ChatScreen from '@/components/chat/ChatScreen';
import ScoreSidebar from '@/components/ScoreSidebar';
import fullStory from '@/data/full-story';
import { GameStats, EncounteredTactic, GameState, PUA_TACTICS, Story } from '@/types/chat';
import { getEndingInfo } from '@/lib/game-engine';

const endingColors: Record<string, string> = {
  awakened: 'text-green-400',
  hesitant: 'text-yellow-400',
  trapped: 'text-orange-400',
  controlled: 'text-red-400',
};

const endingBorderColors: Record<string, string> = {
  awakened: 'border-green-500/50',
  hesitant: 'border-yellow-500/50',
  trapped: 'border-orange-500/50',
  controlled: 'border-red-500/50',
};

function StatBarFinal({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-medium">{value}{max > 100 ? '元' : ''}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function PlayPage() {
  const [stats, setStats] = useState<GameStats>({
    affection: 50,
    alertness: 50,
    money: 10000,
    socialCircle: 80,
  });
  const [tactics, setTactics] = useState<EncounteredTactic[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [endState, setEndState] = useState<GameState | null>(null);
  const [story, setStory] = useState<Story>(fullStory);
  const [storyKey, setStoryKey] = useState(0);

  useEffect(() => {
    try {
      const customJson = sessionStorage.getItem('custom-story');
      if (customJson) {
        const parsed = JSON.parse(customJson) as Story;
        if (parsed.nodes && parsed.startNodeId && parsed.npcName) {
          setStory(parsed);
          setStoryKey((k) => k + 1);
        }
        sessionStorage.removeItem('custom-story');
      }
    } catch {
      // ignore invalid JSON
    }
  }, []);

  const handleStatsChange = useCallback(
    (newStats: GameStats, newTactics: EncounteredTactic[], newProgress: number) => {
      setStats(newStats);
      setTactics(newTactics);
      setProgress(newProgress);
    },
    []
  );

  const handleGameEnd = useCallback((state: GameState) => {
    setEndState(state);
  }, []);

  const handleRestart = () => {
    window.location.reload();
  };

  const endingInfo = endState?.ending ? getEndingInfo(endState.ending) : null;

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-4 py-8 gap-6"
      style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white tracking-wide">
          PUA - 你说什么
        </h1>
        <p className="text-purple-300/80 text-sm">
          识别操控，保护自己 — 一款PUA觉醒互动游戏
        </p>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="lg:hidden text-purple-300 text-sm border border-purple-500/30 rounded-full px-4 py-1.5 hover:bg-purple-500/10 transition-colors"
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
          <ChatScreen
            key={storyKey}
            story={story}
            onStatsChange={handleStatsChange}
            onGameEnd={handleGameEnd}
          />
        </PhoneMockup>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <ScoreSidebar stats={stats} encounteredTactics={tactics} progress={progress} />
        </div>
      </div>

      {/* End Game Modal */}
      {endState && endingInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`bg-gray-900 border ${endingBorderColors[endState.ending!]} rounded-2xl p-8 max-w-md w-full mx-4 space-y-6 animate-slideUp`}
          >
            {/* Ending header */}
            <div className="text-center space-y-2">
              <div className="text-5xl">{endingInfo.emoji}</div>
              <h2 className={`text-2xl font-bold ${endingColors[endState.ending!]}`}>
                {endingInfo.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {endingInfo.description}
              </p>
            </div>

            {/* Final stats */}
            <div className="space-y-3">
              <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">最终状态</h3>
              <StatBarFinal label="❤️ 好感度" value={endState.stats.affection} max={100} color="bg-pink-500" />
              <StatBarFinal label="👁️ 警觉度" value={endState.stats.alertness} max={100} color="bg-amber-500" />
              <StatBarFinal label="💰 金钱" value={endState.stats.money} max={10000} color="bg-emerald-500" />
              <StatBarFinal label="👥 社交圈" value={endState.stats.socialCircle} max={100} color="bg-blue-500" />
            </div>

            {/* Encountered tactics */}
            {endState.encounteredTactics.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  识别到的PUA手法 ({endState.encounteredTactics.length}/9)
                </h3>
                <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-hide">
                  {endState.encounteredTactics.map((t) => (
                    <div key={t.tacticId} className="flex items-start gap-2 text-xs">
                      <span className="text-red-400 shrink-0">⚠️</span>
                      <div>
                        <span className="text-red-300 font-medium">{PUA_TACTICS[t.tacticId].name}</span>
                        <span className="text-gray-500 ml-1">— {PUA_TACTICS[t.tacticId].description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleRestart}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-colors"
              >
                重新开始
              </button>
              <Link
                href="/analysis"
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-purple-200 font-medium rounded-xl transition-colors text-center border border-purple-500/30"
              >
                查看PUA手法解析
              </Link>
              <Link
                href="/"
                className="w-full py-2.5 text-gray-400 hover:text-gray-300 text-sm text-center transition-colors"
              >
                返回主页
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
