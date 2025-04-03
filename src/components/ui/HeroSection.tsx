'use client';

import { useI18n } from '@/lib/i18n';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const { locale, t, isRTL } = useI18n();

  return (
    <section className="hero-section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`${isRTL ? 'order-2 md:order-2' : 'order-1 md:order-1'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href={`/${locale}/products`} 
                className="btn-primary"
              >
                {t('home.hero.exploreProducts')}
              </Link>
              <Link 
                href={`/${locale}/contact`} 
                className="btn-outline bg-white"
              >
                {t('home.hero.contactUs')}
              </Link>
            </div>
          </div>
          <div className={`${isRTL ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}>
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src="/images/hero-stationery.jpg"
                alt="Premium stationery and office supplies"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
