import React from 'react';
import { UserIcon, EnvelopeIcon, PhoneIcon, HomeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface TenantCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  status: string;
  imageUrl?: string;
  onView: () => void;
  onDelete: () => void;
}

export default function TenantCard({
  id,
  name,
  email,
  phone,
  property,
  unit,
  status,
  imageUrl,
  onView,
  onDelete,
}: TenantCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 border-2 border-transparent hover:border-blue-400 hover:border-dashed">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-gray-500" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900 transition-colors duration-300 hover:text-blue-600">{name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              {email}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {phone}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <HomeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {property} - Unit {unit}
          </div>
          <div className="flex items-center text-sm">
            {status === 'Active' ? (
              <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
            ) : (
              <XCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" />
            )}
            <span className={status === 'Active' ? 'text-green-600' : 'text-red-600'}>
              {status}
            </span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <button
            type="button"
            onClick={onView}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-pink-400 hover:from-pink-400 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 