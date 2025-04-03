'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { useProducts, Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import Link from 'next/link';
import Image from 'next/image';

type ProductListingProps = {
  category?: string;
  featured?: boolean;
  limit?: number;
};

export default function ProductListing({ 
  category, 
  featured, 
  limit 
}: ProductListingProps) {
  const { locale, t, isRTL } = useI18n();
  const { getProducts, isLoading, error } = useProducts();
  const { addItem } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<string>('');
  
  // Fetch products on initial load and when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      const options: any = {};
      
      if (category) options.category = category;
      if (featured !== undefined) options.featured = featured;
      if (searchTerm) options.search = searchTerm;
      
      if (sortOption) {
        switch (sortOption) {
          case 'price_low':
            options.sort = 'price_asc';
            break;
          case 'price_high':
            options.sort = 'price_desc';
            break;
          case 'name_asc':
            options.sort = 'name_asc';
            break;
          case 'name_desc':
            options.sort = 'name_desc';
            break;
        }
      }
      
      const fetchedProducts = await getProducts(options);
      setProducts(limit ? fetchedProducts.slice(0, limit) : fetchedProducts);
    };
    
    fetchProducts();
  }, [getProducts, category, featured, searchTerm, sortOption, limit]);
  
  // Handle adding product to cart
  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    
    // Show toast notification (would be implemented with a toast library)
    alert(t('common.addedToCart'));
  };
  
  // Categories for filter
  const categories = [
    { id: 'paper', name: { en: 'Paper', ar: 'ورق' } },
    { id: 'pens', name: { en: 'Pens', ar: 'أقلام' } },
    { id: 'filing', name: { en: 'Filing', ar: 'حفظ الملفات' } },
    { id: 'office-supplies', name: { en: 'Office Supplies', ar: 'لوازم مكتبية' } },
    { id: 'printing', name: { en: 'Printing', ar: 'طباعة' } },
  ];
  
  // Sort options
  const sortOptions = [
    { value: '', label: t('products.sortOptions.default') },
    { value: 'price_low', label: t('products.sortOptions.priceLow') },
    { value: 'price_high', label: t('products.sortOptions.priceHigh') },
    { value: 'name_asc', label: t('products.sortOptions.nameAsc') },
    { value: 'name_desc', label: t('products.sortOptions.nameDesc') },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          {category 
            ? categories.find(c => c.id === category)?.name[locale as keyof typeof categories[0].name] || t('products.title')
            : featured 
              ? t('home.featuredProducts.title') 
              : t('products.title')
          }
        </h1>
        
        {!featured && (
          <div className="w-full md:w-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('products.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control pr-10 w-full md:w-64"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="mr-2 text-sm text-gray-700">{t('products.sortBy')}</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="form-control w-auto"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">{t('products.noProducts')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link href={`/${locale}/products/${product.id}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name[locale as keyof typeof product.name]}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link href={`/${locale}/products/${product.id}`}>
                  <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors duration-300">
                    {product.name[locale as keyof typeof product.name]}
                  </h2>
                </Link>
                
                <p className="text-blue-600 font-bold mb-4">
                  OMR {product.price.toFixed(3)}
                </p>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary-sm"
                    disabled={product.stock <= 0}
                  >
                    {t('common.addToCart')}
                  </button>
                  
                  <Link href={`/${locale}/products/${product.id}`} className="text-sm text-blue-600 hover:text-blue-800">
                    {t('common.viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* View All Link (for featured products) */}
      {featured && products.length > 0 && (
        <div className="text-center mt-8">
          <Link href={`/${locale}/products`} className="btn-outline">
            {t('home.featuredProducts.viewAll')}
          </Link>
        </div>
      )}
    </div>
  );
}
