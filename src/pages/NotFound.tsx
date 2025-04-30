
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import SOSFloatingButton from '@/components/SOSFloatingButton';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl mb-6">ページが見つかりません</h2>
        <p className="text-muted-foreground mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        
        <Button onClick={() => navigate('/')}>
          ホームに戻る
        </Button>
      </main>
      
      <SOSFloatingButton />
    </div>
  );
};

export default NotFound;
