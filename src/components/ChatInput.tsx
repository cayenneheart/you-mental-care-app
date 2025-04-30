
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false, 
  className 
}) => {
  const [message, setMessage] = useState('');
  const lastEnterTime = useRef<number | null>(null);
  const enterPressed = useRef<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      lastEnterTime.current = null;
      enterPressed.current = false;
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on double Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      const now = Date.now();
      
      if (enterPressed.current && lastEnterTime.current && now - lastEnterTime.current < 500) {
        // Second Enter within 500ms, send the message
        handleSubmit(e);
      } else {
        // First Enter, or too long since last Enter
        enterPressed.current = true;
        lastEnterTime.current = now;
        
        // Reset the flag after 500ms if no second Enter
        setTimeout(() => {
          if (lastEnterTime.current === now) {
            enterPressed.current = false;
            lastEnterTime.current = null;
          }
        }, 500);
      }
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-end gap-2 p-3 border-t bg-card",
        className
      )}
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="メッセージを入力...（Enterを2回押して送信）"
        className="min-h-[60px] max-h-[120px] resize-none"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        disabled={disabled || !message.trim()} 
        className="px-5"
      >
        送信
      </Button>
    </form>
  );
};

export default ChatInput;
