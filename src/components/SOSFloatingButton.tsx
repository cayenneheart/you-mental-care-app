
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useSOSStore } from "@/store/useSOSStore";
import { HeartPulse } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const SOSFloatingButton = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const createNewSession = useSOSStore(state => state.createNewSession);
  const setRiskLevel = useSOSStore(state => state.setRiskLevel);
  const addMessage = useSOSStore(state => state.addMessage);

  const handleSOSClick = () => {
    setDialogOpen(true);
  };

  const handleConnectToCounselor = () => {
    // 新しいセッションを作成
    createNewSession();
    setRiskLevel('medium');

    // 初期メッセージを追加
    addMessage("こんにちは、カウンセラーに接続しています。どのようなご様子ですか？", "ai");

    // 新しいセッションIDを生成
    const sessionId = `emergency-${Date.now()}`;

    toast({
      title: "カウンセラーに接続しています",
      description: "しばらくお待ちください...",
    });

    // ダイアログを閉じる
    setDialogOpen(false);

    // 1秒後にチャットページに遷移
    setTimeout(() => {
      navigate(`/chat/${sessionId}`);
    }, 1000);
  };

  return (
    <>
      <Button
        size="icon"
        className="rounded-full fixed bottom-6 right-6 w-14 h-14 shadow-md bg-rose-400/90 hover:bg-rose-500 text-white border-none transition-all duration-700 hover:scale-105 z-40"
        onClick={handleSOSClick}
      >
        <HeartPulse className="h-6 w-6 animate-pulse" />
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-slate-700">心のサポート</DialogTitle>
            <DialogDescription className="text-slate-500 mt-2 leading-relaxed">
              カウンセラーに直接つながります。<br />
              今すぐにお話をご希望ですか？
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="ghost" onClick={() => setDialogOpen(false)} className="rounded-full text-slate-500 font-light hover:bg-slate-100">
              キャンセル
            </Button>
            <Button onClick={handleConnectToCounselor} className="rounded-full bg-rose-400/90 hover:bg-rose-500 text-white shadow-none transition-colors duration-300">
              カウンセラーと話す
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSFloatingButton;
