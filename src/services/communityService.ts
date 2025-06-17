import api from './api';

export interface Post {
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
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  timestamp: Date;
}

class CommunityService {
  async getPosts(page = 1, limit = 10): Promise<Post[]> {
    const response = await api.get('/community/posts', {
      params: { page, limit },
    });
    return response.data;
  }

  async createPost(content: string, images?: string[]): Promise<Post> {
    const response = await api.post('/community/posts', { content, images });
    return response.data;
  }

  async likePost(postId: string): Promise<void> {
    await api.post(`/community/posts/${postId}/like`);
  }

  async unlikePost(postId: string): Promise<void> {
    await api.delete(`/community/posts/${postId}/like`);
  }

  async getComments(postId: string): Promise<Comment[]> {
    const response = await api.get(`/community/posts/${postId}/comments`);
    return response.data;
  }

  async addComment(postId: string, content: string): Promise<Comment> {
    const response = await api.post(`/community/posts/${postId}/comments`, { content });
    return response.data;
  }

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/community/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url;
  }
}

export const communityService = new CommunityService();
export default communityService; 