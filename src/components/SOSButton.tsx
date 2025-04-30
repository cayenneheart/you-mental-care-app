
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SOSButtonProps {
  onClick: () => void;
  className?: string;
}

const SOSButton: React.FC<SOSButtonProps> = ({ onClick, className }) => {
  return (
    <Button
      variant="destructive"
      size="lg"
      onClick={onClick}
      className={cn(
        "bg-sos text-sos-foreground hover:bg-sos/90 text-xl rounded-full w-40 h-40 shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sos",
        "animate-pulse flex flex-col items-center justify-center",
        className
      )}
    >
      <span className="text-4xl mb-2">🐼</span>
      優～YOU～
    </Button>
  );
};

export default SOSButton;
