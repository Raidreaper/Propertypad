import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { chatService } from '../services/chatService';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';

interface Room {
  id: string;
  name: string;
  lastMessage?: {
    content: string;
    timestamp: Date;
  };
}

export default function Chat() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom);
    }
  }, [selectedRoom]);

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const data = await chatService.getRooms();
      setRooms(data);
      if (data.length > 0) {
        setSelectedRoom(data[0].id);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load chat rooms');
      console.error('Error loading chat rooms:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (roomId: string) => {
    try {
      const data = await chatService.getMessages(roomId);
      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedRoom || !user) return;

    try {
      await chatService.sendMessage(selectedRoom, {
        content,
        sender: {
          id: user.id,
          name: user.name || 'Anonymous',
          imageUrl: user.imageUrl,
        },
        timestamp: new Date(),
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex h-[calc(100vh-12rem)]">
        {/* Chat Rooms Sidebar */}
        <div className="w-64 border-r border-gray-200 pr-4">
          <h2 className="text-lg font-semibold mb-4">Chat Rooms</h2>
          <div className="space-y-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                  selectedRoom === room.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{room.name}</div>
                {room.lastMessage && (
                  <div className="text-sm opacity-75 truncate">
                    {room.lastMessage.content}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 pl-4">
          {selectedRoom ? (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    {...message}
                    isOwnMessage={message.sender.id === user?.id}
                  />
                ))}
              </div>
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat room to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 