import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import MaintenanceCard from '../components/MaintenanceCard';

const maintenanceRequests = [
  {
    id: 1,
    title: 'Leaking Faucet',
    description: 'Kitchen sink faucet is leaking and needs repair',
    property: 'Sunset Apartments',
    unit: '101',
    tenant: 'John Doe',
    status: 'Pending',
    priority: 'Medium',
    date: '2024-02-20',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Broken Window',
    description: 'Living room window is cracked and needs replacement',
    property: 'Ocean View Condos',
    unit: '202',
    tenant: 'Jane Smith',
    status: 'In Progress',
    priority: 'High',
    date: '2024-02-19',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'HVAC Not Working',
    description: 'Air conditioning unit is not cooling properly',
    property: 'Mountain Heights',
    unit: '303',
    tenant: 'Bob Johnson',
    status: 'Completed',
    priority: 'High',
    date: '2024-02-18',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Door Lock Issue',
    description: 'Front door lock is sticking and difficult to open',
    property: 'Downtown Lofts',
    unit: '404',
    tenant: 'Alice Brown',
    status: 'Pending',
    priority: 'Low',
    date: '2024-02-17',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
};

const priorityColors = {
  Low: 'bg-gray-100 text-gray-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
};

export default function Maintenance() {
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all maintenance requests including their status, priority, and assigned property.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {maintenanceRequests.map((request) => (
          <MaintenanceCard key={request.id} {...request} />
        ))}
      </div>
    </div>
  );
} 