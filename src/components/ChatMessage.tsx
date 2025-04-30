
import React from 'react';
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp?: Date;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={cn(
        "message fade-in",
        isUser ? "message-user" : "message-ai",
      )}
    >
      <div className="flex flex-col">
        <div className="text-sm">
          {message.text}
        </div>
        {message.timestamp && (
          <div className="text-xs opacity-70 mt-1 text-right">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
