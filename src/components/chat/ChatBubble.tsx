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
      className={`flex items-end gap-2 px-3 animate-fadeIn ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      {!isUser && showAvatar ? (
        <div className="w-10 h-10 rounded-[6px] bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm">
          她
        </div>
      ) : !isUser ? (
        <div className="w-10 flex-shrink-0" />
      ) : null}

      {/* Bubble */}
      <div className="relative max-w-[70%]">
        <div
          className={`relative px-3 py-2.5 text-[15px] leading-relaxed break-words ${
            isUser
              ? 'bg-[#95EC69] text-black rounded-[18px] rounded-br-[4px]'
              : 'bg-white text-black rounded-[18px] rounded-bl-[4px]'
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
