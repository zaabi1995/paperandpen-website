import React, { ReactNode } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductManagement from '@/components/admin/ProductManagement';

interface PageProps {
  children?: ReactNode;
}

export default function ProductsPage({}: PageProps): React.ReactElement {
  return (
    <AdminLayout>
      <ProductManagement />
    </AdminLayout>
  );
}
