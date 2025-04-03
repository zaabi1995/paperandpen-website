'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const currentLang = isArabic ? 'ar' : 'en';
  
  const footerLinks = {
    company: [
      { name: { en: 'About Us', ar: 'من نحن' }, href: '/about' },
      { name: { en: 'Contact', ar: 'اتصل بنا' }, href: '/contact' },
      { name: { en: 'Careers', ar: 'وظائف' }, href: '/careers' },
    ],
    products: [
      { name: { en: 'Paper', ar: 'ورق' }, href: '/products/paper' },
      { name: { en: 'Pens', ar: 'أقلام' }, href: '/products/pens' },
      { name: { en: 'Filing', ar: 'حفظ الملفات' }, href: '/products/filing' },
      { name: { en: 'Office Supplies', ar: 'لوازم مكتبية' }, href: '/products/office-supplies' },
    ],
    support: [
      { name: { en: 'FAQ', ar: 'الأسئلة الشائعة' }, href: '/faq' },
      { name: { en: 'Shipping', ar: 'الشحن' }, href: '/shipping' },
      { name: { en: 'Returns', ar: 'الإرجاع' }, href: '/returns' },
      { name: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' }, href: '/privacy' },
    ],
  };

  return (
    <footer className={`bg-gray-900 text-white ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href={`/${currentLang}`}>
              <div className="h-10 w-auto mb-4">
                <Image 
                  src="https://upload.bhdoman.com/paperandpen/uploads/ppwhiteenglish.svg" 
                  alt="Paper & Pen Company Logo" 
                  width={150} 
                  height={40} 
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-400 mt-2">
              {isArabic 
                ? 'شركة رائدة في مجال القرطاسية ومستلزمات المكاتب في عمان'
                : 'Leading stationery and office supplies company in Oman'}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isArabic ? 'الشركة' : 'Company'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={`/${currentLang}${link.href}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name[currentLang as keyof typeof link.name]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Products Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isArabic ? 'المنتجات' : 'Products'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={`/${currentLang}${link.href}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name[currentLang as keyof typeof link.name]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isArabic ? 'الدعم' : 'Support'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={`/${currentLang}${link.href}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name[currentLang as keyof typeof link.name]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Paper & Pen Company. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              {isArabic ? 'تم التصميم والتطوير بواسطة' : 'Designed and developed by'} Manus AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
