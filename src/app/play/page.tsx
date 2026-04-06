'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, BookOpen, Home } from 'lucide-react';
import PhoneMockup from '@/components/chat/PhoneMockup';
import ChatScreen from '@/components/chat/ChatScreen';
import ScoreSidebar from '@/components/ScoreSidebar';
import fullStory from '@/data/full-story';
import { GameStats, EncounteredTactic, GameState, PUA_TACTICS, Story } from '@/types/chat';
import { getEndingInfo } from '@/lib/game-engine';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const endingColors: Record<string, string> = {
  awakened: 'text-green-600',
  hesitant: 'text-yellow-600',
  trapped: 'text-orange-600',
  controlled: 'text-red-600',
};

function StatBarFinal({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-medium">{value}{max > 100 ? '元' : ''}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
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
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 gap-6"
      style={{ fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          PUA - 你说什么
        </h1>
        <p className="text-muted-foreground text-sm">
          识别操控，保护自己 — 一款PUA觉醒互动游戏
        </p>
      </div>

      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSidebar(!showSidebar)}
        className="lg:hidden rounded-full"
      >
        {showSidebar ? '隐藏状态面板' : '查看状态面板'}
      </Button>

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

      {/* End Game Dialog */}
      <Dialog open={!!endState && !!endingInfo}>
        <DialogContent showCloseButton={false} className="max-w-md p-6 gap-5 rounded-2xl">
          {endingInfo && endState && (
            <>
              <DialogHeader className="items-center text-center">
                <div className="text-5xl mb-1">{endingInfo.emoji}</div>
                <DialogTitle className={`text-xl font-bold ${endingColors[endState.ending!]}`}>
                  {endingInfo.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                  {endingInfo.description}
                </DialogDescription>
              </DialogHeader>

              <Separator />

              {/* Final stats */}
              <div className="space-y-3">
                <h3 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">最终状态</h3>
                <StatBarFinal label="❤️ 好感度" value={endState.stats.affection} max={100} color="bg-pink-500" />
                <StatBarFinal label="👁️ 警觉度" value={endState.stats.alertness} max={100} color="bg-amber-500" />
                <StatBarFinal label="💰 金钱" value={endState.stats.money} max={10000} color="bg-emerald-500" />
                <StatBarFinal label="👥 社交圈" value={endState.stats.socialCircle} max={100} color="bg-blue-500" />
              </div>

              {/* Encountered tactics */}
              {endState.encounteredTactics.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      识别到的PUA手法 ({endState.encounteredTactics.length}/9)
                    </h3>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-hide">
                      {endState.encounteredTactics.map((t) => (
                        <div key={t.tacticId} className="flex items-start gap-2 text-xs">
                          <span className="text-red-500 shrink-0">⚠️</span>
                          <div>
                            <span className="text-red-600 font-medium">{PUA_TACTICS[t.tacticId].name}</span>
                            <span className="text-muted-foreground ml-1">— {PUA_TACTICS[t.tacticId].description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Action buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <Button onClick={handleRestart} className="w-full rounded-full gap-2">
                  <RotateCcw className="size-4" />
                  重新开始
                </Button>
                <Button variant="outline" className="w-full rounded-full gap-2" render={<Link href="/analysis" />}>
                  <BookOpen className="size-4" />
                  查看PUA手法解析
                </Button>
                <Button variant="ghost" className="w-full rounded-full text-muted-foreground gap-2" render={<Link href="/" />}>
                  <Home className="size-4" />
                  返回主页
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
