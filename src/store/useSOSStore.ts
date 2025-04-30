
import { create } from 'zustand';

type MoodLevel = 1 | 2 | 3 | 4 | 5;
type RiskLevel = 'low' | 'medium' | 'high';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  read?: boolean;
}

interface Session {
  id: string;
  moodLevel?: MoodLevel;
  riskLevel?: RiskLevel;
  messages: Message[];
  waitTime: number;
  isConnected: boolean;
  inVideoCall: boolean;
  createdAt: Date;
}

interface SOSState {
  currentSession: Session | null;
  sessions: Session[];
  shareDataForAI: boolean;
  waitTimeInterval: number | null;
  
  // Actions
  setMoodLevel: (level: MoodLevel) => void;
  setRiskLevel: (level: RiskLevel) => void;
  createNewSession: () => void;
  addMessage: (text: string, sender: 'user' | 'ai') => void;
  markMessageAsRead: (messageId: string) => void;
  incrementWaitTime: () => void;
  startWaitTimeCounter: () => void;
  stopWaitTimeCounter: () => void;
  setConnectionStatus: (isConnected: boolean) => void;
  setVideoCallStatus: (inCall: boolean) => void;
  toggleShareDataForAI: () => void;
  endCurrentSession: () => void;
}

export const useSOSStore = create<SOSState>((set, get) => ({
  currentSession: null,
  sessions: [],
  shareDataForAI: false,
  waitTimeInterval: null,
  
  setMoodLevel: (level) => {
    set((state) => {
      if (!state.currentSession) return state;
      
      return {
        currentSession: {
          ...state.currentSession,
          moodLevel: level,
        },
      };
    });
  },
  
  setRiskLevel: (level) => {
    set((state) => {
      if (!state.currentSession) return state;
      
      return {
        currentSession: {
          ...state.currentSession,
          riskLevel: level,
        },
      };
    });
  },
  
  createNewSession: () => {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      messages: [],
      waitTime: 0,
      isConnected: false,
      inVideoCall: false,
      createdAt: new Date(),
    };
    
    set((state) => ({
      currentSession: newSession,
      sessions: [...state.sessions, newSession],
    }));
  },
  
  addMessage: (text, sender) => {
    set((state) => {
      if (!state.currentSession) return state;
      
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        text,
        sender,
        timestamp: new Date(),
        read: sender === 'ai' ? false : undefined,
      };
      
      return {
        currentSession: {
          ...state.currentSession,
          messages: [...state.currentSession.messages, newMessage],
        },
      };
    });
  },
  
  markMessageAsRead: (messageId) => {
    set((state) => {
      if (!state.currentSession) return state;
      
      return {
        currentSession: {
          ...state.currentSession,
          messages: state.currentSession.messages.map((msg) => 
            msg.id === messageId ? { ...msg, read: true } : msg
          ),
        },
      };
    });
  },
  
  incrementWaitTime: () => {
    set((state) => {
      if (!state.currentSession) return state;
      
      return {
        currentSession: {
          ...state.currentSession,
          waitTime: state.currentSession.waitTime + 1,
        },
      };
    });
  },
  
  startWaitTimeCounter: () => {
    const interval = window.setInterval(() => {
      get().incrementWaitTime();
    }, 1000);
    
    set({ waitTimeInterval: interval });
  },
  
  stopWaitTimeCounter: () => {
    if (get().waitTimeInterval) {
      window.clearInterval(get().waitTimeInterval);
      set({ waitTimeInterval: null });
    }
  },
  
  setConnectionStatus: (isConnected) => {
    set((state) => {
      if (!state.currentSession) return state;
      
      return {
        currentSession: {
          ...state.currentSession,
          isConnected,
        },
      };
    });
  },
  
  setVideoCallStatus: (inCall) => {
    set((state) => {
      if (!state.currentSession) return state;
      
      return {
        currentSession: {
          ...state.currentSession,
          inVideoCall: inCall,
        },
      };
    });
  },
  
  toggleShareDataForAI: () => {
    set((state) => ({
      shareDataForAI: !state.shareDataForAI,
    }));
  },
  
  endCurrentSession: () => {
    set({ currentSession: null });
  },
}));

export default useSOSStore;
