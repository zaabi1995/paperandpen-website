'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define product type
export type Product = {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  category: string;
  image: string;
  stock: number;
  is_featured: boolean;
};

// Define product context type
interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  getProducts: (options?: { 
    category?: string; 
    featured?: boolean;
    search?: string;
    sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
  }) => Promise<Product[]>;
  getProductById: (id: number) => Promise<Product | null>;
}

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Sample products data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: { 
      en: 'A4 Size paper', 
      ar: 'ورق مقاس A4' 
    },
    description: { 
      en: 'High-quality A4 paper for everyday printing and copying needs. 80gsm, 500 sheets per pack.', 
      ar: 'ورق A4 عالي الجودة لاحتياجات الطباعة والنسخ اليومية. 80 جرام، 500 ورقة في العبوة.'
    },
    price: 4.200,
    category: 'paper',
    image: '/images/products/a4-paper.jpg',
    stock: 500,
    is_featured: true
  },
  {
    id: 2,
    name: { 
      en: 'Black Box file', 
      ar: 'ملف صندوق أسود' 
    },
    description: { 
      en: 'Durable box file for document storage and organization. Includes label holder and metal finger ring.', 
      ar: 'ملف صندوق متين لتخزين وتنظيم المستندات. يشمل حامل ملصق وحلقة معدنية للأصابع.'
    },
    price: 6.000,
    category: 'filing',
    image: '/images/products/box-file.jpg',
    stock: 200,
    is_featured: true
  },
  {
    id: 3,
    name: { 
      en: 'Business Cards with Lamination', 
      ar: 'بطاقات عمل مع تغليف' 
    },
    description: { 
      en: 'Custom designed business cards with lamination - box of 100 pcs. Premium 350gsm card with glossy finish.', 
      ar: 'بطاقات عمل مصممة حسب الطلب مع تغليف - علبة من 100 قطعة. بطاقة فاخرة 350 جرام مع لمسة نهائية لامعة.'
    },
    price: 6.500,
    category: 'printing',
    image: '/images/products/business-cards.jpg',
    stock: 50,
    is_featured: false
  },
  {
    id: 4,
    name: { 
      en: 'Classic Highlighter (6 pieces)', 
      ar: 'قلم تحديد كلاسيكي (6 قطع)' 
    },
    description: { 
      en: 'Set of 6 highlighters in assorted colors for marking important text. Chisel tip for broad or fine highlighting.', 
      ar: 'مجموعة من 6 أقلام تحديد بألوان متنوعة لتمييز النص المهم. طرف إزميل للتمييز العريض أو الدقيق.'
    },
    price: 1.000,
    category: 'pens',
    image: '/images/products/highlighter.jpg',
    stock: 150,
    is_featured: true
  },
  {
    id: 5,
    name: { 
      en: 'Sticky Notes Assorted Colors', 
      ar: 'ملاحظات لاصقة بألوان متنوعة' 
    },
    description: { 
      en: 'Pack of 5 sticky note pads in assorted colors. 100 sheets per pad, perfect for reminders and quick notes.', 
      ar: 'عبوة من 5 دفاتر ملاحظات لاصقة بألوان متنوعة. 100 ورقة لكل دفتر، مثالية للتذكير والملاحظات السريعة.'
    },
    price: 2.500,
    category: 'office-supplies',
    image: '/images/products/sticky-notes.jpg',
    stock: 200,
    is_featured: false
  },
  {
    id: 6,
    name: { 
      en: 'Premium Ballpoint Pens (12 pack)', 
      ar: 'أقلام حبر جاف فاخرة (12 قلم)' 
    },
    description: { 
      en: 'Set of 12 premium ballpoint pens with smooth writing experience. Blue ink, medium point.', 
      ar: 'مجموعة من 12 قلم حبر جاف فاخر مع تجربة كتابة سلسة. حبر أزرق، نقطة متوسطة.'
    },
    price: 3.750,
    category: 'pens',
    image: '/images/products/ballpoint-pens.jpg',
    stock: 300,
    is_featured: true
  },
  {
    id: 7,
    name: { 
      en: 'Desk Organizer', 
      ar: 'منظم مكتب' 
    },
    description: { 
      en: 'Multi-compartment desk organizer for storing stationery and keeping your workspace tidy.', 
      ar: 'منظم مكتب متعدد الأقسام لتخزين القرطاسية والحفاظ على مساحة العمل الخاصة بك مرتبة.'
    },
    price: 8.900,
    category: 'office-supplies',
    image: '/images/products/desk-organizer.jpg',
    stock: 75,
    is_featured: false
  },
  {
    id: 8,
    name: { 
      en: 'A3 Drawing Paper', 
      ar: 'ورق رسم A3' 
    },
    description: { 
      en: 'High-quality A3 drawing paper, 120gsm. Perfect for sketching, drawing and art projects.', 
      ar: 'ورق رسم A3 عالي الجودة، 120 جرام. مثالي للرسم التخطيطي والرسم ومشاريع الفن.'
    },
    price: 5.500,
    category: 'paper',
    image: '/images/products/a3-paper.jpg',
    stock: 100,
    is_featured: false
  }
];

// Provider component
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get products with optional filtering
  const getProducts = async (options?: { 
    category?: string; 
    featured?: boolean;
    search?: string;
    sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
  }): Promise<Product[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be replaced with an actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter products based on options
      let filteredProducts = [...products];
      
      if (options?.category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category === options.category
        );
      }
      
      if (options?.featured !== undefined) {
        filteredProducts = filteredProducts.filter(product => 
          product.is_featured === options.featured
        );
      }
      
      if (options?.search) {
        const searchTerm = options.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.en.toLowerCase().includes(searchTerm) || 
          product.name.ar.toLowerCase().includes(searchTerm) ||
          product.description.en.toLowerCase().includes(searchTerm) ||
          product.description.ar.toLowerCase().includes(searchTerm)
        );
      }
      
      // Sort products
      if (options?.sort) {
        switch (options.sort) {
          case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'name_asc':
            filteredProducts.sort((a, b) => a.name.en.localeCompare(b.name.en));
            break;
          case 'name_desc':
            filteredProducts.sort((a, b) => b.name.en.localeCompare(a.name.en));
            break;
        }
      }
      
      return filteredProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get product by ID
  const getProductById = async (id: number): Promise<Product | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be replaced with an actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const product = products.find(p => p.id === id) || null;
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to fetch product');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const contextValue = {
    products,
    isLoading,
    error,
    getProducts,
    getProductById
  };
  
  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use product context
export function useProducts() {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
}
