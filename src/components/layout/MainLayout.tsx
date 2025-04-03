'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  
  return (
    <div className={`flex min-h-screen flex-col ${isArabic ? 'font-ge-dinar rtl' : 'font-d-din ltr'}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
