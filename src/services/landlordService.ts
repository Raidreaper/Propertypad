import api from './api';

export interface Landlord {
  id: number;
  name: string;
  email: string;
  phone: string;
  properties: number;
  status: string;
  imageUrl?: string;
}

export const landlordService = {
  getAll: async () => {
    const response = await api.get<Landlord[]>('/landlords');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Landlord>(`/landlords/${id}`);
    return response.data;
  },

  create: async (landlord: Omit<Landlord, 'id'>) => {
    const response = await api.post<Landlord>('/landlords', landlord);
    return response.data;
  },

  update: async (id: number, landlord: Partial<Landlord>) => {
    const response = await api.put<Landlord>(`/landlords/${id}`, landlord);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/landlords/${id}`);
  },
}; 