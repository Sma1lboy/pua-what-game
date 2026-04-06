'use client';

import { Shield, ShieldAlert, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GameStats, EncounteredTactic, PUA_TACTICS, PuaTacticId } from '@/types/chat';

interface ScoreSidebarProps {
  stats: GameStats;
  encounteredTactics: EncounteredTactic[];
  progress: number;
}

const ALL_TACTIC_IDS: PuaTacticId[] = [
  'future-faking', 'hot-and-cold', 'intermittent-reinforcement',
  'triangulation', 'gaslighting', 'guilt-tripping',
  'isolation', 'financial-exploitation', 'fake-breakup',
];

function StatBar({ label, value, max, color, suffix }: {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-medium">{value}{suffix}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ScoreSidebar({ stats, encounteredTactics, progress }: ScoreSidebarProps) {
  const encounteredIds = new Set(encounteredTactics.map((t) => t.tacticId));

  return (
    <Card
      className="w-72 h-fit max-h-[844px] overflow-y-auto scrollbar-hide"
      style={{ fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-muted-foreground" />
          <CardTitle>状态面板</CardTitle>
        </div>
        <CardDescription>实时追踪你的处境</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">故事进度</span>
            <span className="text-foreground font-medium">{progress}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 bg-foreground"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Separator />

        {/* Stat bars */}
        <div className="space-y-3">
          <h3 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">四维状态</h3>
          <StatBar label="❤️ 好感度" value={stats.affection} max={100} color="bg-pink-500" />
          <StatBar label="👁️ 警觉度" value={stats.alertness} max={100} color="bg-amber-500" />
          <StatBar label="💰 金钱" value={stats.money} max={10000} color="bg-emerald-500" suffix="元" />
          <StatBar label="👥 社交圈" value={stats.socialCircle} max={100} color="bg-blue-500" />
        </div>

        <Separator />

        {/* Encountered tactics */}
        <div className="space-y-2">
          <h3 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
            PUA手法识别 ({encounteredTactics.length}/9)
          </h3>
          <div className="space-y-1.5">
            {ALL_TACTIC_IDS.map((id) => {
              const tactic = PUA_TACTICS[id];
              const encountered = encounteredIds.has(id);
              const detail = encounteredTactics.find((t) => t.tacticId === id);
              return (
                <div
                  key={id}
                  className={`rounded-lg px-3 py-2 text-xs transition-all duration-300 ${
                    encountered
                      ? 'bg-red-50 ring-1 ring-red-200'
                      : 'bg-muted/50 ring-1 ring-border'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {encountered ? (
                      <ShieldAlert className="size-3.5 text-red-500 shrink-0" />
                    ) : (
                      <Lock className="size-3 text-muted-foreground/50 shrink-0" />
                    )}
                    <span className={encountered ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                      {tactic.name}
                    </span>
                  </div>
                  {encountered && detail && (
                    <p className="text-muted-foreground mt-1 leading-relaxed text-[11px] pl-5.5">
                      {tactic.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
