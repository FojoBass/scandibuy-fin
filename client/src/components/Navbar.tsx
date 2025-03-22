import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import useGlobalContext from '../hooks/useGlobalContext';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { AllCategories, CreateOrder } from '../services/queries';
import SkeletonLoader from './SkeletonLoader';
import useFetch from '../hooks/useFetch';
import { FaMinus, FaPlus, FaSpinner } from 'react-icons/fa6';
import useCart from '../hooks/useCart';
import { kebabFormatter } from '../helpers';

interface Order {
  product_id: string;
  qty: number;
  attributes: string;
}

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCategory, setToast } = useGlobalContext();
  const categValue = searchParams.get('c');
  const { isLoading, response, fetchReq } = useFetch<{ categories: string[] }>({
    initialLoading: true,
  });
  const [options, setOptions] = useState<string[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isCartOpened, setIsCartOpened, cart, setCart } = useGlobalContext();
  const isDisableOrderBtn = useMemo(() => {
    return !(cart && cart.length > 0);
  }, [cart]);
  const { adjustQty, cartTotalItems, cartTotalAmount } = useCart();
  const { isLoading: orderLoading, fetchReq: orderReq } = useFetch<
    string,
    { orders: Order[] }
  >({
    initialLoading: false,
  });

  const handleCategoryClick = (
    categ: string,
    e: MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (pathname !== '/') navigate(`/?c${categ}`);
    setSearchParams({ c: categ });
  };

  const handleOrder = () => {
    const orders: Order[] =
      cart?.map(({ id, attributes, qty }) => ({
        attributes: JSON.stringify(attributes),
        product_id: id,
        qty,
      })) ?? [];

    orderReq(
      CreateOrder,
      { orders },
      null,
      () => {
        setCart?.([]);
        setIsCartOpened?.(false);
        setToast?.({
          type: 'success',
          message: 'Order Placed Successfully',
          state: true,
        });
      },
      () => {
        setToast?.({ type: 'danger', message: 'Order Failed', state: true });
      }
    );
  };

  useEffect(() => {
    setCategory?.(categValue || '');
  }, [categValue]);

  useEffect(() => {
    fetchReq(AllCategories);
  }, []);

  useEffect(() => {
    if (response) {
      setOptions(['all', ...response.categories]);
      setSearchParams({ c: 'all' });
    }
  }, [response]);

  useEffect(() => {
    if (pathname === '/' && options.length && !categValue)
      setSearchParams({ c: options[0] });
  }, [pathname, options, categValue]);

  console.log({ cart });

  return (
    <nav className='sticky top-0 z-50'>
      <div className='px-4 py-2 bg-white z-[3] relative'>
        <div className='center_sect  flex justify-between items-center'>
          <div>
            {isLoading ? (
              <SkeletonLoader width='200px' height='30px' />
            ) : (
              options.map((option) => (
                <a
                  key={option}
                  className={`nav_btn ${categValue === option ? 'active' : ''}`}
                  onClick={(e) => handleCategoryClick(option, e)}
                  data-testid={
                    categValue === option
                      ? 'active-category-link'
                      : 'category-link'
                  }
                  href={`/${option}`}
                >
                  {option}
                </a>
              ))
            )}
          </div>

          <RiShoppingBag2Fill size={25} className='text-green-500' />

          <button
            className='relative cursor-pointer'
            onClick={() => setIsCartOpened?.(!isCartOpened)}
            data-testid='cart-btn'
          >
            <AiOutlineShoppingCart size={25} />
            <span className='absolute top-0 right-0 translate-x-[25%] translate-y-[-30%] flex items-center justify-center bg-black text-white rounded-full text-xs px-1'>
              {cartTotalItems ? cartTotalItems : ''}
            </span>
          </button>
        </div>
      </div>

      {isCartOpened && (
        <div
          className='fixed bg-[#000000a3] inset-0 z-[2]'
          onClick={(e) =>
            e.currentTarget === e.target && setIsCartOpened?.(false)
          }
          data-testid='cart-overlay'
        >
          <div className='absolute w-[500px]  bg-white top-[60px] right-[20px] p-5'>
            <header>
              <b>My Bag</b>, {cartTotalItems} item
              {cartTotalItems === 1 ? '' : 's'}
            </header>

            <div className='my-5 max-h-[400px] overflow-y-auto'>
              {cart?.length ? (
                [...cart]
                  .reverse()
                  .map(
                    (
                      {
                        attributes,
                        id,
                        imgUrl,
                        price,
                        qty,
                        selAttributes,
                        name,
                        currencySymbol,
                      },
                      ind
                    ) => (
                      <div
                        key={ind}
                        className='flex mb-7 gap-2 items-stretch  overflow-hidden max-h-[500px] h-fit'
                      >
                        <div className='w-[60%] flex flex-col text-sm justify-between'>
                          <h3 className='text-md text-md'>{name}</h3>

                          <p className='font-semibold'>
                            {currencySymbol}
                            {price.toLocaleString()}
                          </p>

                          <div>
                            {attributes.map(
                              ({ id: attrId, items, name: attrName }) => (
                                <div
                                  key={attrId}
                                  className='my-1'
                                  data-testid={`cart-item-attribute-${kebabFormatter(
                                    attrName
                                  )}`}
                                >
                                  <p>{attrName}:</p>
                                  <div className='flex gap-1'>
                                    {items.map(({ displayValue, value }) => {
                                      const isSelected = selAttributes.some(
                                        ({ id: selId, selItem }) =>
                                          selId === attrId &&
                                          selItem.value === value
                                      );

                                      return attrId.toLowerCase() ===
                                        'color' ? (
                                        <span
                                          key={displayValue}
                                          className={`w-7 border-2 p-[2px] duration-200  aspect-square   ${
                                            isSelected
                                              ? 'border-green-500'
                                              : 'border-transparent'
                                          } `}
                                          style={{
                                            backgroundColor: value,
                                            backgroundClip: 'content-box',
                                          }}
                                          data-testid={`cart-item-attribute-${kebabFormatter(
                                            attrName
                                          )}-${kebabFormatter(value, true)}${
                                            isSelected ? '-selected' : ''
                                          }`}
                                        ></span>
                                      ) : (
                                        <span
                                          key={displayValue}
                                          className={`border border-black py-1  text-center w-[50px] text-xs  ${
                                            isSelected
                                              ? 'bg-black text-white'
                                              : ''
                                          }`}
                                          data-testid={`cart-item-attribute-${kebabFormatter(
                                            attrName
                                          )}-${kebabFormatter(value, true)}${
                                            isSelected ? '-selected' : ''
                                          }`}
                                        >
                                          {value}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className='w-[10%] flex flex-col justify-between items-center'>
                          <button
                            className='cursor-pointer border border-black p-1 text-xs active:scale-95'
                            onClick={() => adjustQty('increment', id)}
                            data-testid='cart-item-amount-increase'
                          >
                            <FaPlus />
                          </button>

                          <span data-testid='cart-item-amount'>{qty}</span>

                          <button
                            className='cursor-pointer border border-black p-1 text-xs active:scale-95'
                            onClick={() => adjustQty('decrement', id, qty)}
                            data-testid='cart-item-amount-decrease'
                          >
                            <FaMinus />
                          </button>
                        </div>

                        <div className='w-[30%]'>
                          <img src={imgUrl} alt={name} />
                        </div>
                      </div>
                    )
                  )
              ) : (
                <p className='text-center font-semibold italic text-slate-500'>
                  Cart Empty
                </p>
              )}
            </div>

            <footer className='mt-15'>
              <div className='flex justify-between items-center font-semibold'>
                Total{' '}
                <span>
                  $
                  <span data-testid='cart-total'>
                    {cartTotalAmount.toLocaleString()}
                  </span>
                </span>
              </div>

              <button
                className={`mt-6 block bg-green-600  duration-300 w-full text-white py-3  ${
                  isDisableOrderBtn || orderLoading
                    ? 'cursor-not-allowed opacity-50 grayscale-100'
                    : 'cursor-pointer hover:bg-green-500'
                }`}
                disabled={isDisableOrderBtn || orderLoading}
                onClick={handleOrder}
              >
                {orderLoading ? (
                  <span className='spinner'>
                    <FaSpinner />
                  </span>
                ) : (
                  'PLACE ORDER'
                )}
              </button>
            </footer>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
