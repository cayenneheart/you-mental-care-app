
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SOSButton from "@/components/SOSButton";
import MoodSelector from "@/components/MoodSelector";
import useSOSStore from "@/store/useSOSStore";
import Header from "@/components/Header";
import SOSFloatingButton from "@/components/SOSFloatingButton";
import { submitSOS } from "@/services/api";
import type { MoodLevel } from "@/services/api";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createNewSession = useSOSStore(state => state.createNewSession);
  const setMoodLevel = useSOSStore(state => state.setMoodLevel);
  const setRiskLevel = useSOSStore(state => state.setRiskLevel);
  const addMessage = useSOSStore(state => state.addMessage);

  const handleMoodSelect = (level: MoodLevel) => {
    setSelectedMood(level);
  };

  const handleMoodSubmit = async () => {
    if (selectedMood === null) return;

    setIsSubmitting(true);

    try {
      // Create a new session in our store
      createNewSession();
      setMoodLevel(selectedMood);

      // Submit to API
      const response = await submitSOS(selectedMood);

      // Update store with risk level and initial message
      setRiskLevel(response.riskLevel);
      addMessage("こんにちは、今日はどのようなご気分ですか？", "ai");

      // Add user's mood as first message
      const moodMessages = {
        1: "とても疲れています／大きなストレスを感じています。",
        2: "少し疲れています／モヤモヤしています。",
        3: "いつも通りです／特に問題ありません。",
        4: "調子が良いです／前向きに取り組めています。",
        5: "とても調子が良いです／充実しています！",
      };
      addMessage(moodMessages[selectedMood], "user");

      // Add AI response
      addMessage("今日のコンディションですね、教えていただきありがとうございます。\nよろしければ、今の業務の状況や、モヤモヤしていることなど、もう少し詳しくお話しいただけますか？\n※ここでの会話はプライバシーが守られます。安心してご自身のペースでお話しください。", "ai");

      // Navigate to chat
      navigate(`/chat/${response.sessionId}`);
    } catch (error) {
      console.error("Error submitting SOS:", error);
      toast({
        title: "エラーが発生しました",
        description: "もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      <Header />

      <main className="flex-1 container mx-auto flex flex-col items-center justify-center p-6 slide-in max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">コンディション・チェック</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            毎日の気分を記録して、健やかなワークライフを
          </p>
        </div>

        <MoodSelector
          onSelect={handleMoodSelect}
          onSubmit={handleMoodSubmit}
          className={isSubmitting ? "opacity-70 pointer-events-none" : ""}
        />
      </main>

      <SOSFloatingButton />
    </div>
  );
};

export default Index;
