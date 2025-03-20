import { useState } from 'react';
import { AppContext } from './hooks/useGlobalContext';
import { CartItem, Context } from './types';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpened, setIsCartOpened] = useState(false);

  console.log({ cart });

  const sharedProps: Context = {
    category,
    setCategory,
    cart,
    setCart,
    isCartOpened,
    setIsCartOpened,
  };
  return (
    <AppContext.Provider value={sharedProps}>{children}</AppContext.Provider>
  );
};
