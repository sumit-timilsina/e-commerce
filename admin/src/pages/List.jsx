import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch product list.");
      }
    } catch (error) {
      console.error("list error", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/remove`,
        {
        data :{ id },
        headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("remove product error", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) fetchList();
    else toast.error("No token provided.");
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">All Products List</h2>

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 bg-gray-100 p-4 font-semibold text-gray-700 text-sm sm:text-base">
            <div>Image</div>
            <div>Name</div>
            <div>Category</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {/* Product List */}
          {list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={item._id || index}
                className="grid grid-cols-5 gap-4 items-center border-b p-4 text-sm sm:text-base"
              >
                <img
                  src={item.images?.[0] || '/placeholder.jpg'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <p className="truncate">{item.name}</p>
                <p className="capitalize">{item.category}</p>
                <p>{currency}{item.price}</p>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
