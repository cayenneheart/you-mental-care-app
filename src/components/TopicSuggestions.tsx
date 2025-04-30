
import React from 'react';
import { Button } from "@/components/ui/button";

interface TopicSuggestionsProps {
  onSelectTopic: (topic: string) => void;
  className?: string;
}

const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({ onSelectTopic, className }) => {
  const topics = [
    { id: 'work', label: '仕事・キャリアの悩み' },
    { id: 'relationships', label: '人間関係（恋愛・家族）' },
    { id: 'feelings', label: 'モヤモヤした気持ち' },
    { id: 'trends', label: '最近のトレンドや音楽' }
  ];
  
  return (
    <div className={`p-3 bg-background rounded-lg shadow-sm border ${className}`}>
      <p className="text-sm mb-2 text-muted-foreground">よく話されるトピック:</p>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Button 
            key={topic.id}
            variant="outline" 
            size="sm"
            className="bg-blue-50 border-blue-100 hover:bg-blue-100 text-blue-700"
            onClick={() => onSelectTopic(topic.label)}
          >
            {topic.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopicSuggestions;
