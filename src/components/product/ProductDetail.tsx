'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { useProducts, Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import Link from 'next/link';
import Image from 'next/image';

type ProductDetailProps = {
  productId: number;
};

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { locale, t, isRTL } = useI18n();
  const { getProductById, isLoading, error } = useProducts();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  // Fetch product on initial load
  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
    };
    
    fetchProduct();
  }, [getProductById, productId]);
  
  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
    
    // Show toast notification (would be implemented with a toast library)
    alert(t('common.addedToCart'));
  };
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (product && value > product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(value);
    }
  };
  
  // Categories mapping
  const categories = [
    { id: 'paper', name: { en: 'Paper', ar: 'ورق' } },
    { id: 'pens', name: { en: 'Pens', ar: 'أقلام' } },
    { id: 'filing', name: { en: 'Filing', ar: 'حفظ الملفات' } },
    { id: 'office-supplies', name: { en: 'Office Supplies', ar: 'لوازم مكتبية' } },
    { id: 'printing', name: { en: 'Printing', ar: 'طباعة' } },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      ) : !product ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Product not found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96 w-full">
              <Image
                src={product.image}
                alt={product.name[locale as keyof typeof product.name]}
                fill
                style={{ objectFit: 'contain' }}
                className="p-4"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {product.name[locale as keyof typeof product.name]}
            </h1>
            
            <p className="text-2xl text-blue-600 font-bold mb-6">
              OMR {product.price.toFixed(3)}
            </p>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                {product.description[locale as keyof typeof product.description]}
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                {t('productDetail.additionalInfo')}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t('productDetail.category')}</p>
                  <p className="font-medium">
                    {categories.find(c => c.id === product.category)?.name[locale as keyof typeof categories[0].name] || product.category}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">{t('productDetail.sku')}</p>
                  <p className="font-medium">SKU-{product.id.toString().padStart(4, '0')}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">{t('productDetail.availability')}</p>
                  <p className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? t('productDetail.inStock') : t('productDetail.outOfStock')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <label className="mr-4 font-medium">{t('common.quantity')}:</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center border-t border-b border-gray-300 py-1"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full md:w-auto"
                disabled={product.stock <= 0}
              >
                {t('common.addToCart')}
              </button>
            </div>
            
            {/* Back to Products */}
            <div>
              <Link href={`/${locale}/products`} className="text-blue-600 hover:text-blue-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('common.back')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
