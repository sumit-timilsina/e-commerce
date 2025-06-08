import React from 'react';
import { motion } from 'framer-motion';

const NewsLetterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-sans">
          Subscribe Now & Get 30% Off
        </p>
        <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Join our community to stay updated on the latest trends, exclusive offers, and new arrivals. Sign up today and enjoy a special discount on your next purchase!
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto"
        >
          <input
            className="w-full sm:flex-1 px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-300 text-gray-600 text-sm sm:text-base font-sans"
            type="email"
            placeholder="Enter your email"
            aria-label="Email for newsletter subscription"
          />
          <motion.button
            type="submit"
            className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold text-sm sm:text-base font-sans hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SUBSCRIBE
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsLetterBox;