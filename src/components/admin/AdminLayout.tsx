import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): React.ReactNode {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2 className="text-xl font-bold p-4">Admin Dashboard</h2>
        <nav className="admin-nav">
          <ul>
            <li className="p-2">Dashboard</li>
            <li className="p-2">Products</li>
            <li className="p-2">Orders</li>
            <li className="p-2">Customers</li>
          </ul>
        </nav>
      </div>
      <div className="admin-content p-4">
        {children}
      </div>
    </div>
  );
}
