import { MouseEventHandler, useEffect, useState } from 'react';
import useGlobalContext from '../hooks/useGlobalContext';
import useFetch from '../hooks/useFetch';
import { Product, ProductResponse } from '../types';
import { AllProducts, CategoryProducts } from '../services/queries';
import SkeletonLoader from '../components/SkeletonLoader';
import { Link } from 'react-router';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { kebabFormatter } from '../helpers';

const Products = () => {
  const { category } = useGlobalContext();
  const { fetchData, isLoading, response } = useFetch<
    { products?: ProductResponse[]; categProduct?: ProductResponse[] },
    { categ: string } | undefined
  >({
    initialLoading: true,
  });
  const [products, setProducts] = useState<Product[]>([]);

  console.log({ products, response });

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    const el = e.target as HTMLElement;

    if (el.dataset.id === 'prod-cart-btn') {
      e.preventDefault();
      console.log('ADD DEFAULTS TO CART');
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    if (category)
      fetchData(CategoryProducts, { categ: category }, controller.signal);
    else fetchData(AllProducts, undefined, controller.signal);

    return () => {
      controller.abort(new Error('Aborted due to change in category'));
    };
  }, [category]);

  useEffect(() => {
    if (response) {
      const modResp = (
        response.products
          ? response.products
          : response.categProduct
          ? response.categProduct
          : []
      ).map((item) => ({
        ...item,
        prices: JSON.parse(item.prices),
        attributes: JSON.parse(item.attributes.attributes),
        gallery: JSON.parse(item.gallery),
      })) as Product[];

      setProducts(modResp);
    }
  }, [response]);

  return (
    <section className='mt-5 px-4 pb-20'>
      <div className='center_sect'>
        <h1 className='py-4 capitalize font-semibold'>{category}</h1>

        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-15'>
          {isLoading
            ? new Array(6)
                .fill('')
                .map((_, index) => (
                  <SkeletonLoader width='auto' height='250px' key={index} />
                ))
            : products.map(
                ({ gallery, name, prices, id, inStock, category }) => (
                  <Link
                    to={`/p/${id}?c=${category}`}
                    key={name}
                    className={`block hover:shadow-lg duration-300 p-3 rounded-md relative ${
                      inStock ? '' : 'grayscale-100 opacity-50 '
                    }`}
                    onClick={handleLinkClick}
                    data-testid={`product-${kebabFormatter(name)}`}
                  >
                    <div className='w-[100%] aspect-[1/1] relative group'>
                      <img src={gallery[0]} alt={name} />
                      {Boolean(inStock) && (
                        <button
                          className='p-2 bg-green-500 text-white rounded-full absolute bottom-0 right-5 translate-y-[50%] cursor-pointer group-hover:opacity-100 group-hover:z-10 opacity-0 z-0 duration-300'
                          data-id='prod-cart-btn'
                        >
                          <AiOutlineShoppingCart
                            className='pointer-events-none'
                            size={25}
                          />
                        </button>
                      )}
                    </div>
                    <p>{name}</p>
                    <b>
                      {prices[0].currency.symbol}
                      {prices[0].amount}
                    </b>
                    {Boolean(inStock) || (
                      <h3 className='text-2xl font-semibold absolute translate-[-50%] top-[50%] left-[50%]'>
                        OUT OF STOCK
                      </h3>
                    )}
                  </Link>
                )
              )}
        </div>
      </div>
    </section>
  );
};

export default Products;
