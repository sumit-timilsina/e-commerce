import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion } from 'framer-motion';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (showSearch && search && search.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply sorting option
    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Default to 'relevant' (e.g., original order or by ID)
      filtered.sort((a, b) => a._id.localeCompare(b._id));
    }

    setFilteredProducts(filtered);
  }, [products, category, subCategory, sortOption, search, showSearch]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Title text1={'ALL'} text2={'COLLECTIONS'} />
        <button
          className="md:hidden bg-gray-900 text-white px-4 py-2 rounded-lg font-sans text-sm font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
          aria-label={showFilters ? 'Hide Filters' : 'Show Filters'}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
        {/* Filters */}
        <motion.div
          className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/4`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-sans mb-4">
              Categories
            </h3>
            <div className="space-y-3 mb-6">
              {['Men', 'Women', 'Kids'].map((cat) => (
                <div key={cat} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${cat}`}
                    value={cat}
                    className="h-4 w-4 text-gray-900 focus:ring-gray-300 border-gray-200 rounded"
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                    aria-label={`Filter by ${cat} category`}
                  />
                  <label
                    htmlFor={`category-${cat}`}
                    className="ml-2 text-sm sm:text-base text-gray-600 font-sans"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-sans mb-4">
              Type
            </h3>
            <div className="space-y-3">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    value={type}
                    className="h-4 w-4 text-gray-900 focus:ring-gray-300 border-gray-200 rounded"
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(type)}
                    aria-label={`Filter by ${type} type`}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="ml-2 text-sm sm:text-base text-gray-600 font-sans"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products Section */}
        <motion.div
          className="md:w-3/4 flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            <select
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm sm:text-base text-gray-600 font-sans bg-white focus:ring-2 focus:ring-gray-300"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort products"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductItem
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.images[0]}
                  />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 font-sans text-sm sm:text-base">
                No products found. Try adjusting your filters or{' '}
                <a href="/collection" className="text-gray-900 hover:underline">clear all filters</a>.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Collection;