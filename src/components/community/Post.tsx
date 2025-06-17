import React, { useState } from 'react';
import { format } from 'date-fns';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface PostProps {
  id: string;
  content: string;
  images?: string[];
  author: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onShare: (postId: string) => void;
}

export default function Post({
  id,
  content,
  images = [],
  author,
  timestamp,
  likes,
  comments,
  isLiked,
  onLike,
  onComment,
  onShare,
}: PostProps) {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(id, commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          {author.imageUrl ? (
            <img
              src={author.imageUrl}
              alt={author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center text-white font-medium">
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-900">{author.name}</h3>
            <p className="text-xs text-gray-500">{format(timestamp, 'MMM d, yyyy h:mm a')}</p>
          </div>
        </div>

        <p className="mt-4 text-gray-800">{content}</p>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-gray-500">
          <button
            onClick={() => onLike(id)}
            className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-300"
          >
            {isLiked ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span>{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-300"
          >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span>{comments}</span>
          </button>

          <button
            onClick={() => onShare(id)}
            className="flex items-center space-x-1 hover:text-green-500 transition-colors duration-300"
          >
            <ShareIcon className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>

        {showComments && (
          <div className="mt-4 border-t pt-4">
            <form onSubmit={handleSubmitComment} className="flex space-x-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  commentText.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white hover:from-green-400 hover:to-blue-500'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                } transition-all duration-300`}
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 