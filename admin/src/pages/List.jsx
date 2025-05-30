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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-sans mb-6 text-center">
          All Products List
        </h2>

        <div className="overflow-x-auto">
          <table
            className="min-w-[800px] w-full bg-white shadow-sm rounded-xl border border-gray-100"
            role="table"
          >
            <thead>
              <tr className="bg-gray-50 text-gray-900 font-sans text-sm sm:text-base">
                <th scope="col" className="p-4 text-left font-semibold">
                  Image
                </th>
                <th scope="col" className="p-4 text-left font-semibold">
                  Name
                </th>
                <th scope="col" className="p-4 text-left font-semibold">
                  Category
                </th>
                <th scope="col" className="p-4 text-left font-semibold">
                  Price
                </th>
                <th scope="col" className="p-4 text-left font-semibold">
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
                    <td className="p-4">
                      <img
                        src={item.images?.[0] || assets.upload_area}
                        alt={`Product image for ${item.name}`}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-4 text-gray-600 font-sans text-sm sm:text-base truncate max-w-xs">
                      {item.name}
                    </td>
                    <td className="p-4 text-gray-600 font-sans text-sm sm:text-base capitalize">
                      {item.category}
                    </td>
                    <td className="p-4 text-gray-600 font-sans text-sm sm:text-base">
                      {currency}
                      {item.price.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <motion.button
                        onClick={() => removeProduct(item._id)}
                        className="px-4 py-2 bg-gray-900 text-white rounded-md font-sans text-sm sm:text-base hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
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
                    className="p-4 text-center text-gray-600 font-sans text-sm sm:text-base"
                  >
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default List;