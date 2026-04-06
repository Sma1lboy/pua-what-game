'use client';

import { Choice } from '@/types/chat';
import { Button } from '@/components/ui/button';

interface ChoicePanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export default function ChoicePanel({ choices, onSelect }: ChoicePanelProps) {
  if (choices.length === 0) return null;

  return (
    <div className="animate-slideUp bg-gradient-to-t from-[#ededed] to-[#ededed]/95 border-t border-border/50 px-4 py-3 space-y-2">
      <p
        className="text-xs text-muted-foreground text-center mb-2"
        style={{
          fontFamily:
            '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        选择你的回复
      </p>
      {choices.map((choice) => (
        <Button
          key={choice.id}
          variant="outline"
          onClick={() => onSelect(choice)}
          className="w-full rounded-full text-[14px] h-auto py-2.5 font-normal bg-white hover:bg-muted/50 active:scale-[0.98] transition-all duration-150"
          style={{
            fontFamily:
              '"PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {choice.text}
        </Button>
      ))}
    </div>
  );
}
