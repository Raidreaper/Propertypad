import React from 'react';
import { BuildingOfficeIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface LandlordCardProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  properties: number;
  status: string;
  imageUrl?: string;
}

export default function LandlordCard({
  id,
  name,
  email,
  phone,
  properties,
  status,
  imageUrl,
}: LandlordCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            {imageUrl ? (
              <img
                className="h-12 w-12 rounded-full"
                src={imageUrl}
                alt={name}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 transition-colors duration-300 hover:text-blue-600">{name}</h3>
            <div className="flex items-center mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {email}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {phone}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BuildingOfficeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {properties} Properties
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
} 