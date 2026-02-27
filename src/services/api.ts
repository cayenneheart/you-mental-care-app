
import { useState, useEffect } from 'react';

export type MoodLevel = 1 | 2 | 3 | 4 | 5;
export type RiskLevel = 'low' | 'medium' | 'high';

export interface SosResponse {
  sessionId: string;
  initialResponse: string;
  riskLevel: RiskLevel;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export interface Appointment {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
}

// SOS initial submission
export const submitSOS = async (moodLevel: MoodLevel): Promise<SosResponse> => {
  try {
    // Mock API response for now
    const mockResponses = {
      1: { riskLevel: 'high' as RiskLevel, text: "とてもお疲れのようですね。日々の業務やストレスでご負担がかかっているかもしれません。差し支えなければ、具体的なお悩みや状況についてお聞かせいただけますか？" },
      2: { riskLevel: 'medium' as RiskLevel, text: "少しお疲れが溜まっているようですね。どのようなことでモヤモヤされているか、もしよろしければ具体的にお話しいただけますか？" },
      3: { riskLevel: 'low' as RiskLevel, text: "コンディションの記録ありがとうございます。いつも通り取り組めているようですね。本日の業務で何か気になることなどがあれば、いつでもお話しください。" },
      4: { riskLevel: 'low' as RiskLevel, text: "良いコンディションで業務に取り組めているようで素晴らしいです！現在、特にモチベーションに繋がっている業務などはありますか？" },
      5: { riskLevel: 'low' as RiskLevel, text: "とても良いコンディションですね！充実して業務に取り組めている状態が伝わってきます。この調子で進められるよう、引き続きサポートいたします。" },
    };

    const response = mockResponses[moodLevel] || mockResponses[3];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      sessionId: `session-${Date.now()}`,
      initialResponse: response.text,
      riskLevel: response.riskLevel,
    };
  } catch (error) {
    console.error('Error submitting SOS:', error);
    throw error;
  }
};

// Send message in chat
export const sendMessage = async (sessionId: string, message: string): Promise<string> => {
  try {
    // Mock API response
    await new Promise(resolve => setTimeout(resolve, 800));

    const responses = [
      "お話しいただきありがとうございます。その状況について、もう少し詳しくお伺いしてもよろしいでしょうか？",
      "なるほど、そういったご状況なのですね。それはいつ頃から続いていますか？",
      "チームメンバーや上司の方には、そのことについてご相談されていますか？",
      "ありがとうございます。私（AIアシスタント）はいつでもあなたのお考えを整理するお手伝いをします。他にお気づきのことはありますか？",
      "ご状況理解いたしました。もしよろしければ、解決に向けたアプローチや、専門スタッフとの面談設定についてご案内できればと思いますが、いかがでしょうか？"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Toggle AI data sharing permission
export const updateDataSharingPermission = async (allowed: boolean): Promise<boolean> => {
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return allowed;
  } catch (error) {
    console.error('Error updating data sharing permission:', error);
    throw error;
  }
};

// Get available appointments
export const getAvailableAppointments = async (date: Date): Promise<Appointment[]> => {
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const startOfDay = new Date(date);
    startOfDay.setHours(9, 0, 0, 0);

    const appointments: Appointment[] = [];

    // Generate 8 appointments for the day (9AM - 5PM)
    for (let i = 0; i < 8; i++) {
      const startTime = new Date(startOfDay);
      startTime.setHours(startTime.getHours() + i);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30);

      appointments.push({
        id: `apt-${date.toISOString().split('T')[0]}-${i}`,
        date: date.toISOString().split('T')[0],
        startTime: startTime.toTimeString().substring(0, 5),
        endTime: endTime.toTimeString().substring(0, 5),
        price: 5000, // ¥5,000
      });
    }

    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Book an appointment
export const bookAppointment = async (appointmentId: string): Promise<string> => {
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return Stripe Checkout URL (mocked)
    return `https://checkout.stripe.com/c/pay/mock-session-${appointmentId}`;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

// Add appointment to calendar
export const addToCalendar = async (appointmentId: string): Promise<boolean> => {
  try {
    // This would trigger adding to device calendar
    // In a real implementation, this would use the Web Calendar API
    return true;
  } catch (error) {
    console.error('Error adding to calendar:', error);
    return false;
  }
};

// Setup WebSocket connection - mock implementation
export const useWebSocketConnection = (sessionId: string | null) => {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setConnected(false);
      return;
    }

    console.log(`Connecting to WebSocket for session ${sessionId}...`);

    // Simulate connection delay
    const connectionTimer = setTimeout(() => {
      setConnected(true);
      console.log('WebSocket connected');
    }, 2000);

    // Simulate occasional messages from server
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const messages = [
          "現在のご状況はいかがですか？",
          "何か業務でお困りのことはありませんか？",
          "ご無理をなさいませんよう、ご自身のペースで進めてくださいね。",
          "お話しにくいことがあれば、社内外の相談窓口（専門スタッフ）もご利用いただけます。",
          "引き続きご支援いたします。いつでもお声がけください。"
        ];

        setMessage(messages[Math.floor(Math.random() * messages.length)]);
      } else {
        setMessage(null);
      }
    }, 15000);

    return () => {
      clearTimeout(connectionTimer);
      clearInterval(messageInterval);
      console.log('WebSocket disconnected');
    };
  }, [sessionId]);

  const sendWebSocketMessage = (message: string) => {
    console.log(`Sending WebSocket message: ${message}`);
    // In a real implementation, this would send the message over WebSocket
    return true;
  };

  return {
    connected,
    message,
    sendMessage: sendWebSocketMessage,
  };
};
