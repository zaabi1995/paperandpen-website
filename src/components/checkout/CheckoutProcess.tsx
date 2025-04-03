'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { useCart } from '@/lib/cart';
import { useCustomer } from '@/lib/customer';
import Link from 'next/link';

export default function CheckoutProcess() {
  const { t, locale } = useI18n();
  const { items, subtotal, clearCart } = useCart();
  const { customer, lookupCustomer, registerCustomer, isLoading } = useCustomer();
  
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });
  const [formError, setFormError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [pointsDiscount, setPointsDiscount] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Handle customer lookup
  const handleLookup = async (e) => {
    e.preventDefault();
    
    if (!emailOrPhone) {
      setLookupError(t('checkout.errorEmptyLookup'));
      return;
    }
    
    setLookupError('');
    const foundCustomer = await lookupCustomer(emailOrPhone);
    
    if (foundCustomer) {
      setStep(2);
    } else {
      setLookupError(t('checkout.errorLookup'));
    }
  };
  
  // Handle new customer registration
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone || !newCustomer.address || !newCustomer.city) {
      setFormError(t('checkout.errorIncompleteForm'));
      return;
    }
    
    setFormError('');
    
    try {
      await registerCustomer(newCustomer);
      setStep(2);
    } catch (error) {
      setFormError(t('checkout.errorRegistration'));
    }
  };
  
  // Handle payment selection
  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };
  
  // Handle points toggle
  const handlePointsToggle = (e) => {
    setUsePoints(e.target.checked);
    
    if (e.target.checked && customer) {
      // Calculate points discount (1 point = 0.1 OMR)
      const discount = Math.min(customer.points * 0.1, subtotal * 0.5);
      setPointsDiscount(discount);
    } else {
      setPointsDiscount(0);
    }
  };
  
  // Handle order completion
  const handleCompleteOrder = async () => {
    if (!paymentMethod) return;
    
    setIsProcessing(true);
    
    try {
      // This would be replaced with an actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random order ID
      const newOrderId = 'ORD-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      setOrderId(newOrderId);
      
      // Clear cart
      clearCart();
      
      // Move to confirmation step
      setStep(3);
    } catch (error) {
      console.error('Error completing order:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Calculate total
  const shipping = 0; // Free shipping
  const total = subtotal - pointsDiscount + shipping;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('checkout.title')}</h1>
        
        {/* Checkout Steps */}
        <div className="mt-4">
          <div className="flex items-center">
            <div className={`flex items-center relative ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'} flex items-center justify-center`}>
                1
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase">
                {t('checkout.stepCustomerInfo')}
              </div>
            </div>
            <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 2 ? 'border-blue-600' : 'border-gray-300'}`}></div>
            <div className={`flex items-center relative ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'} flex items-center justify-center`}>
                2
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase">
                {t('checkout.stepPayment')}
              </div>
            </div>
            <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 3 ? 'border-blue-600' : 'border-gray-300'}`}></div>
            <div className={`flex items-center relative ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 3 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'} flex items-center justify-center`}>
                3
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase">
                {t('checkout.stepConfirmation')}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Step 1: Customer Information */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.customerInfo')}</h2>
              
              {!customer && (
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">{t('checkout.customerInfoPrompt')}</p>
                  
                  <form onSubmit={handleLookup}>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder={t('checkout.emailOrPhonePlaceholder')}
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        className="form-control"
                      />
                      {lookupError && (
                        <p className="mt-1 text-red-600 text-sm">{lookupError}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full"
                    >
                      {isLoading ? t('common.loading') : t('common.continue')}
                    </button>
                  </form>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          {t('checkout.newCustomer')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-gray-600 mb-4">{t('checkout.newCustomerPrompt')}</p>
                      
                      <form onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('checkout.fullName')}
                            </label>
                            <input
                              type="text"
                              value={newCustomer.name}
                              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                              className="form-control"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('checkout.email')}
                            </label>
                            <input
                              type="email"
                              value={newCustomer.email}
                              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                              className="form-control"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('checkout.phoneNumber')}
                            </label>
                            <input
                              type="tel"
                              value={newCustomer.phone}
                              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                              className="form-control"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('checkout.address')}
                            </label>
                            <input
                              type="text"
                              value={newCustomer.address}
                              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                              className="form-control"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('checkout.city')}
                            </label>
                            <input
                              type="text"
                              value={newCustomer.city}
                              onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        
                        {formError && (
                          <p className="mt-4 text-red-600 text-sm">{formError}</p>
                        )}
                        
                        <div className="mt-6">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full"
                          >
                            {isLoading ? t('common.loading') : t('common.continue')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              
              {customer && (
                <div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800 font-medium">
                      {t('checkout.welcomeBack', { name: customer.name })}
                    </p>
                    <p className="text-blue-600 text-sm mt-1">
                      {t('checkout.rewardPoints', { points: customer.points })}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary w-full"
                  >
                    {t('common.continue')}
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.paymentMethod')}</h2>
              
              {customer && customer.points > 0 && (
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="use-points"
                      type="checkbox"
                      checked={usePoints}
                      onChange={handlePointsToggle}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="use-points" className="ml-2 block text-sm text-gray-900">
                      {t('checkout.usePoints')}
                    </label>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'thawani' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'}`}
                  onClick={() => handlePaymentSelection('thawani')}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center">
                        {paymentMethod === 'thawani' && (
                          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{t('checkout.payWithThawani')}</p>
                      <p className="text-sm text-gray-500">{t('checkout.thawaniDescription')}</p>
                    </div>
                  </div>
                </div>
                
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'pickup' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'}`}
                  onClick={() => handlePaymentSelection('pickup')}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center">
                        {paymentMethod === 'pickup' && (
                          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{t('checkout.payOnPickup')}</p>
                      <p className="text-sm text-gray-500">{t('checkout.pickupDescription')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleCompleteOrder}
                  disabled={!paymentMethod || isProcessing}
                  className="btn-primary w-full"
                >
                  {isProcessing ? t('checkout.processing') : t('checkout.completeOrder')}
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('checkout.orderSuccess')}</h2>
              <p className="text-gray-600 mb-6">{t('checkout.orderSuccessMessage')}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500">{t('checkout.orderNumber')}</p>
                <p className="text-lg font-semibold text-gray-900">{orderId}</p>
              </div>
              
              <p className="text-gray-600 mb-6">
                {paymentMethod === 'thawani' 
                  ? t('checkout.thawaniSuccessMessage')
                  : t('checkout.pickupSuccessMessage')
                }
              </p>
              
              <Link href="/" className="btn-primary inline-block">
                {t('checkout.continueShopping')}
              </Link>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">{t('checkout.orderSummary')}</h2>
            
            <div className="mb-4">
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name[locale as keyof typeof item.name]}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>
                              {item.name[locale as keyof typeof item.name]}
                            </h3>
                            <p className="ml-4">
                              OMR {(item.price * item.quantity).toFixed(3)}
                            </p>
                          </div>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <p className="text-gray-500">
                            {t('checkout.qty')}: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <p>{t('checkout.subtotal')}</p>
                <p>OMR {subtotal.toFixed(3)}</p>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <p>{t('checkout.shipping')}</p>
                <p className="text-green-600">{t('checkout.free')}</p>
              </div>
              
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <p>{t('checkout.pointsDiscount')}</p>
                  <p className="text-red-600">-OMR {pointsDiscount.toFixed(3)}</p>
                </div>
              )}
              
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
                <p>{t('checkout.total')}</p>
                <p>OMR {total.toFixed(3)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
