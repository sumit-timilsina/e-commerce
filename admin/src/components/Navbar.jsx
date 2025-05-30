import React from 'react';
import assets from '../assets/logo.png';
import { motion } from 'framer-motion';

const Navbar = ({ setToken }) => {
  return (
    <motion.header
      className="bg-white border-b border-gray-100 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <img src={assets} alt="Admin Panel Logo" className="h-15 sm:h-20 w-auto" />
        <motion.button
          onClick={() => setToken('')}
          className="px-4 py-2 bg-gray-900 text-white font-sans text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Log out of admin panel"
        >
          Logout
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;