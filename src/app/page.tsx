'use client';

import PhoneMockup from '@/components/chat/PhoneMockup';
import ChatScreen from '@/components/chat/ChatScreen';
import demoStory from '@/data/demo-story';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-4 py-8 gap-8">
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
          选择正确的回答，赢得好感
        </p>
      </div>

      {/* Phone with chat */}
      <PhoneMockup>
        <ChatScreen story={demoStory} />
      </PhoneMockup>
    </main>
  );
}
