import React from 'react';
import Header from '@/components/Header';
import DataSharingToggle from '@/components/DataSharingToggle';
import SOSFloatingButton from '@/components/SOSFloatingButton';

const SettingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto p-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">設定</h1>
        
        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow-sm border p-4">
            <h2 className="text-lg font-medium mb-4">プライバシー設定</h2>
            <DataSharingToggle />
          </div>
          
          <div className="bg-card rounded-lg shadow-sm border p-4">
            <h2 className="text-lg font-medium mb-4">アカウント</h2>
            {/* アカウント設定が必要な場合は、ここに追加 */}
          </div>
          
          <div className="bg-card rounded-lg shadow-sm border p-4">
            <h2 className="text-lg font-medium mb-4">通知</h2>
            {/* 通知設定が必要な場合は、ここに追加 */}
          </div>
        </div>
      </main>
      
      <SOSFloatingButton />
    </div>
  );
};

export default SettingsPage;
