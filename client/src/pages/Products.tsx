import useGlobalContext from '../hooks/useGlobalContext';

const Products = () => {
  const { category } = useGlobalContext();

  return (
    <section>
      <div className='center_sect'>
        <h1 className='py-4'>{category || 'All'}</h1>
      </div>
    </section>
  );
};

export default Products;
