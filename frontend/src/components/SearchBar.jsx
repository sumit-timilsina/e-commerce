import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  return (
    showSearch && visible ? (
      <motion.section
        className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="relative w-full max-w-lg flex items-center gap-4">
          <motion.div
            className="relative bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden focus-within:shadow-lg transition-all duration-300 flex-grow"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img
                src={assets.search_icon}
                alt="Search Icon"
                className="w-5 h-5 text-gray-600"
              />
            </div>
            <input
              type="text"
              placeholder="Explore our collections..."
              className="block w-full pl-10 pr-10 py-3 sm:py-4 bg-transparent text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 font-sans text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search collections"
            />
            {search && (
              <motion.button
                type="button"
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={assets.cross_icon}
                  alt="Clear Search"
                  className="w-4 h-4 text-gray-600 hover:text-gray-900"
                />
              </motion.button>
            )}
          </motion.div>
          <motion.button
            onClick={() => setShowSearch(false)}
            className="bg-gray-900 text-white rounded-lg w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close Search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
      </motion.section>
    ) : null
  );
};

export default SearchBar;