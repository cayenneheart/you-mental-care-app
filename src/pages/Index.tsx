
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SOSButton from "@/components/SOSButton";
import MoodSelector from "@/components/MoodSelector";
import useSOSStore from "@/store/useSOSStore";
import Header from "@/components/Header";
import { submitSOS } from "@/services/api";
import type { MoodLevel } from "@/services/api";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"initial" | "mood">("initial");
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createNewSession = useSOSStore(state => state.createNewSession);
  const setMoodLevel = useSOSStore(state => state.setMoodLevel);
  const setRiskLevel = useSOSStore(state => state.setRiskLevel);
  const addMessage = useSOSStore(state => state.addMessage);
  
  const handleSOSClick = () => {
    setStep("mood");
  };
  
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
        1: "とても良くない気分です。",
        2: "あまり良くない気分です。",
        3: "普通です。",
        4: "良い気分です。",
        5: "とても良い気分です。",
      };
      addMessage(moodMessages[selectedMood], "user");
      
      // Add AI response
      addMessage(response.initialResponse, "ai");
      
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {step === "initial" ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">3-Tap SOSメンタルケア</h1>
            <p className="text-muted-foreground mb-8">
              今の気持ちを伝えて、すぐにサポートを受けられます
            </p>
            <SOSButton onClick={handleSOSClick} />
          </div>
        ) : (
          <MoodSelector
            onSelect={handleMoodSelect}
            onSubmit={handleMoodSubmit}
            className={isSubmitting ? "opacity-70 pointer-events-none" : ""}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
