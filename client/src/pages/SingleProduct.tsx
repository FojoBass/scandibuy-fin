import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import {
  Attribute,
  CartItem,
  Product,
  ProductResponse,
  SelAttribute,
} from '../types';
import { GetProduct } from '../services/queries';
import { FaAngleRight, FaHome } from 'react-icons/fa';
import SkeletonLoader from '../components/SkeletonLoader';
import { FaAngleLeft } from 'react-icons/fa6';
import parse from 'html-react-parser';
import useCart from '../hooks/useCart';
import { kebabFormatter } from '../helpers';

const SingleProduct = () => {
  const { id } = useParams();
  const { isLoading, response, fetchReq } = useFetch<
    { product: ProductResponse },
    { id: string }
  >({ initialLoading: true });
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<SelAttribute[]>(
    []
  );
  const [isDisableCartBtn, setIsDisableCartBtn] = useState(false);
  const { addToCart } = useCart();

  // console.log('ATTRIBUTES: ', attributes);
  // console.log('SEL ATTRIBUTES: ', selectedAttributes);

  const handleSelAttribute = (id: string, value: string) => {
    const targetAttr = attributes.find((attr) => attr.id === id);
    const selItem = targetAttr?.items.find((item) => item.value === value);

    if (targetAttr && selItem) {
      // ? If attribute has a selected option
      if (selectedAttributes.some(({ id: selId }) => selId === id))
        setSelectedAttributes((prev) => [
          ...prev.map((selAttr) =>
            selAttr.id === id
              ? {
                  ...selAttr,
                  selItem,
                }
              : selAttr
          ),
        ]);
      else
        setSelectedAttributes((prev) => [
          ...prev,
          { id: targetAttr.id, selItem },
        ]);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        id: product.id,
        attributes,
        imgUrl: product.gallery[0],
        price: product.prices[0].amount,
        currencySymbol: product.prices[0].currency.symbol,
        qty: 1,
        selAttributes: selectedAttributes,
        name: product.name,
      };
      addToCart({ cartItem });
    }
  };

  useEffect(() => {
    if (id) {
      fetchReq(GetProduct, { id });
    } else navigate('/');
  }, [id]);

  // console.log({ product });

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

  useEffect(() => {
    setIsDisableCartBtn(selectedAttributes.length !== attributes.length);
  }, [attributes, selectedAttributes]);

  return (
    <section className='mt-5 px-4 pb-20'>
      <div className='center_sect'>
        <Link
          to='/'
          className='duration-150 border border-transparent p-1 hover:border-green-500 rounded-sm block w-fit hover:text-green-500 mb-5'
        >
          <FaHome size={20} />
        </Link>

        <div className='flex gap-20 items-start '>
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
              <div className='w-[70%] flex gap-5 items-start sticky top-5'>
                <aside
                  className='w-[10%] flex flex-col gap-4'
                  data-testid='product-gallery'
                >
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
                    className={`absolute z-[1] top-[50%] translate-y-[-50%] left-10 bg-black text-white opacity-50 duration-200 hover:opacity-100 cursor-pointer p-1 ${
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
                    className={`absolute z-[1] top-[50%] translate-y-[-50%] right-10 bg-black text-white opacity-50 duration-200 hover:opacity-100 cursor-pointer p-1 ${
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
                    {product.gallery.map((url, index) => (
                      <div key={url} className='w-[800px]  flex justify-center'>
                        <img
                          src={url}
                          alt={product.name}
                          style={{
                            width: 'auto',
                            height: 'auto',
                            maxHeight: '600px',
                          }}
                          className={`${
                            currentIndex === index ? 'opacity-100' : 'opacity-0'
                          } duration-200`}
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
                  {attributes.map(({ id, items, name }) => (
                    <div
                      key={id}
                      className='mb-5'
                      data-testid={`product-attribute-${kebabFormatter(name)}`}
                    >
                      <b className='uppercase text-sm'>{id}:</b>
                      <div className='flex gap-2'>
                        {items.map(({ displayValue, value }) => {
                          const isSelected = selectedAttributes.some(
                            ({ id: selId, selItem }) =>
                              selId === id && selItem.value === value
                          );

                          return id.toLowerCase() === 'color' ? (
                            <button
                              key={displayValue}
                              className={`w-7 border-2 p-[2px] duration-200 cursor-pointer aspect-square  ${
                                isSelected
                                  ? 'border-green-500'
                                  : 'border-transparent'
                              }`}
                              style={{
                                backgroundColor: value,
                                backgroundClip: 'content-box',
                              }}
                              onClick={() => handleSelAttribute(id, value)}
                              disabled={isSelected || !product.inStock}
                              data-testid={`product-attribute-${kebabFormatter(
                                name
                              )}-${kebabFormatter(value, true)}`}
                            />
                          ) : (
                            <button
                              key={displayValue}
                              className={`border border-black py-1  text-center w-[50px] text-sm cursor-pointer ${
                                isSelected ? 'bg-black text-white' : ''
                              }`}
                              onClick={() => handleSelAttribute(id, value)}
                              disabled={isSelected || !product.inStock}
                              data-testid={`product-attribute-${kebabFormatter(
                                name
                              )}-${kebabFormatter(value, true)}`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div>
                    <b className='uppercase text-sm block w-fit'>Price:</b>
                    <b className='text-lg'>
                      {product.prices[0].currency.symbol}
                      {product.prices[0].amount.toLocaleString()}
                    </b>
                  </div>
                </div>

                {Boolean(product.inStock) && (
                  <button
                    className={`mt-6 block bg-green-600  duration-300 w-full text-white py-3  ${
                      isDisableCartBtn
                        ? 'cursor-not-allowed opacity-50 grayscale-100'
                        : 'cursor-pointer hover:bg-green-500'
                    }`}
                    disabled={isDisableCartBtn}
                    onClick={handleAddToCart}
                    data-testid='add-to-cart'
                  >
                    ADD TO CART
                  </button>
                )}

                <div
                  className='mt-6 text-sm desc_wrapper'
                  data-testid='product-description'
                >
                  {parse(product.description)}
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
