import AdminLayout from '@/components/admin/AdminLayout';
import OrderManagement from '@/components/admin/OrderManagement';

export default function OrdersPage() {
  return (
    <AdminLayout>
      <OrderManagement />
    </AdminLayout>
  );
}
