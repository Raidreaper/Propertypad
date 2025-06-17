import React from 'react';
import {
  UsersIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { colors } from '../../theme/colors';

const stats = [
  {
    name: 'Total Users',
    value: '1,234',
    icon: UsersIcon,
    change: '+12%',
    changeType: 'increase',
  },
  {
    name: 'Total Properties',
    value: '456',
    icon: BuildingOfficeIcon,
    change: '+8%',
    changeType: 'increase',
  },
  {
    name: 'Active Maintenance',
    value: '89',
    icon: WrenchScrewdriverIcon,
    change: '-3%',
    changeType: 'decrease',
  },
  {
    name: 'Monthly Revenue',
    value: '$45,678',
    icon: CurrencyDollarIcon,
    change: '+15%',
    changeType: 'increase',
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'user_registration',
    user: 'John Doe',
    timestamp: '2 minutes ago',
    details: 'New property manager registered',
  },
  {
    id: 2,
    type: 'property_added',
    user: 'Jane Smith',
    timestamp: '1 hour ago',
    details: 'Added new property: Ocean View Condos',
  },
  {
    id: 3,
    type: 'maintenance_completed',
    user: 'Bob Johnson',
    timestamp: '3 hours ago',
    details: 'Completed maintenance request #123',
  },
  {
    id: 4,
    type: 'payment_received',
    user: 'Alice Brown',
    timestamp: '5 hours ago',
    details: 'Received rent payment for Unit 101',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Overview of system performance and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    stat.changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-500"> from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UsersIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className="text-sm text-gray-500">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">
                  View Reports
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Access detailed analytics and reports
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Manage Users
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage user accounts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShieldCheckIcon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-medium text-gray-900">
                  System Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure system preferences
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 