
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyBannerProps {
  visible: boolean;
  className?: string;
}

const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ visible, className }) => {
  if (!visible) return null;

  const handleEmergencyCall = () => {
    window.location.href = 'tel:119';
  };

  const handleHelplineCall = () => {
    // This would be a mental health helpline number
    window.location.href = 'tel:0120279338'; // TELL Lifeline Japan
  };

  return (
    <div
      className={cn(
        "bg-emergency text-emergency-foreground w-full py-3 px-4 fixed top-0 left-0 z-50 shadow-md",
        "flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6",
        "slide-in",
        className
      )}
    >
      <p className="font-medium text-center">緊急サポートが必要かもしれません</p>
      
      <div className="flex space-x-3">
        <Button
          size="sm"
          variant="destructive"
          className="border-white border"
          onClick={handleEmergencyCall}
        >
          <Phone className="mr-1 h-4 w-4" />
          119に電話
        </Button>
        
        <Button
          size="sm"
          variant="secondary"
          className="bg-white/20 hover:bg-white/30"
          onClick={handleHelplineCall}
        >
          <Phone className="mr-1 h-4 w-4" />
          相談窓口に電話
        </Button>
      </div>
    </div>
  );
};

export default EmergencyBanner;
