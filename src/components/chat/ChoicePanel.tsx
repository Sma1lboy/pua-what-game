'use client';

import { Choice } from '@/types/chat';

interface ChoicePanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export default function ChoicePanel({ choices, onSelect }: ChoicePanelProps) {
  if (choices.length === 0) return null;

  return (
    <div className="animate-slideUp bg-gradient-to-t from-[#ededed] to-[#ededed]/95 border-t border-gray-300/50 px-4 py-3 space-y-2">
      <p
        className="text-xs text-gray-500 text-center mb-2"
        style={{
          fontFamily:
            '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        选择你的回复
      </p>
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice)}
          className="w-full px-4 py-2.5 bg-white rounded-full text-[14px] text-gray-800
                     shadow-sm border border-gray-200/80
                     active:scale-[0.98] active:bg-gray-50
                     transition-all duration-150"
          style={{
            fontFamily:
              '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
