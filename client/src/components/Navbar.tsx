import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
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
  const [options, setOptions] = useState<string[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCategoryClick = (categ: string) => {
    if (pathname !== '/') navigate(`/?c${categ}`);
    setSearchParams({ c: categ });
  };

  useEffect(() => {
    setCategory?.(categValue || '');
  }, [categValue]);

  useEffect(() => {
    fetchData(AllCategories);
  }, []);

  useEffect(() => {
    if (response) {
      setOptions(response.categories);
      setSearchParams({ c: response.categories[0] });
    }
  }, [response]);

  useEffect(() => {
    if (pathname === '/' && options.length && !categValue)
      setSearchParams({ c: options[0] });
  }, [pathname, options, categValue]);

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
                className={`nav_btn ${categValue === option ? 'active' : ''}`}
                onClick={() => handleCategoryClick(option)}
                data-testid={
                  categValue === option
                    ? 'active-category-link'
                    : 'category-link'
                }
              >
                {option}
              </button>
            ))
          )}
        </div>

        <RiShoppingBag2Fill size={25} className='text-green-500' />

        <button className='relative cursor-pointer'>
          <AiOutlineShoppingCart size={25} />
          <span className='absolute top-0 right-0 translate-x-[25%] translate-y-[-30%] flex items-center justify-center bg-black text-white rounded-full text-xs px-1'>
            5
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
