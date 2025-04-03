'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define customer type
export type Customer = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  points: number;
  orders_count: number;
};

// Define customer context type
interface CustomerContextType {
  customer: Customer | null;
  isLoading: boolean;
  lookupCustomer: (emailOrPhone: string) => Promise<Customer | null>;
  registerCustomer: (customerData: Omit<Customer, 'id' | 'points' | 'orders_count'>) => Promise<Customer>;
  clearCustomer: () => void;
}

// Create context
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Provider component
export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isClient = typeof window !== 'undefined';
  
  // Load customer from localStorage on initial render
  useEffect(() => {
    if (isClient) {
      const savedCustomer = localStorage.getItem('customer');
      if (savedCustomer) {
        try {
          setCustomer(JSON.parse(savedCustomer));
        } catch (e) {
          console.error('Failed to parse customer from localStorage:', e);
        }
      }
    }
  }, [isClient]);
  
  // Save customer to localStorage whenever it changes
  useEffect(() => {
    if (customer && isClient) {
      localStorage.setItem('customer', JSON.stringify(customer));
    } else if (!customer && isClient) {
      localStorage.removeItem('customer');
    }
  }, [customer, isClient]);
  
  // Lookup customer by email or phone
  const lookupCustomer = async (emailOrPhone: string): Promise<Customer | null> => {
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, return mock data for specific test values
      if (emailOrPhone === 'customer@example.com' || emailOrPhone === '12345678') {
        const foundCustomer: Customer = {
          id: 1,
          name: 'John Doe',
          email: 'customer@example.com',
          phone: '12345678',
          address: '123 Main St',
          city: 'Muscat',
          points: 50,
          orders_count: 3
        };
        
        setCustomer(foundCustomer);
        return foundCustomer;
      }
      
      // No customer found
      return null;
    } catch (error) {
      console.error('Error looking up customer:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register new customer
  const registerCustomer = async (customerData: Omit<Customer, 'id' | 'points' | 'orders_count'>): Promise<Customer> => {
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new customer with default values
      const newCustomer: Customer = {
        id: Math.floor(Math.random() * 1000) + 10, // Generate random ID for demo
        ...customerData,
        points: 0,
        orders_count: 0
      };
      
      setCustomer(newCustomer);
      return newCustomer;
    } catch (error) {
      console.error('Error registering customer:', error);
      throw new Error('Failed to register customer');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear customer
  const clearCustomer = () => {
    setCustomer(null);
    if (isClient) {
      localStorage.removeItem('customer');
    }
  };
  
  const value = {
    customer,
    isLoading,
    lookupCustomer,
    registerCustomer,
    clearCustomer
  };
  
  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

// Custom hook to use customer context
export function useCustomer() {
  const context = useContext(CustomerContext);
  
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  
  return context;
}
