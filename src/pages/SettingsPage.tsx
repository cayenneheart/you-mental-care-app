
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DataSharingToggle from "@/components/DataSharingToggle";
import useSOSStore from "@/store/useSOSStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const shareDataForAI = useSOSStore(state => state.shareDataForAI);
  const toggleShareDataForAI = useSOSStore(state => state.toggleShareDataForAI);
  
  const handleDataSharingChange = (value: boolean) => {
    toggleShareDataForAI();
    
    toast({
      title: "設定を更新しました",
      description: value
        ? "AIの学習用にチャット履歴の提供を許可しました。"
        : "AIの学習用のデータ提供を停止しました。",
    });
  };
  
  const handleBackClick = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleBackClick} className="mr-2">
              ← 戻る
            </Button>
            <h1 className="text-2xl font-bold">設定</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>プライバシーとデータ</CardTitle>
              <CardDescription>
                データの共有と使用方法に関する設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <DataSharingToggle
                initialValue={shareDataForAI}
                onValueChange={handleDataSharingChange}
              />
              
              <div className="text-sm text-muted-foreground mt-2">
                <p>
                  ONにすると、匿名化されたチャット履歴がAIの学習に使用されます。
                  これにより、サービスの品質向上に貢献できます。
                </p>
                <p className="mt-2">
                  個人を特定できる情報は削除され、データは安全に管理されます。
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>アプリについて</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>3-Tap SOSメンタルケア</p>
              <p className="text-sm text-muted-foreground">バージョン 1.0.0</p>
              
              <div className="text-sm text-muted-foreground mt-4">
                <p>
                  このアプリは迅速なメンタルサポートを提供するために開発されました。
                  緊急時には専門家に直接相談してください。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
