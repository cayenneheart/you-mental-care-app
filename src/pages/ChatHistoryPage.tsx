import React from 'react';
import Header from '@/components/Header';
import SOSFloatingButton from '@/components/SOSFloatingButton';
import useSOSStore from '@/store/useSOSStore';
import { useNavigate } from 'react-router-dom';

const ChatHistoryPage = () => {
  const navigate = useNavigate();
  // Assume we might store session history in our store
  const currentSession = useSOSStore(state => state.currentSession);

  return (
    <div className="flex-1 flex flex-col w-full h-full relative">
      <Header />

      <main className="container mx-auto p-6 flex-1 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">チャット履歴</h1>

        <div className="space-y-4">
          {currentSession ? (
            <button
              onClick={() => navigate(`/chat/${currentSession.id}`)}
              className="w-full text-left bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-xl shadow-sm border p-6 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-semibold text-lg">現在のセッション</span>
                <span className="text-sm text-muted-foreground">{new Date(currentSession.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-muted-foreground line-clamp-1">
                {currentSession.messages.length > 0
                  ? currentSession.messages[currentSession.messages.length - 1].text
                  : "チャットを再開する"}
              </p>
            </button>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>過去のチャット履歴はありません。</p>
              <p className="text-sm mt-2">ホームから今日のコンディションを記録しましょう。</p>
            </div>
          )}
        </div>
      </main>

      <SOSFloatingButton />
    </div>
  );
};

export default ChatHistoryPage;
