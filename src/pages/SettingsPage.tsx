import React from 'react';
import Header from '@/components/Header';
import DataSharingToggle from '@/components/DataSharingToggle';
import SOSFloatingButton from '@/components/SOSFloatingButton';

const SettingsPage = () => {
  return (
    <div className="flex-1 flex flex-col w-full h-full relative">
      <Header />

      <main className="container mx-auto p-6 flex-1 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">設定</h1>

        <div className="space-y-6">
          <div className="bg-card text-card-foreground rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">プライバシー設定</h2>
            {/* The component DataSharingToggle might also need dark theme props or adjustments internally */}
            <DataSharingToggle initialValue={true} onValueChange={() => { }} />
          </div>

          <div className="bg-card text-card-foreground rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">アカウント</h2>
            <div className="text-sm text-muted-foreground">アカウント設定がここに入ります</div>
          </div>

          <div className="bg-card text-card-foreground rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">通知</h2>
            <div className="text-sm text-muted-foreground">通知設定がここに入ります</div>
          </div>
        </div>
      </main>

      <SOSFloatingButton />
    </div>
  );
};

export default SettingsPage;
