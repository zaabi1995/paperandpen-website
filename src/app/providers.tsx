import { CartProvider } from '@/lib/cart';
import { CustomerProvider } from '@/lib/customer';
import { ProductProvider } from '@/lib/products';
import { I18nProvider } from '@/lib/i18n';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nProvider>
      <ProductProvider>
        <CustomerProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </CustomerProvider>
      </ProductProvider>
    </I18nProvider>
  );
}
