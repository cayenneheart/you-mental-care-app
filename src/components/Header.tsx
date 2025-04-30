
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import useSOSStore from "@/store/useSOSStore";

interface HeaderProps {
  showVideoButton?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ showVideoButton = false, className }) => {
  const router = useRouter();
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [useAvatar, setUseAvatar] = useState(false);
  const setVideoCallStatus = useSOSStore(state => state.setVideoCallStatus);
  
  const handleHomeClick = () => {
    router.push('/');
  };
  
  const handleSettingsClick = () => {
    router.push('/settings');
  };
  
  const handleStartVideoCall = () => {
    // In a real app, this would connect to Twilio Video
    setVideoCallStatus(true);
    setVideoDialogOpen(false);
    
    // Mock opening a video call
    window.alert('ビデオ通話を開始します...');
  };
  
  return (
    <>
      <header 
        className={cn(
          "bg-card border-b flex items-center justify-between px-4 py-2 sticky top-0 z-30",
          className
        )}
      >
        <Button variant="ghost" onClick={handleHomeClick}>
          3-Tap SOS
        </Button>
        
        <div className="flex items-center space-x-2">
          {showVideoButton && (
            <Button
              size="icon"
              variant="outline"
              onClick={() => setVideoDialogOpen(true)}
              className="rounded-full"
            >
              <Camera className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="sm" onClick={handleSettingsClick}>
            設定
          </Button>
        </div>
      </header>
      
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ビデオ通話を開始</DialogTitle>
            <DialogDescription>
              カメラとマイクを使用します。実際の顔を表示するか、アバターを使用するかを選択してください。
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center gap-4 my-4">
            <Button
              variant={useAvatar ? "outline" : "default"}
              className="flex flex-col h-auto p-4"
              onClick={() => setUseAvatar(false)}
            >
              <Camera size={32} className="mb-2" />
              <span>顔を出す</span>
            </Button>
            
            <Button
              variant={useAvatar ? "default" : "outline"}
              className="flex flex-col h-auto p-4"
              onClick={() => setUseAvatar(true)}
            >
              <span className="text-2xl mb-2">😊</span>
              <span>アバターを使う</span>
            </Button>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setVideoDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleStartVideoCall}>
              通話を開始
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
