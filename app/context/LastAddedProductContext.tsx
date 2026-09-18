import { createContext, useCallback, useMemo, useState } from "react";
import type { CartItem } from "~/types/cart";

interface LastAddedProductContextValue {
  lastAddedProduct: CartItem | null;
  showLastAddedProduct: (cartItem: CartItem) => void;
  hideLastAddedProduct: () => void;
}

export const LastAddedProductContext =
  createContext<LastAddedProductContextValue | null>(null);

interface LastAddedProductProviderProps {
  children: React.ReactNode;
}

export const LastAddedProductProvider = ({
  children,
}: LastAddedProductProviderProps) => {
  const [lastAddedProduct, setLastAddedProduct] = useState<CartItem | null>(
    null,
  );

  const showLastAddedProduct = useCallback((cartItem: CartItem) => {
    setLastAddedProduct(cartItem);
  }, []);

  const hideLastAddedProduct = useCallback(() => {
    setLastAddedProduct(null);
  }, []);

  const value = useMemo(
    () => ({
      lastAddedProduct,
      showLastAddedProduct,
      hideLastAddedProduct,
    }),
    [lastAddedProduct, showLastAddedProduct, hideLastAddedProduct],
  );

  return (
    <LastAddedProductContext.Provider value={value}>
      {children}
    </LastAddedProductContext.Provider>
  );
};
