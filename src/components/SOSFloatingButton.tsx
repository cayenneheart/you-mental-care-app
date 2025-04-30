
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
        variant="destructive"
        size="icon"
        className="rounded-full fixed bottom-6 right-6 w-14 h-14 shadow-lg animate-pulse z-40"
        onClick={handleSOSClick}
      >
        <HeartPulse className="h-7 w-7" />
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>緊急サポート</DialogTitle>
            <DialogDescription>
              カウンセラーに直接接続します。緊急の相談が必要ですか？
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={handleConnectToCounselor}>
              カウンセラーに接続する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSFloatingButton;
