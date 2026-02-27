
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
import TopicSuggestions from "@/components/TopicSuggestions";
import useSOSStore from "@/store/useSOSStore";
import { useWebSocketConnection, sendMessage } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false);

  // Store selectors
  const currentSession = useSOSStore(state => state.currentSession);
  const addMessage = useSOSStore(state => state.addMessage);
  const markMessageAsRead = useSOSStore(state => state.markMessageAsRead);
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

      // AI最初のメッセージの後にトピック提案を表示する
      if (currentSession && currentSession.messages.length <= 1) {
        setShowTopicSuggestions(true);
      }
    }
  }, [incomingMessage, addMessage, currentSession]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);

  // Mark AI messages as read when they are visible
  useEffect(() => {
    if (!currentSession) return;

    // 一定時間後にAIメッセージを既読にする
    const aiMessages = currentSession.messages.filter(
      (msg) => msg.sender === "ai" && !msg.read
    );

    if (aiMessages.length > 0) {
      // 3秒後に既読にする (実際のアプリでは画面内に表示されたかどうかを検出する)
      const timer = setTimeout(() => {
        aiMessages.forEach((msg) => {
          markMessageAsRead(msg.id);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentSession, markMessageAsRead]);

  // Handle user message submission
  const handleSendMessage = async (text: string) => {
    if (!currentSession) return;

    // Add user message to the chat
    addMessage(text, "user");

    // Hide topic suggestions after user sends a message
    setShowTopicSuggestions(false);

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

  // Handle topic selection
  const handleSelectTopic = (topic: string) => {
    handleSendMessage(topic);
  };

  // Handle AI self-help request (when wait time exceeds 1 minute)
  const handleAIHelpRequest = () => {
    stopWaitTimeCounter();
    setConnectionStatus(true);

    addMessage(
      "🤖 こんにちは！あなたのウェルビーイングをサポートする AI アシスタントです。どのようなお手伝いができるでしょうか？",
      "ai"
    );

    // Show topic suggestions after AI greets the user
    setShowTopicSuggestions(true);
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
          {/* AI avatar */}
          <div className="flex items-center p-4 border-b bg-white/40 backdrop-blur-sm">
            <div className="text-4xl mr-3 opacity-90">🤖</div>
            <div>
              <h3 className="font-medium text-slate-700 tracking-wide">AI ウェルビーイング・サポーター</h3>
              <p className="text-sm text-slate-500 font-light">コンディション・チェック</p>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {currentSession.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Topic suggestions */}
            {showTopicSuggestions && (
              <div className="mx-4 my-3">
                <TopicSuggestions onSelectTopic={handleSelectTopic} />
              </div>
            )}

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
          <div className="p-3 bg-white/40 backdrop-blur-sm border-t border-slate-100 flex justify-between items-center">
            <AppointmentBooker />
            <Button variant="outline" onClick={handleEndChat} className="rounded-full text-slate-600 border-slate-200 hover:bg-slate-50 font-light">
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
