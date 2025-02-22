import { useState } from 'react';
import { AppContext } from './hooks/useGlobalContext';
import { Context } from './types';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState('');

  const sharedProps: Context = { category, setCategory };
  return (
    <AppContext.Provider value={sharedProps}>{children}</AppContext.Provider>
  );
};
