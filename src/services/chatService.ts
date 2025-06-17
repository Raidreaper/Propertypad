import api from './api';

export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  timestamp: Date;
  roomId: string;
}

type MessageCallback = (message: Message) => void;

class ChatService {
  private messageCallbacks: Map<string, Set<MessageCallback>> = new Map();

  async getMessages(roomId: string): Promise<Message[]> {
    const response = await api.get(`/chat/rooms/${roomId}/messages`);
    return response.data;
  }

  async sendMessage(roomId: string, message: Omit<Message, 'id' | 'roomId'>): Promise<Message> {
    const response = await api.post(`/chat/rooms/${roomId}/messages`, message);
    return response.data;
  }

  async getRooms(): Promise<{ id: string; name: string; lastMessage?: Message }[]> {
    const response = await api.get('/chat/rooms');
    return response.data;
  }

  async createRoom(name: string): Promise<{ id: string; name: string }> {
    const response = await api.post('/chat/rooms', { name });
    return response.data;
  }

  subscribeToMessages(roomId: string, callback: MessageCallback): () => void {
    if (!this.messageCallbacks.has(roomId)) {
      this.messageCallbacks.set(roomId, new Set());
    }
    this.messageCallbacks.get(roomId)?.add(callback);

    // Set up WebSocket connection for real-time messages
    const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/chat/${roomId}`);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messageCallbacks.get(roomId)?.forEach((cb) => cb(message));
    };

    return () => {
      this.messageCallbacks.get(roomId)?.delete(callback);
      ws.close();
    };
  }
}

export const chatService = new ChatService();
export default chatService; 