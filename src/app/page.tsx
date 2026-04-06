'use client';

import Link from 'next/link';

const features = [
  { emoji: '🎭', title: '多重剧情', desc: '33个故事节点，多条分支路线' },
  { emoji: '💬', title: '随机邂逅', desc: '沉浸式微信聊天体验' },
  { emoji: '🔍', title: '话术识别', desc: '识别9种常见PUA操控手法' },
  { emoji: '🧠', title: '熟能生巧', desc: '反复练习提升识别能力' },
  { emoji: '🎬', title: '多种结局', desc: '4种结局取决于你的选择' },
  { emoji: '🎯', title: '随心走向', desc: '每个选择都影响故事发展' },
];

export default function Home() {
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-4 py-12"
      style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Hero */}
      <div className="text-center space-y-4 mb-10 animate-fadeIn">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          PUA话术识别
        </h1>
        <p className="text-xl text-purple-300">聊天模拟器</p>
        <div className="max-w-lg mx-auto bg-white/5 border border-purple-500/20 rounded-xl px-6 py-4 text-sm text-gray-400 leading-relaxed">
          本游戏剧情纯属娱乐，请勿代入剧情，所有名称和剧情都是虚构。你将扮演纯情男大/女大，通过选择回复消息来体验剧情。
          <span className="block mt-2 text-purple-400/60 text-xs">--BY ARKSEC.NET</span>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mb-10 animate-slideUp">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white/5 border border-purple-500/20 rounded-xl p-4 text-center hover:bg-white/10 hover:border-purple-400/40 transition-all duration-300"
          >
            <div className="text-3xl mb-2">{f.emoji}</div>
            <div className="text-white font-medium text-sm mb-1">{f.title}</div>
            <div className="text-gray-400 text-xs leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-slideUp">
        <Link
          href="/play"
          className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-center transition-colors shadow-lg shadow-purple-900/50"
        >
          开始游戏
        </Link>
        <Link
          href="/analysis"
          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-purple-200 font-medium rounded-xl text-center transition-colors border border-purple-500/30"
        >
          查看PUA手法解析
        </Link>
        <Link
          href="/generator"
          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-purple-200 font-medium rounded-xl text-center transition-colors border border-purple-500/30"
        >
          LLM一键生成剧情
        </Link>
      </div>
    </main>
  );
}
