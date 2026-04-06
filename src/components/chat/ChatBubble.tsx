'use client';

import { Message } from '@/types/chat';

interface ChatBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export default function ChatBubble({ message, showAvatar = true }: ChatBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={`flex items-end gap-2.5 px-3 animate-fadeIn ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      {!isUser && showAvatar ? (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center text-white text-xs font-medium flex-shrink-0 ring-1 ring-border/20">
          她
        </div>
      ) : !isUser ? (
        <div className="w-9 flex-shrink-0" />
      ) : null}

      {/* Bubble */}
      <div className="relative max-w-[70%]">
        <div
          className={`relative px-3.5 py-2.5 text-[15px] leading-relaxed break-words ${
            isUser
              ? 'bg-[#95EC69] text-black rounded-2xl rounded-br-md'
              : 'bg-white text-black rounded-2xl rounded-bl-md ring-1 ring-border/10'
          }`}
          style={{
            fontFamily:
              '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
