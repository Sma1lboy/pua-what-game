'use client';

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-3 animate-fadeIn">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-[6px] bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm">
        她
      </div>

      {/* Bubble with dots */}
      <div className="bg-white rounded-[18px] rounded-bl-[4px] px-4 py-3 flex items-center gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot [animation-delay:0.2s]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
