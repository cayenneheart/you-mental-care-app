
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useLocation, Link } from "react-router-dom";
import SOSFloatingButton from './SOSFloatingButton';

interface HeaderProps {
  showVideoButton?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ showVideoButton = false, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [useAvatar, setUseAvatar] = useState(false);
  const setVideoCallStatus = useSOSStore(state => state.setVideoCallStatus);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
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
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
      >
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="hidden md:flex items-center gap-6 mr-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold sm:inline-block tracking-tight text-foreground">
                Well-being Check
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {[
                { label: 'ホーム', path: '/' },
                { label: 'チャット', path: '/chat', matches: ['/chat'] },
                { label: '設定', path: '/settings', matches: ['/settings'] },
              ].map((item) => {
                const isActive = item.matches
                  ? item.matches.some(m => location.pathname.startsWith(m))
                  : location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      isActive ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile view top nav branding */}
          <div className="md:hidden flex flex-1 items-center">
            <Link to="/" className="font-bold tracking-tight text-foreground">
              Well-being Check
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-2">
            {showVideoButton && (
              <Button
                size="icon"
                variant="outline"
                onClick={() => setVideoDialogOpen(true)}
                className="h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}

            <nav className="flex items-center md:hidden">
              <Button variant="ghost" size="sm" onClick={handleSettingsClick} className="text-muted-foreground hover:text-foreground">
                設定
              </Button>
            </nav>
          </div>
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
