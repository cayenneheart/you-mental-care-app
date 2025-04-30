
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { smile, meh, frown } from "lucide-react";

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
    { level: 5 as MoodLevel, icon: smile, label: "とても良い", color: "text-green-500" },
    { level: 4 as MoodLevel, icon: smile, label: "良い", color: "text-emerald-400" },
    { level: 3 as MoodLevel, icon: meh, label: "普通", color: "text-yellow-400" },
    { level: 2 as MoodLevel, icon: frown, label: "悪い", color: "text-orange-400" },
    { level: 1 as MoodLevel, icon: frown, label: "とても悪い", color: "text-red-500" }
  ];

  return (
    <div className={cn("flex flex-col items-center space-y-8", className)}>
      <h2 className="text-xl font-medium">今の気分はどうですか？</h2>
      
      <div className="emotion-rating">
        {moods.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.level}
              onClick={() => handleSelect(mood.level)}
              className={cn(
                "emotion-option",
                mood.color,
                selectedMood === mood.level && "selected"
              )}
              aria-label={mood.label}
              title={mood.label}
            >
              <Icon 
                size={48} 
                className={cn(
                  "transition-transform",
                  selectedMood === mood.level && "scale-110"
                )} 
              />
              <div className="text-xs mt-1">{mood.label}</div>
            </button>
          );
        })}
      </div>
      
      <Button
        onClick={onSubmit}
        disabled={selectedMood === null}
        className="w-full max-w-xs"
      >
        送信
      </Button>
    </div>
  );
};

export default MoodSelector;
