import React from 'react';
import { format } from 'date-fns';

interface ChatMessageProps {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  timestamp: Date;
  isOwnMessage: boolean;
}

export default function ChatMessage({ content, sender, timestamp, isOwnMessage }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[70%]`}>
        {!isOwnMessage && (
          <div className="flex-shrink-0 mr-2">
            {sender.imageUrl ? (
              <img
                src={sender.imageUrl}
                alt={sender.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-medium">
                {sender.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )}
        <div
          className={`rounded-lg px-4 py-2 ${
            isOwnMessage
              ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {!isOwnMessage && (
            <div className="text-xs font-medium text-gray-500 mb-1">{sender.name}</div>
          )}
          <div className="text-sm">{content}</div>
          <div className="text-xs mt-1 opacity-75">
            {format(timestamp, 'h:mm a')}
          </div>
        </div>
      </div>
    </div>
  );
} 