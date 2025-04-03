'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';

export default function OrderManagement() {
  const { t } = useI18n();
  
  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      date: '2023-03-22',
      total: 'OMR 125.00',
      status: 'Completed',
      items: [
        { name: 'A4 Size paper', quantity: 5, price: 'OMR 4.200' },
        { name: 'Black Box file', quantity: 2, price: 'OMR 6.000' },
        { name: 'Premium Ballpoint Pens (12 pack)', quantity: 1, price: 'OMR 3.750' }
      ]
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Smith',
      email: 'sarah@example.com',
      date: '2023-03-21',
      total: 'OMR 89.50',
      status: 'Processing',
      items: [
        { name: 'Desk Organizer', quantity: 1, price: 'OMR 8.900' },
        { name: 'Sticky Notes Assorted Colors', quantity: 2, price: 'OMR 2.500' }
      ]
    },
    {
      id: 'ORD-003',
      customer: 'Mohammed Al-Farsi',
      email: 'mohammed@example.com',
      date: '2023-03-20',
      total: 'OMR 210.75',
      status: 'Completed',
      items: [
        { name: 'A3 Drawing Paper', quantity: 3, price: 'OMR 5.500' },
        { name: 'Business Cards with Lamination', quantity: 2, price: 'OMR 6.500' }
      ]
    },
    {
      id: 'ORD-004',
      customer: 'Fatima Al-Balushi',
      email: 'fatima@example.com',
      date: '2023-03-19',
      total: 'OMR 45.00',
      status: 'Pending',
      items: [
        { name: 'Classic Highlighter (6 pieces)', quantity: 3, price: 'OMR 1.000' }
      ]
    },
    {
      id: 'ORD-005',
      customer: 'Ahmed Al-Siyabi',
      email: 'ahmed@example.com',
      date: '2023-03-18',
      total: 'OMR 156.25',
      status: 'Completed',
      items: [
        { name: 'A4 Size paper', quantity: 10, price: 'OMR 4.200' },
        { name: 'Premium Ballpoint Pens (12 pack)', quantity: 2, price: 'OMR 3.750' }
      ]
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle viewing order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  
  // Handle updating order status
  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Order Management</h1>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control pr-10 w-full"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
        
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-control w-full md:w-48"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
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
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Details - {selectedOrder.id}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Customer Information</h4>
                  <p className="text-sm text-gray-900">{selectedOrder.customer}</p>
                  <p className="text-sm text-gray-900">{selectedOrder.email}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Order Information</h4>
                  <p className="text-sm text-gray-900">Date: {selectedOrder.date}</p>
                  <p className="text-sm text-gray-900">Total: {selectedOrder.total}</p>
                  <div className="mt-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      selectedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                      selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Order Items</h4>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Update Status</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Pending')}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      selectedOrder.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Processing')}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      selectedOrder.status === 'Processing' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Completed')}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      selectedOrder.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Cancelled')}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      selectedOrder.status === 'Cancelled' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
