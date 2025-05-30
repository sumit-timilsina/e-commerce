import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProductData = () => {
    setLoading(true);
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images[0] || '');
    } else {
      setProductData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }
    addToCart(productData._id, size);
    toast.success('Added to cart!');
  };

  const getSizes = () => {
    if (!productData?.sizes) return [];
    return typeof productData.sizes === 'string' ? JSON.parse(productData.sizes) : productData.sizes;
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {loading ? (
        <motion.div
          className="text-center text-gray-600 font-sans text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading product...
        </motion.div>
      ) : !productData ? (
        <motion.div
          className="text-center text-gray-600 font-sans text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Product not found.{' '}
          <a href="/collection" className="text-gray-900 hover:underline">
            Browse our collection
          </a>.
        </motion.div>
      ) : (
        <>
          {/* Product Section */}
          <motion.div
            className="flex flex-col lg:flex-row gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Image Gallery */}
            <div className="flex-1">
              <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
                {productData.images.map((item, index) => (
                  <motion.img
                    key={index}
                    onClick={() => setImage(item)}
                    src={item}
                    alt={`${productData.name} thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-200 hover:border-gray-900 transition-all"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
              <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <img
                  src={image}
                  alt={productData.name}
                  className="w-full max-h-[500px] object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <motion.div
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-sans">
                {productData.name}
              </h1>
              <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <img
                    key={i}
                    src={assets.star_icon}
                    alt="Star rating"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                ))}
                <img
                  src={assets.star_dull_icon}
                  alt="Empty star"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <p className="text-sm sm:text-base text-gray-600 font-sans ml-2">
                  (122 reviews)
                </p>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 font-sans">
                {currency}
                {productData.price.toFixed(2)}
              </p>
              <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
                {productData.description}
              </p>

              {/* Sizes */}
              <div>
                <p className="text-sm sm:text-base font-semibold text-gray-900 font-sans mb-2">
                  Select Size
                </p>
                <div className="flex gap-2 flex-wrap">
                  {getSizes().map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`px-4 py-2 border border-gray-200 rounded-full text-sm sm:text-base font-sans transition-all ${
                        size === item
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-900 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Select size ${item}`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-sans text-sm sm:text-base font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Add to cart"
              >
                ADD TO CART
              </motion.button>

              {/* Product Assurance */}
              <hr className="my-6 border-gray-200" />
              <div className="text-sm sm:text-base text-gray-600 font-sans space-y-2">
                <p>100% Original Product</p>
                <p>Cash on Delivery Available</p>
                <p>Easy Return and Exchange within 7 Days</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Description and Reviews */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-sans">
                Description
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-sans">
                {/* Reviews (122) */}
              </p>
            </div>
            <div className="text-sm sm:text-base text-gray-600 font-sans space-y-4 leading-relaxed">
              <p>{productData.description}</p>
            </div>
          </motion.div>

          {/* Related Products */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          >
            <RelatedProducts
              category={productData.category}
              subCategory={productData.subCategory}
            />
          </motion.div>
        </>
      )}
    </section>
  );
};

export default Product;