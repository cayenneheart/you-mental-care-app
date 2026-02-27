
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Smile, Meh, Frown } from "lucide-react";

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

interface MoodSelectorProps {
  onSelect: (level: MoodLevel) => void;
  onSubmit: () => void;
  className?: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  onSelect,
  onSubmit,
  className
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);

  const handleSelect = (level: MoodLevel) => {
    setSelectedMood(level);
    onSelect(level);
  };

  const moods = [
    { level: 5 as MoodLevel, icon: Smile, label: "とても良い", color: "text-teal-600/70" },
    { level: 4 as MoodLevel, icon: Smile, label: "良い", color: "text-emerald-600/60" },
    { level: 3 as MoodLevel, icon: Meh, label: "いつも通り", color: "text-amber-600/60" },
    { level: 2 as MoodLevel, icon: Frown, label: "少し疲れた", color: "text-orange-500/60" },
    { level: 1 as MoodLevel, icon: Frown, label: "ストレス", color: "text-rose-500/60" }
  ];

  return (
    <div className={cn("flex flex-col items-center space-y-10 w-full", className)}>
      <h2 className="text-lg md:text-xl font-normal text-slate-600 tracking-wide">本日のコンディションはいかがですか？</h2>

      <div className="emotion-rating">
        {moods.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.level}
              onClick={() => handleSelect(mood.level)}
              className={cn(
                "emotion-option flex flex-col items-center p-4 rounded-3xl transition-all duration-700 ease-out",
                mood.color,
                selectedMood === mood.level ? "bg-white/60 shadow-sm transform -translate-y-2" : "hover:bg-white/40"
              )}
              aria-label={mood.label}
              title={mood.label}
            >
              <Icon
                size={52}
                strokeWidth={1.5}
                className={cn(
                  "transition-all duration-1000",
                  selectedMood === mood.level ? "scale-105" : "opacity-80"
                )}
              />
              <div className="text-xs font-light mt-3 tracking-wider">{mood.label}</div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={onSubmit}
        disabled={selectedMood === null}
        className="w-full max-w-xs mt-8 rounded-full py-6 text-base tracking-widest font-light shadow-none bg-slate-700/90 text-white hover:bg-slate-800 transition-all duration-500"
      >
        記録を送信する
      </Button>
    </div>
  );
};

export default MoodSelector;
