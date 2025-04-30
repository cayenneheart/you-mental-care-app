
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          ページが見つかりません
        </p>
        <Button onClick={handleHomeClick}>
          ホームに戻る
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
