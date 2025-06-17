import React from 'react';
import { WrenchScrewdriverIcon, UserCircleIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface MaintenanceCardProps {
  id: number;
  title: string;
  description: string;
  property: string;
  unit: string;
  tenant: string;
  status: string;
  priority: string;
  date: string;
  imageUrl?: string;
}

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

export default function MaintenanceCard({
  id,
  title,
  description,
  property,
  unit,
  tenant,
  status,
  priority,
  date,
  imageUrl,
}: MaintenanceCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <WrenchScrewdriverIcon className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">Unit {unit}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
            >
              {status}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[priority]}`}
            >
              {priority}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <UserCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {tenant}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {date}
          </div>
        </div>
        <div className="mt-4 flex space-x-3">
          <button
            type="button"
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Status
          </button>
          <button
            type="button"
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
} 