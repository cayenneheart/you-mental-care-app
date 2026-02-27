
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
          "bg-white/60 backdrop-blur-sm p-4 rounded-2xl text-center flex flex-col items-center space-y-3 shadow-sm border border-slate-100",
          className
        )}
      >
        <p className="font-medium text-slate-600 tracking-wide">専門スタッフにおつなぎしています</p>
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
            <DialogTitle className="text-slate-700">AIサポートに切り替えますか？</DialogTitle>
            <DialogDescription className="text-slate-500 mt-2">
              専門スタッフの応答に時間がかかっております。よろしければ、AIアシスタントに先に状況をお話しいただくことも可能です。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4">
            <Button
              variant="ghost"
              onClick={() => setShowAIHelpDialog(false)}
              className="rounded-full text-slate-500 hover:bg-slate-100 font-light"
            >
              もう少し待つ
            </Button>
            <Button
              onClick={() => {
                onAIHelpRequest();
                setShowAIHelpDialog(false);
              }}
              className="rounded-full bg-slate-700 text-white hover:bg-slate-800 shadow-none font-light"
            >
              AIアシスタントと話す
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WaitingIndicator;
