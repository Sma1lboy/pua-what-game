'use client';

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
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-900 font-medium">{value}{suffix}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
    <div className="w-72 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6 h-fit max-h-[844px] overflow-y-auto scrollbar-hide"
      style={{ fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Title */}
      <div>
        <h2 className="text-gray-900 font-bold text-lg">状态面板</h2>
        <p className="text-gray-400 text-xs mt-1">实时追踪你的处境</p>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">故事进度</span>
          <span className="text-gray-900 font-medium">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 bg-gray-900"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stat bars */}
      <div className="space-y-3">
        <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">四维状态</h3>
        <StatBar label="❤️ 好感度" value={stats.affection} max={100} color="bg-pink-500" />
        <StatBar label="👁️ 警觉度" value={stats.alertness} max={100} color="bg-amber-500" />
        <StatBar label="💰 金钱" value={stats.money} max={10000} color="bg-emerald-500" suffix="元" />
        <StatBar label="👥 社交圈" value={stats.socialCircle} max={100} color="bg-blue-500" />
      </div>

      {/* Encountered tactics */}
      <div className="space-y-2">
        <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
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
                className={`rounded-xl px-3 py-2 text-xs transition-all duration-300 ${
                  encountered
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={encountered ? 'text-red-500' : 'text-gray-300'}>
                    {encountered ? '⚠️' : '🔒'}
                  </span>
                  <span className={encountered ? 'text-red-600 font-medium' : 'text-gray-400'}>
                    {tactic.name}
                  </span>
                </div>
                {encountered && detail && (
                  <p className="text-gray-500 mt-1 leading-relaxed text-[11px]">
                    {tactic.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
