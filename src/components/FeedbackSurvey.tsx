
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FeedbackSurveyProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const FeedbackSurvey: React.FC<FeedbackSurveyProps> = ({ 
  isOpen, 
  onClose, 
  className 
}) => {
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async () => {
    if (npsScore === null) return;
    
    setIsSubmitting(true);
    
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "ありがとうございます！",
        description: "フィードバックを送信しました。",
        duration: 3000,
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "エラーが発生しました",
        description: "フィードバックの送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className={cn(className)}>
        <DrawerHeader>
          <DrawerTitle>フィードバックにご協力ください</DrawerTitle>
          <DrawerDescription>
            サービスの改善に役立てるため、簡単なアンケートにお答えください。
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 space-y-6">
          {/* NPS Score */}
          <div className="space-y-2">
            <label className="block font-medium">
              このサービスを友人や同僚に勧める可能性はどのくらいですか？
            </label>
            <div className="flex justify-between">
              {Array.from({ length: 11 }, (_, i) => i).map((num) => (
                <button
                  key={num}
                  className={cn(
                    "w-8 h-8 rounded-full font-medium text-sm",
                    npsScore === num
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                  onClick={() => setNpsScore(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>全く勧めない</span>
              <span>非常に勧める</span>
            </div>
          </div>
          
          {/* 5-star Rating */}
          <div className="space-y-2">
            <label className="block font-medium">
              今回の対応の満足度を教えてください
            </label>
            <div className="flex justify-center space-x-4">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={cn(
                    "w-10 h-10 text-2xl",
                    rating === num ? "text-yellow-400" : "text-muted hover:text-yellow-400"
                  )}
                  onClick={() => setRating(num)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="feedback-comment" className="block font-medium">
              その他のフィードバック（140字以内）
            </label>
            <Textarea
              id="feedback-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 140))}
              placeholder="ご意見やご感想をお聞かせください..."
              className="resize-none"
              maxLength={140}
            />
            <div className="text-xs text-right text-muted-foreground">
              {comment.length}/140
            </div>
          </div>
        </div>
        
        <DrawerFooter>
          <Button 
            onClick={handleSubmit} 
            disabled={npsScore === null || isSubmitting}
          >
            {isSubmitting ? '送信中...' : '送信'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FeedbackSurvey;
