'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type FeatureCardProps = {
  icon: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  isArabic: boolean;
};

const FeatureCard = ({ icon, title, description, isArabic }: FeatureCardProps) => {
  const lang = isArabic ? 'ar' : 'en';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 text-blue-600">
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title[lang]}</h3>
      <p className="text-gray-600">{description[lang]}</p>
    </div>
  );
};

type ProductCardProps = {
  id: number;
  name: { en: string; ar: string };
  price: number;
  image: string;
  isArabic: boolean;
  currentLang: string;
};

const ProductCard = ({ id, name, price, image, isArabic, currentLang }: ProductCardProps) => {
  const lang = isArabic ? 'ar' : 'en';
  
  return (
    <div className="product-card">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name[lang]}
          fill
          style={{ objectFit: 'contain' }}
          className="p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{name[lang]}</h3>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-blue-600">
            OMR {price.toFixed(3)}
          </p>
          <button className="btn-primary text-sm py-1 px-3">
            {isArabic ? 'أضف إلى السلة' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const currentLang = isArabic ? 'ar' : 'en';
  
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: { en: 'A4 Size paper', ar: 'ورق مقاس A4' },
      price: 4.200,
      image: '/images/products/a4-paper.jpg',
    },
    {
      id: 2,
      name: { en: 'Black Box file', ar: 'ملف صندوق أسود' },
      price: 6.000,
      image: '/images/products/box-file.jpg',
    },
    {
      id: 3,
      name: { en: 'Business Cards with Lamination', ar: 'بطاقات عمل مع تغليف' },
      price: 6.500,
      image: '/images/products/business-cards.jpg',
    },
    {
      id: 4,
      name: { en: 'Classic Highlighter (6 pieces)', ar: 'قلم تحديد كلاسيكي (6 قطع)' },
      price: 1.000,
      image: '/images/products/highlighter.jpg',
    },
  ];
  
  // Features data
  const features = [
    {
      icon: 'fa-truck',
      title: { en: 'Free Delivery', ar: 'توصيل مجاني' },
      description: { 
        en: 'Free nationwide delivery for orders over 50 OMR', 
        ar: 'توصيل مجاني في جميع أنحاء البلاد للطلبات التي تزيد عن 50 ريال عماني' 
      }
    },
    {
      icon: 'fa-check-circle',
      title: { en: 'Quality Guarantee', ar: 'ضمان الجودة' },
      description: { 
        en: 'All products meet international quality standards', 
        ar: 'جميع المنتجات تلبي معايير الجودة الدولية' 
      }
    },
    {
      icon: 'fa-undo',
      title: { en: 'Easy Returns', ar: 'إرجاع سهل' },
      description: { 
        en: '30-day hassle-free return policy', 
        ar: 'سياسة إرجاع سهلة خلال 30 يومًا' 
      }
    },
    {
      icon: 'fa-headset',
      title: { en: '24/7 Support', ar: 'دعم على مدار الساعة' },
      description: { 
        en: 'Customer service available round the clock', 
        ar: 'خدمة العملاء متاحة على مدار الساعة' 
      }
    },
  ];
  
  // Partners data
  const partners = [
    {
      name: { en: 'Deli', ar: 'ديلي' },
      logo: '/images/partners/deli-logo.png',
      description: { 
        en: 'Leading stationery and office supplies manufacturer', 
        ar: 'شركة رائدة في تصنيع القرطاسية ومستلزمات المكاتب' 
      }
    },
    {
      name: { en: 'Nusign', ar: 'نوساين' },
      logo: '/images/partners/nusign-logo.png',
      description: { 
        en: 'Premium writing instruments and stationery', 
        ar: 'أدوات كتابة وقرطاسية فاخرة' 
      }
    },
    {
      name: { en: 'Dmast', ar: 'دي ماست' },
      logo: '/images/partners/dmast-logo.png',
      description: { 
        en: 'High-quality office and school supplies', 
        ar: 'لوازم مكتبية ومدرسية عالية الجودة' 
      }
    },
  ];

  return (
    <div>
      {/* Hero Section - Will be imported from HeroSection component */}
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isArabic={isArabic}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-8">
            {isArabic ? 'منتجات مميزة' : 'Featured Products'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                isArabic={isArabic}
                currentLang={currentLang}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/${currentLang}/products`} className="btn-primary">
              {isArabic ? 'عرض جميع المنتجات' : 'View All Products'}
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={isArabic ? 'order-2' : 'order-1'}>
              <h2 className="section-title">
                {isArabic ? 'من نحن' : 'About Us'}
              </h2>
              <p className="mb-4 text-gray-700">
                {isArabic 
                  ? 'شركة القلم والورق هي مورد رائد للقرطاسية ومنتجات المكاتب في عمان، مكرسة لتوفير منتجات عالية الجودة تلبي احتياجات الشركات والمؤسسات التعليمية والعملاء الأفراد.'
                  : 'Paper & Pen Company is a leading supplier of stationery and office products in Oman, dedicated to providing high-quality products that meet the needs of businesses, educational institutions, and individual customers.'}
              </p>
              <p className="mb-6 text-gray-700">
                {isArabic
                  ? 'تأسست برؤية لتوفير حلول قرطاسية متميزة بأسعار تنافسية، وقد نمت لتصبح واحدة من أكثر الأسماء الموثوقة في الصناعة. تغطي مجموعة منتجاتنا الواسعة كل شيء من مستلزمات المكاتب الأساسية إلى خدمات الطباعة المتخصصة والهدايا المؤسسية المخصصة.'
                  : 'Established with a vision to provide premium stationery solutions at competitive prices, we have grown to become one of the most trusted names in the industry. Our extensive product range covers everything from essential office supplies to specialized printing services and customized corporate gifts.'}
              </p>
              <Link href={`/${currentLang}/about`} className="btn-outline">
                {isArabic ? 'اقرأ المزيد' : 'Read More'}
              </Link>
            </div>
            <div className={isArabic ? 'order-1' : 'order-2'}>
              <div className="relative h-80 w-full">
                <Image
                  src="/images/about-image.jpg"
                  alt="Paper & Pen Company Office"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-12 partner-section">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-8">
            {isArabic ? 'شركاؤنا' : 'Our Partners'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="relative h-24 w-full mb-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name[currentLang as keyof typeof partner.name]}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {partner.name[currentLang as keyof typeof partner.name]}
                </h3>
                <p className="text-gray-600">
                  {partner.description[currentLang as keyof typeof partner.description]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'جاهز للتسوق؟' : 'Ready to Shop?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isArabic
              ? 'استكشف مجموعتنا الواسعة من القرطاسية ومستلزمات المكاتب عالية الجودة واطلب الآن.'
              : 'Explore our extensive collection of high-quality stationery and office supplies and order now.'}
          </p>
          <Link href={`/${currentLang}/products`} className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
            {isArabic ? 'تسوق الآن' : 'Shop Now'}
          </Link>
        </div>
      </section>
    </div>
  );
}
