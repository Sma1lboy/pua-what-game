'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TacticDetail {
  id: string;
  emoji: string;
  nameCn: string;
  nameEn: string;
  definition: string;
  example: string;
  howToIdentify: string;
  howToRespond: string;
}

const tactics: TacticDetail[] = [
  {
    id: 'future-faking',
    emoji: '🎪',
    nameCn: '画饼承诺',
    nameEn: 'Future Faking',
    definition: '通过描绘美好的未来承诺来建立虚假期待，但这些承诺永远不会兑现',
    example: '"等我升职了就带你去马尔代夫""以后我们一起开公司"——但从不付诸行动',
    howToIdentify: '注意是否只有口头承诺却没有实际行动；承诺是否一再推迟',
    howToRespond: '关注行动而非言语；设定合理期限验证承诺；如果反复落空，重新评估关系',
  },
  {
    id: 'hot-and-cold',
    emoji: '🌡️',
    nameCn: '忽冷忽热',
    nameEn: 'Hot and Cold',
    definition: '交替表现出热情和冷淡，让对方情绪像过山车一样波动，从而产生依赖',
    example: '昨天还说"你是我最重要的人"，今天突然不回消息，过几天又嘘寒问暖',
    howToIdentify: '对方的热情和冷漠没有合理原因；你开始害怕"失去"这种感觉',
    howToRespond: '认识到这是一种控制手段；不要因为对方的热情期而忽略冷漠期的伤害',
  },
  {
    id: 'intermittent-reinforcement',
    emoji: '🎰',
    nameCn: '间歇强化',
    nameEn: 'Intermittent Reinforcement',
    definition: '不规律地给予关心和奖励，制造类似赌博的心理依赖',
    example: '偶尔的甜言蜜语和礼物让你期待下一次，大部分时间却被忽视',
    howToIdentify: '你发现自己不断期待下一次"好的时候"；幸福感来源变得不稳定',
    howToRespond: '建立稳定的自我价值感；健康关系应该是持续温暖的，而不是偶尔的惊喜',
  },
  {
    id: 'triangulation',
    emoji: '📐',
    nameCn: '三角测量',
    nameEn: 'Triangulation',
    definition: '引入第三者（真实或虚构的）来制造竞争感和不安全感',
    example: '"我同事小美今天又给我带了咖啡""我前任从来不会这样"',
    howToIdentify: '对方频繁提起异性朋友或前任；你开始感到需要"竞争"',
    howToRespond: '明确表达你的底线；健康关系不需要通过嫉妒来维系',
  },
  {
    id: 'gaslighting',
    emoji: '🔥',
    nameCn: '煤气灯效应',
    nameEn: 'Gaslighting',
    definition: '否定对方的感受和记忆，让对方怀疑自己的判断力',
    example: '"我没说过这话，你记错了""你太敏感了，这有什么好生气的"',
    howToIdentify: '你开始频繁怀疑自己的记忆和感受；总觉得是自己的问题',
    howToRespond: '信任自己的感受；保留证据（如聊天记录）；寻求第三方意见',
  },
  {
    id: 'guilt-tripping',
    emoji: '😢',
    nameCn: '内疚操控',
    nameEn: 'Guilt Tripping',
    definition: '通过放大对方的失误或夸大自己的付出来让对方产生内疚感',
    example: '"我为你做了这么多，你就是这样对我的？""要不是为了你我早就…"',
    howToIdentify: '你总觉得"欠"对方的；犯了小错却要做出大补偿',
    howToRespond: '区分合理的歉意和被利用的内疚；不要因为内疚而放弃自己的底线',
  },
  {
    id: 'isolation',
    emoji: '🏝️',
    nameCn: '孤立控制',
    nameEn: 'Isolation',
    definition: '逐渐让对方疏远朋友和家人，使其失去外部支持系统',
    example: '"你那个朋友对你不好，少跟她来往""你怎么又要出去？在家陪我不好吗"',
    howToIdentify: '社交圈在缩小；对方对你的朋友总是有负面评价',
    howToRespond: '坚持维护自己的社交关系；健康的伴侣会支持你的友谊',
  },
  {
    id: 'financial-exploitation',
    emoji: '💸',
    nameCn: '金钱榨取',
    nameEn: 'Financial Exploitation',
    definition: '以各种理由频繁借钱或让对方承担不合理的经济负担',
    example: '"宝贝借我点钱周转一下""你不是爱我吗，这点忙都不帮？"',
    howToIdentify: '借钱频率增加且从不归还；用感情绑架来要求经济支持',
    howToRespond: '设立经济底线；爱情不等于无条件的经济支持',
  },
  {
    id: 'fake-breakup',
    emoji: '💔',
    nameCn: '假意抽离',
    nameEn: 'Fake Breakup',
    definition: '用"分手""退回做朋友"等威胁来试探和打压对方的底线',
    example: '"我觉得我们不合适，还是做朋友吧"——但等你哭着挽留后又恢复如常',
    howToIdentify: '对方反复提分手但从不真正离开；分手成了控制你的工具',
    howToRespond: '认真对待每一次分手提议；不要让对方用分手来要挟你',
  },
];

function TacticCard({ tactic }: { tactic: TacticDetail }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white/5 border border-purple-500/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-400/40 ${
        expanded ? 'bg-white/8' : ''
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        <span className="text-2xl shrink-0">{tactic.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold">{tactic.nameCn}</span>
            <span className="text-purple-400/70 text-sm">{tactic.nameEn}</span>
          </div>
          <p className="text-gray-400 text-xs mt-0.5 truncate">{tactic.definition}</p>
        </div>
        <span className={`text-purple-400 transition-transform duration-300 shrink-0 ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 animate-fadeIn">
          <div className="h-px bg-purple-500/20" />

          <div className="space-y-3">
            <div>
              <h4 className="text-purple-300 text-xs font-medium uppercase tracking-wider mb-1">定义</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{tactic.definition}</p>
            </div>

            <div>
              <h4 className="text-purple-300 text-xs font-medium uppercase tracking-wider mb-1">例子</h4>
              <p className="text-gray-300 text-sm leading-relaxed bg-white/5 rounded-lg px-3 py-2 border-l-2 border-purple-500/50">
                {tactic.example}
              </p>
            </div>

            <div>
              <h4 className="text-amber-300 text-xs font-medium uppercase tracking-wider mb-1">🔍 如何识别</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{tactic.howToIdentify}</p>
            </div>

            <div>
              <h4 className="text-green-300 text-xs font-medium uppercase tracking-wider mb-1">🛡️ 如何应对</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{tactic.howToRespond}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12"
      style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm mb-8 transition-colors"
        >
          ← 返回主页
        </Link>

        {/* Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-3xl font-bold text-white mb-3">PUA手法解析</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            了解常见的9种PUA操控手法，学会识别和应对，保护自己和身边的人
          </p>
        </div>

        {/* Tactic cards */}
        <div className="space-y-3 animate-slideUp">
          {tactics.map((tactic) => (
            <TacticCard key={tactic.id} tactic={tactic} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 space-y-3">
          <Link
            href="/play"
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-purple-900/50"
          >
            开始游戏，实战练习
          </Link>
          <p className="text-gray-500 text-xs">通过互动游戏体验，更深刻地理解这些操控手法</p>
        </div>
      </div>
    </main>
  );
}
