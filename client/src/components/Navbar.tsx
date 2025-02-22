import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { useSearchParams } from 'react-router';
import useGlobalContext from '../hooks/useGlobalContext';
import { useEffect, useState } from 'react';
import { AllCategories } from '../services/queries';
import SkeletonLoader from './SkeletonLoader';
import useFetch from '../hooks/useFetch';

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCategory } = useGlobalContext();
  const categValue = searchParams.get('c');
  const { isLoading, response, fetchData } = useFetch<{ categories: string[] }>(
    { initialLoading: true }
  );
  const [options, setOptions] = useState<string[]>(['']);

  const handleCategoryClick = (categ: string) => {
    if (categ) setSearchParams({ c: categ });
    else setSearchParams({});
  };

  useEffect(() => {
    setCategory?.(categValue || '');
  }, [categValue]);

  useEffect(() => {
    fetchData(AllCategories);
  }, []);

  useEffect(() => {
    if (response) {
      const modOptions = ['', ...response.categories];
      setOptions([...new Set(modOptions)]);
    }
  }, [response]);

  return (
    <nav className='px-4 py-2'>
      <div className='center_sect flex justify-between items-center'>
        <div>
          {isLoading ? (
            <SkeletonLoader width='200px' height='30px' />
          ) : (
            options.map((option) => (
              <button
                key={option}
                className={`nav_btn ${
                  (categValue ?? '') === option ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick(option)}
              >
                {option || 'all'}
              </button>
            ))
          )}
        </div>

        <RiShoppingBag2Fill size={25} className='text-green-500' />

        <div className='relative'>
          <AiOutlineShoppingCart size={25} />
          <span className='absolute top-0 right-0 translate-x-[25%] translate-y-[-30%] flex items-center justify-center bg-black text-white rounded-full text-xs px-1'>
            5
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
