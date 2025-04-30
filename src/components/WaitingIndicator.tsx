
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface WaitingIndicatorProps {
  waitTime: number;
  onAIHelpRequest: () => void;
  className?: string;
}

const WaitingIndicator: React.FC<WaitingIndicatorProps> = ({
  waitTime,
  onAIHelpRequest,
  className,
}) => {
  const [showAIHelpDialog, setShowAIHelpDialog] = useState(false);
  
  useEffect(() => {
    // Show AI help dialog after waiting for 60 seconds
    if (waitTime >= 60 && !showAIHelpDialog) {
      setShowAIHelpDialog(true);
    }
  }, [waitTime, showAIHelpDialog]);
  
  const formatWaitTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}秒`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}分${remainingSeconds !== 0 ? ` ${remainingSeconds}秒` : ''}`;
  };
  
  return (
    <>
      <div 
        className={cn(
          "bg-secondary p-3 rounded-lg text-center flex flex-col items-center space-y-2", 
          className
        )}
      >
        <p className="font-medium">カウンセラーにつなげています</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="flex space-x-1">
            <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
            <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            <span className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></span>
          </div>
          <span className="font-mono">
            {formatWaitTime(waitTime)}
          </span>
        </div>
      </div>
      
      <Dialog open={showAIHelpDialog} onOpenChange={setShowAIHelpDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AIサポートを試してみますか？</DialogTitle>
            <DialogDescription>
              カウンセラーの応答に時間がかかっています。すぐに話を聞いてほしい場合は、AIセルフヘルプを試すことができます。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button 
              variant="secondary" 
              onClick={() => setShowAIHelpDialog(false)}
            >
              待ち続ける
            </Button>
            <Button 
              onClick={() => {
                onAIHelpRequest();
                setShowAIHelpDialog(false);
              }}
            >
              AIセルフヘルプを試す
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WaitingIndicator;
