import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function Layout({ children, params }: LayoutProps): React.ReactNode {
  const { locale } = params;
  
  return (
    <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}
