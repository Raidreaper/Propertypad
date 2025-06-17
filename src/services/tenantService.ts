import api from './api';

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  status: string;
  imageUrl?: string;
}

const tenantService = {
  getAll: async (): Promise<Tenant[]> => {
    const response = await api.get('/tenants');
    return response.data;
  },

  getById: async (id: string): Promise<Tenant> => {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  },

  create: async (tenant: Omit<Tenant, 'id'>): Promise<Tenant> => {
    const response = await api.post('/tenants', tenant);
    return response.data;
  },

  update: async (id: string, tenant: Partial<Tenant>): Promise<Tenant> => {
    const response = await api.put(`/tenants/${id}`, tenant);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tenants/${id}`);
  },
};

export default tenantService; 