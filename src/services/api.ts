
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
      1: { riskLevel: 'high' as RiskLevel, text: "I'm sorry to hear you're feeling extremely low. This sounds serious. Let me connect you with someone who can help immediately." },
      2: { riskLevel: 'medium' as RiskLevel, text: "I understand you're going through a difficult time. Let's talk about what's happening and find some ways to help you feel better." },
      3: { riskLevel: 'low' as RiskLevel, text: "Thank you for reaching out. It sounds like you're having a challenging day. Would you like to tell me more about what's going on?" },
      4: { riskLevel: 'low' as RiskLevel, text: "I'm glad you're checking in. How can I support you today?" },
      5: { riskLevel: 'low' as RiskLevel, text: "Great to hear you're doing well! Is there something specific you'd like to discuss or work on today?" },
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
      "I understand how you feel. Can you tell me more about what's happening?",
      "That sounds challenging. How long have you been feeling this way?",
      "I'm here to listen. Would it help to talk about specific situations that are troubling you?",
      "Thank you for sharing that with me. What do you think might help you feel better right now?",
      "It's important to recognize those feelings. Have you tried any coping strategies that have worked for you in the past?"
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
          "How are you feeling now?",
          "Is there something specific you'd like to discuss?",
          "Remember, it's okay to take things one step at a time.",
          "Would it help to talk about some coping strategies?",
          "I'm still here with you. Take your time."
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
