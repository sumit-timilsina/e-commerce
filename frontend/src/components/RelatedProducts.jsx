import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(filteredProducts.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <section className="mt-16">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        {related.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 font-sans text-sm sm:text-base">
            No related products found.
          </p>
        ) : (
          related.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.images?.[0] || ''} // Use images array
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
};

export default RelatedProducts;