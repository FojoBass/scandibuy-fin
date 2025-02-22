import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { useSearchParams } from 'react-router';
import useGlobalContext from '../hooks/useGlobalContext';
import { useEffect } from 'react';

const options = ['', 'clothes', 'tech'];

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCategory } = useGlobalContext();
  const categValue = searchParams.get('c');

  const handleCategoryClick = (categ: string) => {
    if (categ) setSearchParams({ c: categ });
    else setSearchParams({});
  };

  useEffect(() => {
    setCategory?.(categValue || '');
  }, [categValue]);

  return (
    <nav className='px-4 py-2'>
      <div className='center_sect flex justify-between items-center'>
        <div>
          {options.map((option) => (
            <button
              key={option}
              className={`nav_btn ${
                (categValue ?? '') === option ? 'active' : ''
              }`}
              onClick={() => handleCategoryClick(option)}
            >
              {option || 'all'}
            </button>
          ))}
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
