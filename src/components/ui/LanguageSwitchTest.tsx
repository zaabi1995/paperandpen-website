'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import Link from 'next/link';

export default function LanguageSwitchTest() {
  const { locale, t, isRTL } = useI18n();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{t('common.home')}</h1>
        
        <p className="mb-4">
          {locale === 'en' ? 'Current language: English' : 'اللغة الحالية: العربية'}
        </p>
        
        <p className="mb-4">
          {locale === 'en' ? 'Text direction: ' : 'اتجاه النص: '}
          {isRTL ? 
            (locale === 'en' ? 'Right to Left' : 'من اليمين إلى اليسار') : 
            (locale === 'en' ? 'Left to Right' : 'من اليسار إلى اليمين')
          }
        </p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{t('home.hero.title')}</h2>
          <p>{t('home.hero.subtitle')}</p>
        </div>
        
        <div className="flex space-x-4 rtl:space-x-reverse">
          <Link 
            href="/en/test" 
            className={`px-4 py-2 rounded-md ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            English
          </Link>
          <Link 
            href="/ar/test" 
            className={`px-4 py-2 rounded-md ${locale === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            العربية
          </Link>
        </div>
      </div>
    </div>
  );
}
