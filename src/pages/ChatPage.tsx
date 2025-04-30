import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import WaitingIndicator from "@/components/WaitingIndicator";
import EmergencyBanner from "@/components/EmergencyBanner";
import AppointmentBooker from "@/components/AppointmentBooker";
import FeedbackSurvey from "@/components/FeedbackSurvey";
import SOSFloatingButton from "@/components/SOSFloatingButton";
import useSOSStore from "@/store/useSOSStore";
import { useWebSocketConnection, sendMessage } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSurvey, setShowSurvey] = useState(false);
  
  // Store selectors
  const currentSession = useSOSStore(state => state.currentSession);
  const addMessage = useSOSStore(state => state.addMessage);
  const startWaitTimeCounter = useSOSStore(state => state.startWaitTimeCounter);
  const stopWaitTimeCounter = useSOSStore(state => state.stopWaitTimeCounter);
  const setConnectionStatus = useSOSStore(state => state.setConnectionStatus);
  
  // WebSocket connection
  const { connected, message: incomingMessage } = useWebSocketConnection(id || null);
  
  // Update connection status in store when WebSocket status changes
  useEffect(() => {
    setConnectionStatus(connected);
    
    if (connected) {
      stopWaitTimeCounter();
    } else {
      startWaitTimeCounter();
    }
  }, [connected, setConnectionStatus, startWaitTimeCounter, stopWaitTimeCounter]);
  
  // Add incoming messages to the chat
  useEffect(() => {
    if (incomingMessage) {
      addMessage(incomingMessage, "ai");
    }
  }, [incomingMessage, addMessage]);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);
  
  // Handle user message submission
  const handleSendMessage = async (text: string) => {
    if (!currentSession) return;
    
    // Add user message to the chat
    addMessage(text, "user");
    
    try {
      // Send message to backend and get response
      const response = await sendMessage(id || "", text);
      
      // Add AI response to the chat
      setTimeout(() => {
        addMessage(response, "ai");
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "メッセージの送信に失敗しました",
        description: "もう一度お試しください",
        variant: "destructive",
      });
    }
  };
  
  // Handle AI self-help request (when wait time exceeds 1 minute)
  const handleAIHelpRequest = () => {
    stopWaitTimeCounter();
    setConnectionStatus(true);
    
    addMessage(
      "AIアシスタントがサポートします。どのようなお手伝いができるでしょうか？",
      "ai"
    );
  };
  
  // Handle end chat
  const handleEndChat = () => {
    setShowSurvey(true);
  };
  
  // Show loading state if no session exists
  if (!currentSession) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center space-x-2 mb-3">
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
            </div>
            <p>セッションを読み込んでいます...</p>
          </div>
        </main>
        <SOSFloatingButton />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Emergency banner for high risk */}
      <EmergencyBanner visible={currentSession.riskLevel === "high"} />
      
      {/* Header with video call button */}
      <Header
        showVideoButton={connected}
        className={currentSession.riskLevel === "high" ? "mt-14" : ""}
      />
      
      <main className="flex-1 flex flex-col">
        <div className="chat-container">
          {/* Messages */}
          <div className="messages-container">
            {currentSession.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {/* Invisible element for scrolling to bottom */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Waiting indicator */}
          {!connected && (
            <div className="p-3">
              <WaitingIndicator
                waitTime={currentSession.waitTime}
                onAIHelpRequest={handleAIHelpRequest}
              />
            </div>
          )}
          
          {/* Chat actions */}
          <div className="p-3 bg-card border-t flex justify-between items-center">
            <AppointmentBooker />
            <Button variant="outline" onClick={handleEndChat}>
              チャットを終了
            </Button>
          </div>
          
          {/* Chat input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={!connected}
          />
        </div>
      </main>
      
      {/* Feedback survey */}
      <FeedbackSurvey
        isOpen={showSurvey}
        onClose={() => setShowSurvey(false)}
      />

      <SOSFloatingButton />
    </div>
  );
};

export default ChatPage;
