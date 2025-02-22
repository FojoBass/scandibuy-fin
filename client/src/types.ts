import { Dispatch, SetStateAction } from 'react';

export interface Context {
  category?: string;
  setCategory?: Dispatch<SetStateAction<string>>;
}
