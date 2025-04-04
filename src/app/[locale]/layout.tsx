import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function Layout({ children, params }: LayoutProps) {
  const { locale } = params;
  
  return (
    <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}
