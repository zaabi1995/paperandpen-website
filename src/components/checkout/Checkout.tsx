'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Checkout() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const currentLang = isArabic ? 'ar' : 'en';
  
  // Customer information state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [customerPoints, setCustomerPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  
  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('thawani');
  
  // Sample order summary data
  const orderSummary = {
    subtotal: 17.600,
    shipping: 0,
    discount: usePoints ? Math.min(customerPoints * 0.1, 5) : 0,
    total: 17.600 - (usePoints ? Math.min(customerPoints * 0.1, 5) : 0)
  };
  
  // Handle customer lookup
  const handleCustomerLookup = () => {
    // This would be implemented with actual API calls in the e-commerce functionality step
    if (email === 'customer@example.com' || phone === '12345678') {
      setIsExistingCustomer(true);
      setName('John Doe');
      setAddress('123 Main St');
      setCity('Muscat');
      setCustomerPoints(50);
    } else {
      setIsExistingCustomer(false);
      setName('');
      setAddress('');
      setCity('');
      setCustomerPoints(0);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be implemented with actual API calls in the checkout process step
    console.log('Order submitted', {
      customer: { email, phone, name, address, city },
      paymentMethod,
      orderSummary
    });
    // Redirect to confirmation page or payment gateway
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {isArabic ? 'الدفع' : 'Checkout'}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {isArabic ? 'معلومات العميل' : 'Customer Information'}
              </h2>
              
              {/* Email/Phone Lookup */}
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  {isArabic 
                    ? 'أدخل بريدك الإلكتروني أو رقم هاتفك للمتابعة'
                    : 'Enter your email or phone number to continue'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                    />
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleCustomerLookup}
                  className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  {isArabic ? 'متابعة' : 'Continue'}
                </button>
              </div>
              
              {/* Existing Customer Welcome */}
              {isExistingCustomer && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">
                    {isArabic ? 'مرحبًا بعودتك!' : 'Welcome back!'}
                  </h3>
                  <p className="text-blue-700">
                    {isArabic 
                      ? `لديك ${customerPoints} نقطة مكافأة متاحة للاستخدام.`
                      : `You have ${customerPoints} reward points available.`}
                  </p>
                  
                  <div className="mt-2 flex items-center">
                    <input
                      type="checkbox"
                      id="usePoints"
                      checked={usePoints}
                      onChange={(e) => setUsePoints(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="usePoints">
                      {isArabic 
                        ? 'استخدم نقاطي في هذا الطلب'
                        : 'Use my points for this order'}
                    </label>
                  </div>
                </div>
              )}
              
              {/* Customer Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder={isArabic ? 'الاسم الكامل' : 'Full Name'}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {isArabic ? 'العنوان' : 'Address'}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder={isArabic ? 'العنوان' : 'Address'}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {isArabic ? 'المدينة' : 'City'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                    placeholder={isArabic ? 'المدينة' : 'City'}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {isArabic ? 'طريقة الدفع' : 'Payment Method'}
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="thawani"
                    checked={paymentMethod === 'thawani'}
                    onChange={() => setPaymentMethod('thawani')}
                    className="mr-2"
                  />
                  <div>
                    <span className="font-medium">
                      {isArabic ? 'الدفع عبر ثواني' : 'Pay with Thawani'}
                    </span>
                    <p className="text-sm text-gray-500">
                      {isArabic 
                        ? 'دفع آمن عبر بوابة ثواني للدفع الإلكتروني'
                        : 'Secure payment via Thawani payment gateway'}
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pickup"
                    checked={paymentMethod === 'pickup'}
                    onChange={() => setPaymentMethod('pickup')}
                    className="mr-2"
                  />
                  <div>
                    <span className="font-medium">
                      {isArabic ? 'الدفع عند الاستلام' : 'Pay on Pickup'}
                    </span>
                    <p className="text-sm text-gray-500">
                      {isArabic 
                        ? 'ادفع نقدًا أو ببطاقة عند استلام طلبك من متجرنا'
                        : 'Pay with cash or card when you pick up your order from our store'}
                    </p>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Submit Button (Mobile) */}
            <div className="lg:hidden">
              <button type="submit" className="btn-primary w-full">
                {isArabic ? 'إتمام الطلب' : 'Complete Order'}
              </button>
            </div>
          </form>
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
                <span>OMR {orderSummary.subtotal.toFixed(3)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {isArabic ? 'الشحن' : 'Shipping'}
                </span>
                {orderSummary.shipping === 0 ? (
                  <span className="text-green-600">
                    {isArabic ? 'مجاني' : 'Free'}
                  </span>
                ) : (
                  <span>OMR {orderSummary.shipping.toFixed(3)}</span>
                )}
              </div>
              
              {usePoints && customerPoints > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>
                    {isArabic ? 'خصم النقاط' : 'Points Discount'}
                  </span>
                  <span>- OMR {orderSummary.discount.toFixed(3)}</span>
                </div>
              )}
              
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>{isArabic ? 'المجموع' : 'Total'}</span>
                <span>OMR {orderSummary.total.toFixed(3)}</span>
              </div>
            </div>
            
            {/* Submit Button (Desktop) */}
            <div className="hidden lg:block">
              <button 
                type="submit" 
                form="checkout-form" 
                className="btn-primary w-full"
              >
                {isArabic ? 'إتمام الطلب' : 'Complete Order'}
              </button>
            </div>
            
            <div className="mt-6">
              <Link href={`/${currentLang}/cart`} className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {isArabic ? 'العودة إلى سلة التسوق' : 'Back to Cart'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
