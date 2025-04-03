'use client';

import { useI18n } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

type NavItem = {
  key: string;
  href: string;
};

const navItems: NavItem[] = [
  { key: 'common.home', href: '/' },
  { key: 'common.products', href: '/products' },
  { key: 'common.about', href: '/about' },
  { key: 'common.partners', href: '/partners' },
  { key: 'common.contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { locale, t, changeLocale, isRTL } = useI18n();
  
  // Function to toggle language
  const toggleLanguage = () => {
    changeLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <header className={`bg-white shadow-md ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`}>
              <div className="h-10 w-auto">
                <Image 
                  src="https://upload.bhdoman.com/paperandpen/uploads/ppenglish.svg" 
                  alt="Paper & Pen Company Logo" 
                  width={150} 
                  height={40} 
                  priority
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={`/${locale}${item.href}`}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Toggle Language"
            >
              <span className="font-medium text-sm">
                {t('header.toggleLanguage')}
              </span>
            </button>
            
            {/* Cart */}
            <Link href={`/${locale}/cart`} className="relative p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
