import { createContext, useContext } from 'react';
import { Context } from '../types';

export const AppContext = createContext<Context>({});

const useGlobalContext = () => useContext(AppContext);

export default useGlobalContext;
