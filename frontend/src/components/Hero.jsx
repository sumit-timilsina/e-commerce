import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-[40vh] flex items-center justify-center">
      <motion.div
        className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-xl shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center gap-6 lg:gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <p className="text-sm sm:text-base text-gray-600 font-semibold tracking-wide uppercase font-sans">
            OUR BESTSELLERS
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-sans">
            Latest Arrivals
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-md mx-auto md:mx-0 font-sans leading-relaxed">
            Shop the freshest trends right now and refresh your style with our curated collection.
          </p>
          <motion.button
            onClick={() => navigate('/collection')}
            className="mt-4 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base font-sans hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SHOP NOW
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <img
            src={assets.hero_img}
            alt="Latest Arrivals Collection"
            className="h-32 sm:h-48 md:h-64 lg:h-80 object-contain rounded-lg transition-transform duration-300"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;