import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Validate locale
  if (locale !== 'en' && locale !== 'ar') {
    redirect('/en'); // Default to English if invalid locale
  }

  return <>{children}</>;
}
