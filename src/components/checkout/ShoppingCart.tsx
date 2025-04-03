'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type CartItemProps = {
  id: number;
  name: { en: string; ar: string };
  price: number;
  quantity: number;
  image: string;
  isArabic: boolean;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
};

const CartItem = ({ 
  id, 
  name, 
  price, 
  quantity, 
  image, 
  isArabic, 
  onUpdateQuantity, 
  onRemove 
}: CartItemProps) => {
  const lang = isArabic ? 'ar' : 'en';
  
  return (
    <div className="cart-item">
      <div className="flex items-center">
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image
            src={image}
            alt={name[lang]}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="ml-4">
          <h3 className="font-medium">{name[lang]}</h3>
          <p className="text-gray-500 text-sm">OMR {price.toFixed(3)}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <button
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            className="px-2 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onUpdateQuantity(id, parseInt(e.target.value) || 1)}
            className="w-12 text-center border-t border-b border-gray-300 py-1"
          />
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>
        </div>
        
        <div className="text-right">
          <p className="font-bold">OMR {(price * quantity).toFixed(3)}</p>
          <button
            onClick={() => onRemove(id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            {isArabic ? 'إزالة' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ShoppingCart() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const currentLang = isArabic ? 'ar' : 'en';
  
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: { en: 'A4 Size paper', ar: 'ورق مقاس A4' },
      price: 4.200,
      quantity: 2,
      image: '/images/products/a4-paper.jpg',
    },
    {
      id: 2,
      name: { en: 'Black Box file', ar: 'ملف صندوق أسود' },
      price: 6.000,
      quantity: 1,
      image: '/images/products/box-file.jpg',
    },
    {
      id: 4,
      name: { en: 'Classic Highlighter (6 pieces)', ar: 'قلم تحديد كلاسيكي (6 قطع)' },
      price: 1.000,
      quantity: 3,
      image: '/images/products/highlighter.jpg',
    },
  ]);
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 2.000;
  const total = subtotal + shipping;
  
  // Check if cart is empty
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {isArabic ? 'سلة التسوق' : 'Shopping Cart'}
      </h1>
      
      {isCartEmpty ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-xl font-semibold mb-4">
            {isArabic ? 'سلة التسوق فارغة' : 'Your cart is empty'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isArabic 
              ? 'يبدو أنك لم تضف أي منتجات إلى سلة التسوق الخاصة بك بعد.'
              : 'Looks like you haven\'t added any products to your cart yet.'}
          </p>
          <Link href={`/${currentLang}/products`} className="btn-primary">
            {isArabic ? 'تسوق الآن' : 'Shop Now'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {isArabic 
                    ? `المنتجات (${cartItems.length})`
                    : `Products (${cartItems.length})`}
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  {isArabic ? 'إفراغ السلة' : 'Clear Cart'}
                </button>
              </div>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                    isArabic={isArabic}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">
                {isArabic ? 'ملخص الطلب' : 'Order Summary'}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isArabic ? 'المجموع الفرعي' : 'Subtotal'}
                  </span>
                  <span>OMR {subtotal.toFixed(3)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isArabic ? 'الشحن' : 'Shipping'}
                  </span>
                  {shipping === 0 ? (
                    <span className="text-green-600">
                      {isArabic ? 'مجاني' : 'Free'}
                    </span>
                  ) : (
                    <span>OMR {shipping.toFixed(3)}</span>
                  )}
                </div>
                
                {shipping > 0 && (
                  <div className="text-sm text-gray-500">
                    {isArabic 
                      ? 'الشحن مجاني للطلبات التي تزيد عن 50 ريال عماني'
                      : 'Free shipping for orders over OMR 50.000'}
                  </div>
                )}
                
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>{isArabic ? 'المجموع' : 'Total'}</span>
                  <span>OMR {total.toFixed(3)}</span>
                </div>
              </div>
              
              <Link href={`/${currentLang}/checkout`} className="btn-primary w-full text-center block">
                {isArabic ? 'متابعة الدفع' : 'Proceed to Checkout'}
              </Link>
              
              <div className="mt-6">
                <Link href={`/${currentLang}/products`} className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {isArabic ? 'متابعة التسوق' : 'Continue Shopping'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
