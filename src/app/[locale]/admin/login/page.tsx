import React, { ReactNode } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';

interface PageProps {
  children?: ReactNode;
}

export default function LoginPage({}: PageProps): React.ReactElement {
  return <AdminLogin />;
}
