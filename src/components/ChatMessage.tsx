
import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp?: Date;
    read?: boolean;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={cn(
        "flex flex-col px-4 py-2 my-2 max-w-[80%] rounded-lg",
        isUser ? "self-end bg-healing text-healing-foreground ml-auto" : "self-start bg-accent text-accent-foreground mr-auto",
      )}
    >
      <div className="flex flex-col">
        <div className="text-sm break-words">
          {message.text}
        </div>
        <div className="flex items-center justify-end gap-2 mt-1">
          {isUser && message.read && (
            <Check className="h-3 w-3 text-blue-300" />
          )}
          {message.timestamp && (
            <div className="text-xs opacity-70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
