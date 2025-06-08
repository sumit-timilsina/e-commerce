import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { motion } from 'framer-motion';

const OurPolicy = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={assets.exchange_icon}
            alt="Easy Exchange Policy"
            className="w-12 mb-5"
          />
          <p className="text-base sm:text-lg font-semibold text-gray-900 font-sans">
            Easy Exchange Policy
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-sans mt-2">
            Enjoy hassle-free exchanges within 30 days for a seamless shopping experience.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={assets.quality_icon}
            alt="7 Days Return Policy"
            className="w-12 mb-5"
          />
          <p className="text-base sm:text-lg font-semibold text-gray-900 font-sans">
            7 Days Return Policy
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-sans mt-2">
            Return items within 7 days for a full refund, no questions asked.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={assets.support_img}
            alt="24/7 Customer Support"
            className="w-12 mb-5"
          />
          <p className="text-base sm:text-lg font-semibold text-gray-900 font-sans">
            24/7 Customer Support
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-sans mt-2">
            Get help anytime with our dedicated 24/7 customer support team.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurPolicy;