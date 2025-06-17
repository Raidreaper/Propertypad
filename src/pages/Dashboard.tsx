import React from 'react';
import { BuildingOfficeIcon, UsersIcon, WrenchScrewdriverIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Properties', value: '12', icon: BuildingOfficeIcon, change: '+2', changeType: 'increase' },
  { name: 'Active Tenants', value: '24', icon: UsersIcon, change: '+4', changeType: 'increase' },
  { name: 'Maintenance Requests', value: '5', icon: WrenchScrewdriverIcon, change: '-2', changeType: 'decrease' },
  { name: 'Monthly Revenue', value: '$12,500', icon: CurrencyDollarIcon, change: '+8%', changeType: 'increase' },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add recent activity items here */}
            <p className="text-gray-500">No recent activity</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Maintenance</h2>
          <div className="space-y-4">
            {/* Add upcoming maintenance items here */}
            <p className="text-gray-500">No upcoming maintenance</p>
          </div>
        </div>
      </div>
    </div>
  );
} 