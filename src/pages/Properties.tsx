import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import PropertyCard from '../components/PropertyCard';
import Modal from '../components/Modal';
import PropertyForm from '../components/forms/PropertyForm';
import propertyService, { Property } from '../services/propertyService';

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      const data = await propertyService.getAll();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Failed to load properties');
      console.error('Error loading properties:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProperty = async (propertyData: Omit<Property, 'id'>) => {
    try {
      const newProperty = await propertyService.create(propertyData);
      setProperties(prev => [...prev, newProperty]);
      setIsAddModalOpen(false);
    } catch (err) {
      setError('Failed to add property');
      console.error('Error adding property:', err);
    }
  };

  const handleEditProperty = async (id: string, propertyData: Omit<Property, 'id'>) => {
    try {
      const updatedProperty = await propertyService.update(id, propertyData);
      setProperties(prev => prev.map(p => p.id === id ? updatedProperty : p));
      setIsViewModalOpen(false);
    } catch (err) {
      setError('Failed to update property');
      console.error('Error updating property:', err);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyService.delete(id);
        setProperties(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        setError('Failed to delete property');
        console.error('Error deleting property:', err);
      }
    }
  };

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-400 hover:from-blue-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-300"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            {...property}
            onView={() => handleViewProperty(property)}
            onDelete={() => handleDeleteProperty(property.id)}
          />
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Property"
      >
        <PropertyForm onSubmit={handleAddProperty} />
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedProperty?.name || 'Property Details'}
      >
        {selectedProperty && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProperty.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Units</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProperty.units}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Occupancy</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProperty.occupancy}%</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1 text-sm text-gray-900">{selectedProperty.status}</p>
              </div>
            </div>
            {selectedProperty.images && selectedProperty.images.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Images</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProperty.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6">
              <PropertyForm
                initialData={selectedProperty}
                onSubmit={(data) => handleEditProperty(selectedProperty.id, data)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 