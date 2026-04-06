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
      className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-4 py-16"
      style={{ fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Hero */}
      <div className="text-center space-y-4 mb-12 animate-fadeIn">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          PUA话术识别
        </h1>
        <p className="text-lg text-gray-500">聊天模拟器</p>
        <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm text-gray-500 leading-relaxed shadow-sm">
          本游戏剧情纯属娱乐，请勿代入剧情，所有名称和剧情都是虚构。你将扮演纯情男大/女大，通过选择回复消息来体验剧情。
          <span className="block mt-2 text-gray-400 text-xs">--BY ARKSEC.NET</span>
        </div>
      </div>

      {/* Bento feature grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mb-12 animate-slideUp">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-gray-200 rounded-2xl p-5 text-center hover:shadow-md hover:border-gray-300 transition-all duration-300"
          >
            <div className="text-3xl mb-2">{f.emoji}</div>
            <div className="text-gray-900 font-medium text-sm mb-1">{f.title}</div>
            <div className="text-gray-400 text-xs leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 animate-slideUp">
        <Link
          href="/play"
          className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full text-center transition-colors shadow-sm"
        >
          开始游戏
        </Link>
        <Link
          href="/analysis"
          className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full text-center transition-colors border border-gray-200 shadow-sm"
        >
          查看PUA手法解析
        </Link>
        <Link
          href="/generator"
          className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full text-center transition-colors border border-gray-200 shadow-sm"
        >
          LLM一键生成剧情
        </Link>
      </div>
    </main>
  );
}
