import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products , search , showSearch} = useContext(ShopContext);
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
   
    if(showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    console.log('Filtered Products:', filtered);
    setFilteredProducts(filtered);
  }, [products, category, subCategory, sortOption , search, showSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Filters toggle for mobile */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Collections</h2>
        <button
          className="md:hidden text-sm text-blue-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/4`}>
          <div className="bg-white rounded-2xl shadow p-4 sticky top-20">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2 mb-4">
              {['Men', 'Women', 'Kids'].map((cat) => (
                <div key={cat}>
                  <input
                    type="checkbox"
                    id={`category-${cat}`}
                    value={cat}
                    className="mr-2"
                    onChange={toggleCategory}
                  />
                  <label htmlFor={`category-${cat}`}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-3">Type</h3>
            <div className="space-y-2">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                <div key={type}>
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    value={type}
                    className="mr-2"
                    onChange={toggleSubCategory}
                  />
                  <label htmlFor={`type-${type}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="md:w-3/4 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Title text1={'All '} text2={'COLLECTIONS'} />
            <select
              className="border rounded px-3 py-2 text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.images[0]}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
