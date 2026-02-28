import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, BarChart2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'ホーム', path: '/' },
    { icon: MessageSquare, label: 'チャット', path: '/chat', matchPrefix: true },
    { icon: BarChart2, label: 'データ', path: '/data' },
    { icon: Settings, label: '設定', path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-background border-t border-border flex justify-around items-center h-16 px-2 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.matchPrefix
          ? location.pathname.startsWith(item.path)
          : location.pathname === item.path;

        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-all duration-300",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "p-1 rounded-full transition-all",
              isActive && "bg-primary/10 mb-1"
            )}>
              <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn(
              "text-[10px] font-medium tracking-wide transition-all",
              isActive ? "opacity-100" : "opacity-80"
            )}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
