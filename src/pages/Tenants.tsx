import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import tenantService, { Tenant } from '../services/tenantService';
import TenantCard from '../components/TenantCard';
import TenantForm from '../components/forms/TenantForm';
import Modal from '../components/Modal';

export default function Tenants() {
  const { user } = useAuth();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      setLoading(true);
      const data = await tenantService.getAll();
      setTenants(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tenants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTenant = async (tenantData: Omit<Tenant, 'id'>) => {
    try {
      const newTenant = await tenantService.create(tenantData);
      setTenants([...tenants, newTenant]);
      setShowAddModal(false);
      setError(null);
    } catch (err) {
      setError('Failed to add tenant. Please try again.');
    }
  };

  const handleDeleteTenant = async (id: string) => {
    try {
      await tenantService.delete(id);
      setTenants(tenants.filter(tenant => tenant.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete tenant. Please try again.');
    }
  };

  const handleViewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowViewModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant) => (
          <TenantCard
            key={tenant.id}
            id={tenant.id}
            name={tenant.name}
            email={tenant.email}
            phone={tenant.phone}
            property={tenant.property}
            unit={tenant.unit}
            status={tenant.status}
            imageUrl={tenant.imageUrl}
            onView={() => handleViewTenant(tenant)}
            onDelete={() => handleDeleteTenant(tenant.id)}
          />
        ))}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Tenant"
      >
        <TenantForm onSubmit={handleAddTenant} />
      </Modal>

      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title={selectedTenant ? `Tenant Details - ${selectedTenant.name}` : 'Tenant Details'}
      >
        {selectedTenant && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {selectedTenant.imageUrl ? (
                <img
                  src={selectedTenant.imageUrl}
                  alt={selectedTenant.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">
                    {selectedTenant.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedTenant.name}</h3>
                <p className="text-sm text-gray-500">{selectedTenant.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTenant.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Property</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTenant.property}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTenant.unit}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTenant.status}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 