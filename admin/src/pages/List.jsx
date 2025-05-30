import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token }
      });

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch product list.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching products.");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove`, {
        data: { id },
        headers: { token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing product.");
    }
  };

  useEffect(() => {
    if (token) fetchList();
    else toast.error("No token provided.");
  }, [token]);

  return (
    <section className="py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-sans mb-4 sm:mb-6 text-center">
          All Products List
        </h2>

        {/* Table for larger screens */}
        <div className="hidden sm:block overflow-x-auto">
          <table
            className="w-full bg-white shadow-sm rounded-xl border border-gray-100"
            role="table"
          >
            <thead>
              <tr className="bg-gray-50 text-gray-900 font-sans text-xs sm:text-sm md:text-base">
                <th scope="col" className="p-3 sm:p-4 text-left font-semibold">
                  Image
                </th>
                <th scope="col" className="p-3 sm:p-4 text-left font-semibold">
                  Name
                </th>
                <th scope="col" className="p-3 sm:p-4 text-left font-semibold">
                  Category
                </th>
                <th scope="col" className="p-3 sm:p-4 text-left font-semibold">
                  Price
                </th>
                <th scope="col" className="p-3 sm:p-4 text-left font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map((item, index) => (
                  <motion.tr
                    key={item._id || index}
                    className="border-t border-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="p-3 sm:p-4">
                      <img
                        src={item.images?.[0] || assets.upload_area}
                        alt={`Product image for ${item.name}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3 sm:p-4 text-gray-600 font-sans text-xs sm:text-sm md:text-base truncate max-w-[200px] sm:max-w-xs">
                      {item.name}
                    </td>
                    <td className="p-3 sm:p-4 text-gray-600 font-sans text-xs sm:text-sm md:text-base capitalize">
                      {item.category}
                    </td>
                    <td className="p-3 sm:p-4 text-gray-600 font-sans text-xs sm:text-sm md:text-base">
                      {currency}
                      {item.price.toFixed(2)}
                    </td>
                    <td className="p-3 sm:p-4">
                      <motion.button
                        onClick={() => removeProduct(item._id)}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-900 text-white rounded-md font-sans text-xs sm:text-sm md:text-base hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Delete product ${item.name}`}
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-3 sm:p-4 text-center text-gray-600 font-sans text-xs sm:text-sm md:text-base"
                  >
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card layout for mobile */}
        <div className="block sm:hidden space-y-4">
          {list.length > 0 ? (
            list.map((item, index) => (
              <motion.div
                key={item._id || index}
                className="bg-white shadow-sm rounded-xl border border-gray-100 p-4 flex flex-col gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.images?.[0] || assets.upload_area}
                    alt={`Product image for ${item.name}`}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-gray-600 font-sans text-sm font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-gray-600 font-sans text-xs capitalize">
                      {item.category}
                    </p>
                    <p className="text-gray-600 font-sans text-sm">
                      {currency}
                      {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => removeProduct(item._id)}
                  className="px-3 py-1 bg-gray-900 text-white rounded-md font-sans text-xs hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Delete product ${item.name}`}
                >
                  Delete
                </motion.button>
              </motion.div>
            ))
          ) : (
            <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-4 text-center text-gray-600 font-sans text-sm">
              No products available.
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default List;