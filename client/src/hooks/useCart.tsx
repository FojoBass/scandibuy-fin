import { useMemo } from 'react';
import { CartItem } from '../types';
import useGlobalContext from './useGlobalContext';

const useCart = () => {
  const { cart, setCart, setIsCartOpened } = useGlobalContext();
  const cartTotalItems = useMemo<number>(() => {
    return cart ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  }, [cart]);
  const cartTotalAmount = useMemo<number>(() => {
    return cart
      ? cart.reduce((sum, item) => sum + item.price * item.qty, 0)
      : 0;
  }, [cart]);

  const productSelAttrInCart = (item: CartItem, newItem: CartItem): boolean => {
    console.log({ item, newItem });
    for (let i = 0; i < item.selAttributes.length; i++) {
      if (
        !newItem.selAttributes.some(
          ({ id, selItem }) =>
            selItem.id === item.selAttributes[i].selItem.id &&
            id === item.selAttributes[i].id
        )
      ) {
        return false;
      }
    }

    return true;
  };

  const addToCart = ({ cartItem }: { cartItem: CartItem }) => {
    const productItemsInCart =
      cart?.filter(({ id }) => id === cartItem.id) ?? [];
    let isProductInCart = false;

    for (let i = 0; i < productItemsInCart.length; i++) {
      if (productSelAttrInCart(productItemsInCart[i], cartItem)) {
        setCart?.((prev) =>
          prev.map((item, index) =>
            index === i ? { ...item, qty: item.qty + 1 } : item
          )
        );
        isProductInCart = true;
        break;
      }
    }

    if (!isProductInCart) setCart?.((prev) => [...prev, cartItem]);
    setIsCartOpened?.(true);
  };

  const adjustQty = (
    type: 'increment' | 'decrement',
    itemId: string | number,
    qty?: number
  ) => {
    switch (type) {
      case 'increment':
        setCart?.((prev) =>
          prev.map((cartItem) =>
            cartItem.id === itemId
              ? {
                  ...cartItem,
                  qty: cartItem.qty + 1,
                }
              : cartItem
          )
        );
        break;
      case 'decrement':
        if (qty && qty <= 1)
          setCart?.((prev) => prev.filter(({ id }) => id !== itemId));
        else
          setCart?.((prev) =>
            prev.map((cartItem) =>
              cartItem.id === itemId
                ? {
                    ...cartItem,
                    qty: cartItem.qty - 1,
                  }
                : cartItem
            )
          );

        break;
      default:
        return;
    }
  };

  return { addToCart, adjustQty, cartTotalItems, cartTotalAmount };
};

export default useCart;
