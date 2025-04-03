'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define i18n context type
interface I18nContextType {
  locale: string;
  translations: Record<string, any>;
  t: (key: string, params?: Record<string, any>) => string;
  isRTL: boolean;
}

// Create context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider component
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const isRTL = locale === 'ar';
  
  // Load translations based on locale
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // This would be replaced with an actual API call or import
        // For demo purposes, we'll use a simple object
        const enTranslations = {
          common: {
            home: 'Home',
            products: 'Products',
            about: 'About Us',
            contact: 'Contact',
            cart: 'Cart',
            checkout: 'Checkout',
            login: 'Login',
            search: 'Search',
            addToCart: 'Add to Cart',
            viewDetails: 'View Details',
            back: 'Back',
            loading: 'Loading...',
            continue: 'Continue',
            quantity: 'Quantity'
          },
          home: {
            hero: {
              title: 'Your One-Stop Shop for Office Supplies',
              subtitle: 'Quality products for your business needs',
              cta: 'Shop Now'
            },
            featuredProducts: {
              title: 'Featured Products',
              viewAll: 'View All Products'
            },
            partners: {
              title: 'Our Partners',
              description: 'We proudly distribute products from these trusted brands'
            }
          },
          products: {
            title: 'All Products',
            searchPlaceholder: 'Search products...',
            sortBy: 'Sort by:',
            sortOptions: {
              default: 'Default',
              priceLow: 'Price: Low to High',
              priceHigh: 'Price: High to Low',
              nameAsc: 'Name: A to Z',
              nameDesc: 'Name: Z to A'
            },
            noProducts: 'No products found'
          },
          productDetail: {
            additionalInfo: 'Additional Information',
            category: 'Category',
            sku: 'SKU',
            availability: 'Availability',
            inStock: 'In Stock',
            outOfStock: 'Out of Stock'
          },
          checkout: {
            title: 'Checkout',
            stepCustomerInfo: 'Customer Info',
            stepPayment: 'Payment',
            stepConfirmation: 'Confirmation',
            customerInfo: 'Customer Information',
            customerInfoPrompt: 'Enter your email or phone number to continue',
            emailOrPhonePlaceholder: 'Email or phone number',
            errorEmptyLookup: 'Please enter your email or phone number',
            errorLookup: 'Error looking up customer information',
            errorIncompleteForm: 'Please fill in all required fields',
            errorRegistration: 'Error registering customer',
            newCustomer: 'New Customer',
            newCustomerPrompt: 'Please provide your information to continue',
            fullName: 'Full Name',
            email: 'Email',
            phoneNumber: 'Phone Number',
            address: 'Address',
            city: 'City',
            paymentMethod: 'Payment Method',
            welcomeBack: 'Welcome back, {{name}}!',
            rewardPoints: 'You have {{points}} reward points available',
            usePoints: 'Use my points for this order',
            payWithThawani: 'Pay with Thawani',
            thawaniDescription: 'Secure online payment',
            payOnPickup: 'Pay on Pickup',
            pickupDescription: 'Pay when you pick up your order',
            processing: 'Processing...',
            completeOrder: 'Complete Order',
            orderSuccess: 'Order Successful!',
            orderSuccessMessage: 'Thank you for your order. We have received your purchase request.',
            orderNumber: 'Order Number',
            thawaniSuccessMessage: 'Your payment has been processed successfully. You will receive an email confirmation shortly.',
            pickupSuccessMessage: 'Your order is being prepared for pickup. You will receive an email with pickup instructions shortly.',
            continueShopping: 'Continue Shopping',
            orderSummary: 'Order Summary',
            subtotal: 'Subtotal',
            shipping: 'Shipping',
            free: 'Free',
            freeShippingMessage: 'Free shipping on orders over OMR 50',
            pointsDiscount: 'Points Discount',
            total: 'Total',
            orderItems: 'Order Items',
            qty: 'Qty'
          }
        };
        
        const arTranslations = {
          common: {
            home: 'الرئيسية',
            products: 'المنتجات',
            about: 'من نحن',
            contact: 'اتصل بنا',
            cart: 'سلة التسوق',
            checkout: 'الدفع',
            login: 'تسجيل الدخول',
            search: 'بحث',
            addToCart: 'أضف إلى السلة',
            viewDetails: 'عرض التفاصيل',
            back: 'رجوع',
            loading: 'جاري التحميل...',
            continue: 'متابعة',
            quantity: 'الكمية'
          },
          home: {
            hero: {
              title: 'متجرك الشامل للوازم المكتبية',
              subtitle: 'منتجات عالية الجودة لاحتياجات عملك',
              cta: 'تسوق الآن'
            },
            featuredProducts: {
              title: 'منتجات مميزة',
              viewAll: 'عرض جميع المنتجات'
            },
            partners: {
              title: 'شركاؤنا',
              description: 'نحن نوزع بفخر منتجات من هذه العلامات التجارية الموثوقة'
            }
          },
          products: {
            title: 'جميع المنتجات',
            searchPlaceholder: 'البحث عن منتجات...',
            sortBy: 'ترتيب حسب:',
            sortOptions: {
              default: 'الافتراضي',
              priceLow: 'السعر: من الأقل إلى الأعلى',
              priceHigh: 'السعر: من الأعلى إلى الأقل',
              nameAsc: 'الاسم: من أ إلى ي',
              nameDesc: 'الاسم: من ي إلى أ'
            },
            noProducts: 'لم يتم العثور على منتجات'
          },
          productDetail: {
            additionalInfo: 'معلومات إضافية',
            category: 'الفئة',
            sku: 'رمز المنتج',
            availability: 'التوفر',
            inStock: 'متوفر',
            outOfStock: 'غير متوفر'
          },
          checkout: {
            title: 'إتمام الطلب',
            stepCustomerInfo: 'معلومات العميل',
            stepPayment: 'الدفع',
            stepConfirmation: 'التأكيد',
            customerInfo: 'معلومات العميل',
            customerInfoPrompt: 'أدخل بريدك الإلكتروني أو رقم هاتفك للمتابعة',
            emailOrPhonePlaceholder: 'البريد الإلكتروني أو رقم الهاتف',
            errorEmptyLookup: 'الرجاء إدخال بريدك الإلكتروني أو رقم هاتفك',
            errorLookup: 'خطأ في البحث عن معلومات العميل',
            errorIncompleteForm: 'الرجاء ملء جميع الحقول المطلوبة',
            errorRegistration: 'خطأ في تسجيل العميل',
            newCustomer: 'عميل جديد',
            newCustomerPrompt: 'الرجاء تقديم معلوماتك للمتابعة',
            fullName: 'الاسم الكامل',
            email: 'البريد الإلكتروني',
            phoneNumber: 'رقم الهاتف',
            address: 'العنوان',
            city: 'المدينة',
            paymentMethod: 'طريقة الدفع',
            welcomeBack: 'مرحبًا بعودتك، {{name}}!',
            rewardPoints: 'لديك {{points}} نقطة مكافأة متاحة',
            usePoints: 'استخدم نقاطي لهذا الطلب',
            payWithThawani: 'الدفع بواسطة ثواني',
            thawaniDescription: 'دفع آمن عبر الإنترنت',
            payOnPickup: 'الدفع عند الاستلام',
            pickupDescription: 'ادفع عند استلام طلبك',
            processing: 'جاري المعالجة...',
            completeOrder: 'إتمام الطلب',
            orderSuccess: 'تم الطلب بنجاح!',
            orderSuccessMessage: 'شكرًا لطلبك. لقد تلقينا طلب الشراء الخاص بك.',
            orderNumber: 'رقم الطلب',
            thawaniSuccessMessage: 'تمت معالجة دفعتك بنجاح. ستتلقى تأكيدًا عبر البريد الإلكتروني قريبًا.',
            pickupSuccessMessage: 'يتم تجهيز طلبك للاستلام. ستتلقى بريدًا إلكترونيًا مع تعليمات الاستلام قريبًا.',
            continueShopping: 'مواصلة التسوق',
            orderSummary: 'ملخص الطلب',
            subtotal: 'المجموع الفرعي',
            shipping: 'الشحن',
            free: 'مجاني',
            freeShippingMessage: 'شحن مجاني للطلبات التي تزيد عن 50 ريال عماني',
            pointsDiscount: 'خصم النقاط',
            total: 'الإجمالي',
            orderItems: 'عناصر الطلب',
            qty: 'الكمية'
          }
        };
        
        setTranslations(locale === 'ar' ? arTranslations : enTranslations);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    
    loadTranslations();
  }, [locale]);
  
  // Translation function
  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((str, [param, val]) => {
        return str.replace(new RegExp(`{{${param}}}`, 'g'), String(val));
      }, value);
    }
    
    return value;
  };
  
  const contextValue = { 
    locale, 
    translations, 
    t, 
    isRTL 
  };
  
  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

// Custom hook to use i18n context
export function useI18n() {
  const context = useContext(I18nContext);
  
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
}
