
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
    { level: 5 as MoodLevel, icon: Smile, label: "とても良い", color: "text-emerald-500" },
    { level: 4 as MoodLevel, icon: Smile, label: "良い", color: "text-emerald-400" },
    { level: 3 as MoodLevel, icon: Meh, label: "いつも通り", color: "text-amber-500" },
    { level: 2 as MoodLevel, icon: Frown, label: "少し疲れた", color: "text-orange-500" },
    { level: 1 as MoodLevel, icon: Frown, label: "ストレス", color: "text-destructive" }
  ];

  return (
    <div className={cn("flex flex-col items-center space-y-10 w-full", className)}>
      <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">本日のコンディションはいかがですか？</h2>

      <div className="emotion-rating">
        {moods.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.level}
              onClick={() => handleSelect(mood.level)}
              className={cn(
                "emotion-option flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 ease-out border-2",
                selectedMood === mood.level
                  ? "bg-primary/5 border-primary shadow-md transform -translate-y-1"
                  : "bg-card border-transparent shadow-sm hover:border-border hover:bg-accent hover:text-accent-foreground opacity-80 hover:opacity-100"
              )}
              aria-label={mood.label}
              title={mood.label}
            >
              <Icon
                size={52}
                strokeWidth={1.5}
                className={cn(
                  "transition-all duration-300",
                  mood.color,
                  selectedMood === mood.level ? "scale-110" : "scale-100"
                )}
              />
              <div className={cn("text-sm font-medium mt-4 tracking-wide transition-colors duration-300", selectedMood === mood.level ? "text-primary" : "text-muted-foreground")}>
                {mood.label}
              </div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={onSubmit}
        disabled={selectedMood === null}
        className={cn(
          "w-full max-w-md mt-10 rounded-full h-14 text-lg font-semibold shadow-lg transition-all duration-300",
          selectedMood === null
            ? "bg-muted text-muted-foreground shadow-none"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        記録を送信する
      </Button>
    </div>
  );
};

export default MoodSelector;
