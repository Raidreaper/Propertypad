import api from './api';

export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'Residential' | 'Commercial' | 'Mixed';
  units: number;
  occupancy: string;
  rentAmount: number;
  status: 'Active' | 'Inactive';
  imageUrl?: string;
  images?: string[];
  owner?: string;
}

const propertyService = {
  getAll: async (): Promise<Property[]> => {
    const response = await api.get('/properties');
    return response.data;
  },

  getById: async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  create: async (property: Omit<Property, 'id'>): Promise<Property> => {
    const response = await api.post('/properties', property);
    return response.data;
  },

  update: async (id: string, property: Omit<Property, 'id'>): Promise<Property> => {
    const response = await api.put(`/properties/${id}`, property);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },
};

export default propertyService; 