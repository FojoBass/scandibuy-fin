import { useEffect, useState } from 'react';
import useGlobalContext from '../hooks/useGlobalContext';
import useFetch from '../hooks/useFetch';
import { Product, ProductResponse } from '../types';
import { AllProducts, CategoryProducts } from '../services/queries';
import SkeletonLoader from '../components/SkeletonLoader';

// todo Set abort signal for category change

const Products = () => {
  const { category } = useGlobalContext();
  const { fetchData, isLoading, response } = useFetch<
    { products: ProductResponse[] },
    { category: string } | undefined
  >({
    initialLoading: true,
  });
  const [products, setProducts] = useState<Product[]>([]);

  console.log({ products, response });

  useEffect(() => {
    if (category) fetchData(CategoryProducts, { category });
    else fetchData(AllProducts);
  }, [category]);

  useEffect(() => {
    if (response) {
      const modResp = response.products.map((item) => ({
        ...item,
        prices: JSON.parse(item.prices),
        attributes: JSON.parse(item.attributes.attributes),
        gallery: JSON.parse(item.gallery),
      })) as Product[];

      setProducts(modResp);
    }
  }, [response]);

  return (
    <section className='mt-5'>
      <div className='center_sect'>
        <h1 className='py-4 capitalize font-semibold'>{category || 'All'}</h1>

        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
          {isLoading
            ? new Array(3)
                .fill('')
                .map((_, index) => (
                  <SkeletonLoader width='auto' height='250px' key={index} />
                ))
            : 'Products here'}
        </div>
      </div>
    </section>
  );
};

export default Products;
