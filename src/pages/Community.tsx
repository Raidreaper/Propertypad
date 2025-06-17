import React, { useState, useEffect } from 'react';
import { PlusIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Post from '../components/community/Post';
import { communityService, Post as PostType } from '../services/communityService';
import { useAuth } from '../contexts/AuthContext';

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const data = await communityService.getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts');
      console.error('Error loading posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() && selectedImages.length === 0) return;

    try {
      const imageUrls = await Promise.all(
        selectedImages.map((file) => communityService.uploadImage(file))
      );

      const newPost = await communityService.createPost(newPostContent, imageUrls);
      setPosts((prev) => [newPost, ...prev]);
      setNewPostContent('');
      setSelectedImages([]);
    } catch (err) {
      setError('Failed to create post');
      console.error('Error creating post:', err);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (post) {
        if (post.isLiked) {
          await communityService.unlikePost(postId);
          setPosts((prev) =>
            prev.map((p) =>
              p.id === postId
                ? { ...p, likes: p.likes - 1, isLiked: false }
                : p
            )
          );
        } else {
          await communityService.likePost(postId);
          setPosts((prev) =>
            prev.map((p) =>
              p.id === postId
                ? { ...p, likes: p.likes + 1, isLiked: true }
                : p
            )
          );
        }
      }
    } catch (err) {
      console.error('Error liking/unliking post:', err);
    }
  };

  const handleComment = async (postId: string, comment: string) => {
    try {
      await communityService.addComment(postId, comment);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments: p.comments + 1 } : p
        )
      );
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleShare = async (postId: string) => {
    try {
      await navigator.share({
        title: 'Check out this post',
        text: 'Shared from PropertyPad Community',
        url: `${window.location.origin}/community/post/${postId}`,
      });
    } catch (err) {
      console.error('Error sharing post:', err);
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <form onSubmit={handleCreatePost}>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            {selectedImages.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {selectedImages.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            <div className="mt-4 flex items-center justify-between">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <PhotoIcon className="h-6 w-6 text-gray-500 hover:text-blue-500 transition-colors duration-300" />
              </label>
              <button
                type="submit"
                disabled={!newPostContent.trim() && selectedImages.length === 0}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  newPostContent.trim() || selectedImages.length > 0
                    ? 'bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-blue-500'
                    : 'bg-gray-300 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300`}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Post
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 