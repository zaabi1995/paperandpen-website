import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductManagement from '@/components/admin/ProductManagement';

export default function ProductsPage(): React.ReactNode {
  return (
    <AdminLayout>
      <ProductManagement />
    </AdminLayout>
  );
}
