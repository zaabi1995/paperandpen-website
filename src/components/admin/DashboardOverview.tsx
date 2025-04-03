'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';

export default function DashboardOverview() {
  const { t } = useI18n();
  
  // Sample data for dashboard
  const stats = [
    { name: 'Total Sales', value: 'OMR 12,456.00', change: '+12%', changeType: 'increase' },
    { name: 'Orders', value: '156', change: '+8%', changeType: 'increase' },
    { name: 'Customers', value: '86', change: '+15%', changeType: 'increase' },
    { name: 'Avg. Order Value', value: 'OMR 79.85', change: '-2%', changeType: 'decrease' },
  ];
  
  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2023-03-22', total: 'OMR 125.00', status: 'Completed' },
    { id: 'ORD-002', customer: 'Sarah Smith', date: '2023-03-21', total: 'OMR 89.50', status: 'Processing' },
    { id: 'ORD-003', customer: 'Mohammed Al-Farsi', date: '2023-03-20', total: 'OMR 210.75', status: 'Completed' },
    { id: 'ORD-004', customer: 'Fatima Al-Balushi', date: '2023-03-19', total: 'OMR 45.00', status: 'Pending' },
    { id: 'ORD-005', customer: 'Ahmed Al-Siyabi', date: '2023-03-18', total: 'OMR 156.25', status: 'Completed' },
  ];
  
  const topProducts = [
    { name: 'A4 Size paper', sales: 250, revenue: 'OMR 1,050.00' },
    { name: 'Black Box file', sales: 180, revenue: 'OMR 1,080.00' },
    { name: 'Premium Ballpoint Pens (12 pack)', sales: 120, revenue: 'OMR 450.00' },
    { name: 'Desk Organizer', sales: 85, revenue: 'OMR 756.50' },
    { name: 'Sticky Notes Assorted Colors', sales: 95, revenue: 'OMR 237.50' },
  ];
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-medium text-gray-500">{stat.name}</div>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              <div className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Top Products */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Sold
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
