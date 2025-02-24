import { Dispatch, SetStateAction } from 'react';

export interface Context {
  category?: string;
  setCategory?: Dispatch<SetStateAction<string>>;
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
