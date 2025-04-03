'use client';

import { redirect } from 'next/navigation';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = params;
  
  // Validate locale
  if (locale !== 'en' && locale !== 'ar') {
    redirect('/en'); // Default to English if invalid locale
  }

  return (
    <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}
