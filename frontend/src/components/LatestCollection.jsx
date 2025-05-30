import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Discover our newest arrivals, handpicked to refresh your style and elevate your everyday. Dive into quality, trend, and exclusive designs crafted just for you.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {latestProducts.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <ProductItem
              id={item._id}
              image={item.images[0]}
              name={item.name}
              price={item.price}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LatestCollection;