import React, { ReactNode } from 'react';
import { redirect } from 'next/navigation';

interface PageProps {
  children?: ReactNode;
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: PageProps): React.ReactElement {
  const { locale } = params;
  
  // Validate locale
  if (locale !== 'en' && locale !== 'ar') {
    redirect('/en'); // Default to English if invalid locale
  }

  return (
    <div className="home-page">
      <h1 className="text-3xl font-bold">Paper and Pen Company</h1>
      <p className="mt-4">Welcome to our online store!</p>
    </div>
  );
}
