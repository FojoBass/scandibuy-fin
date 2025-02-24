import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { Attribute, Product, ProductResponse } from '../types';
import { GetProduct } from '../services/queries';
import { FaAngleRight, FaHome } from 'react-icons/fa';
import SkeletonLoader from '../components/SkeletonLoader';
import { FaAngleLeft } from 'react-icons/fa6';

const SingleProduct = () => {
  const { id } = useParams();
  const { isLoading, response, fetchData } = useFetch<
    { product: ProductResponse },
    { id: string }
  >({ initialLoading: true });
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchData(GetProduct, { id });
    } else navigate('/');
  }, [id]);

  console.log({ product });

  useEffect(() => {
    if (response) {
      const modResp = {
        ...response.product,
        prices: JSON.parse(response.product.prices),
        attributes: JSON.parse(response.product.attributes.attributes),
        gallery: JSON.parse(response.product.gallery),
      } as Product;

      setProduct(modResp);
    }
  }, [response]);

  useEffect(() => {
    setAttributes(product?.attributes ?? []);
  }, [product]);

  console.log({ attributes });

  return (
    <section className='mt-5 px-4 pb-20'>
      <div className='center_sect'>
        <Link
          to='/'
          className='duration-150 border border-transparent p-1 hover:border-green-500 rounded-sm block w-fit hover:text-green-500 mb-5'
        >
          <FaHome size={20} />
        </Link>

        <div className='flex gap-20'>
          {isLoading ? (
            <>
              <div className='w-[60%] flex gap-5'>
                <SkeletonLoader width='20%' height='300px' />
                <SkeletonLoader width='80%' height='500px' />
              </div>

              <SkeletonLoader width='30%' height='500px' />
            </>
          ) : product ? (
            <>
              <div className='w-[70%] flex gap-5 items-start '>
                <aside className='w-[10%] flex flex-col gap-4'>
                  {product.gallery.map((url, index) => (
                    <button
                      key={url}
                      className={`cursor-pointer aspect-square border  hover:border-black p-1 duration-200 hover:grayscale-0 ${
                        currentIndex === index
                          ? 'border-green-500 grayscale-0 pointer-events-none'
                          : 'grayscale-100 border-transparent opacity-70'
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <img
                        src={url}
                        alt='alternative view'
                        className='aspect-[inherit]'
                      />
                    </button>
                  ))}
                </aside>

                <div className='w-[90%]  h-[750px] max-h-[95vh] relative flex items-center justify-center overflow-x-hidden gallery_wrapper'>
                  <button
                    className={`absolute z-10 top-[50%] translate-y-[-50%] left-10 bg-black text-white opacity-50 duration-200 hover:opacity-100 cursor-pointer p-1 ${
                      currentIndex === 0 ? 'hidden' : ''
                    }`}
                    onClick={() =>
                      currentIndex !== 0
                        ? setCurrentIndex(currentIndex - 1)
                        : null
                    }
                    disabled={currentIndex === 0}
                  >
                    <FaAngleLeft />
                  </button>

                  <button
                    className={`absolute z-10 top-[50%] translate-y-[-50%] right-10 bg-black text-white opacity-50 duration-200 hover:opacity-100 cursor-pointer p-1 ${
                      currentIndex >= product.gallery.length - 1 ? 'hidden' : ''
                    }`}
                    onClick={() =>
                      currentIndex < product.gallery.length
                        ? setCurrentIndex(currentIndex + 1)
                        : null
                    }
                    disabled={currentIndex >= product.gallery.length - 1}
                  >
                    <FaAngleRight />
                  </button>

                  <div
                    ref={sliderRef}
                    className='flex absolute duration-300'
                    style={{ left: `${-currentIndex * 100}%` }}
                  >
                    {product.gallery.map((url) => (
                      <div key={url} className='w-[800px]  flex justify-center'>
                        <img
                          src={url}
                          alt={product.name}
                          style={{
                            width: 'auto',
                            height: 'auto',
                            maxHeight: '600px',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className='w-[20%]'>
                <h1 className='font-bold capitalize text-2xl mb-5'>
                  {product.name}
                </h1>

                <div>
                  {attributes.map(({ id, items }) => (
                    <div key={id}>
                      <b>{id}</b>
                      <div className='flex gap-2 mb-3'>
                        {items.map(({ displayValue, value }) =>
                          id.toLowerCase() === 'color' ? (
                            <button
                              key={displayValue}
                              className='w-7 cursor-pointer aspect-square p-1'
                              style={{ backgroundColor: value }}
                            />
                          ) : (
                            <button
                              key={displayValue}
                              className='border border-black py-1  text-center w-[50px] text-sm cursor-pointer'
                            >
                              {value}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </>
          ) : (
            <div className='text-center w-fit mx-auto mt-20'>
              <h1 className='font-semibold text-red-500'>Ooops!</h1>

              <p>Product not found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
