import { Dispatch, SetStateAction } from 'react';

export interface Context {
  category?: string;
  setCategory?: Dispatch<SetStateAction<string>>;
  cart?: CartItem[];
  setCart?: Dispatch<SetStateAction<CartItem[]>>;
  isCartOpened?: boolean;
  setIsCartOpened?: Dispatch<SetStateAction<boolean>>;
  toast?: {
    type: 'neutral' | 'danger' | 'success';
    message: string;
    state: boolean;
  };
  setToast?: Dispatch<
    SetStateAction<{
      type: 'neutral' | 'danger' | 'success';
      message: string;
      state: boolean;
    }>
  >;
}

export interface ProductResponse {
  name: string;
  prices: string;
  id: string;
  gallery: string;
  inStock: number;
  category: string;
  attributes: { attributes: string };
}

export interface Product {
  name: string;
  id: string;
  category: string;
  inStock: number;
  gallery: string[];
  prices: { amount: number; currency: { label: string; symbol: string } }[];
  attributes: Attribute[];
  description: string;
}

export interface Attribute {
  id: string;
  items: {
    displayValue: string;
    id: string;
    value: string;
  }[];
  name: string;
  type: string;
}

export interface SelAttribute {
  id: string;
  selItem: {
    displayValue: string;
    id: string;
    value: string;
  };
}

export interface CartItem {
  selAttributes: SelAttribute[];
  attributes: Attribute[];
  qty: number;
  price: number;
  imgUrl: string;
  id: string;
  name: string;
  currencySymbol: string;
}
