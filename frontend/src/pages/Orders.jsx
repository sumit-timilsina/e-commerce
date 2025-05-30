import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';

const Orders = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      if (!token) {
        toast.error("Please log in to view your orders");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.success) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id, // Include order ID for tracking
            });
          });
        });
        setOrderData(allOrdersItem);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const handleTrackOrder = (orderId) => {
    // Placeholder for tracking functionality
    navigate(`/track-order/${orderId}`); // Assumes a tracking route
    toast.info("Tracking order...");
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white min-h-screen">
      {/* Title */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Title text1={"MY"} text2={"ORDERS"} />
      </motion.div>

      {/* Orders List */}
      <motion.div
        className="grid gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        {loading ? (
          <p className="text-center text-gray-600 font-sans text-sm sm:text-base">
            Loading orders...
          </p>
        ) : !token ? (
          <p className="text-center text-gray-600 font-sans text-sm sm:text-base">
            Please <a href="/login" className="text-gray-900 hover:underline">log in</a> to view your orders.
          </p>
        ) : orderData.length === 0 ? (
          <p className="text-center text-gray-600 font-sans text-sm sm:text-base">
            No orders found. <a href="/collection" className="text-gray-900 hover:underline">Start shopping now!</a>
          </p>
        ) : (
          orderData.map((item, index) => (
            <motion.div
              key={`${item.orderId}-${item._id}-${index}`}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.images[0]}
                  alt={`${item.name} in size ${item.size}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-base sm:text-lg font-semibold text-gray-900 font-sans">
                    {item.name}
                  </p>
                  <div className="text-sm sm:text-base text-gray-600 font-sans space-y-1">
                    <p>
                      {currency}
                      {item.price.toFixed(2)}
                    </p>
                    <p>
                      Quantity: <span className="font-medium text-gray-900">{item.quantity}</span>
                    </p>
                    <p>
                      Size: <span className="font-medium text-gray-900">{item.size}</span>
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-sans mt-2">
                    Date: <span className="text-gray-900">{new Date(item.date).toLocaleDateString()}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 font-sans">
                    Payment: <span className="text-gray-900">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Shipping Status */}
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    item.status === 'Delivered' ? 'bg-green-500' :
                    item.status === 'Shipped' ? 'bg-blue-500' :
                    item.status === 'Processing' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
                ></span>
                <p className="text-sm font-medium text-gray-900 font-sans">
                  {item.status}
                </p>
              </div>

              {/* Track Order Button */}
              <motion.button
                onClick={() => handleTrackOrder(item.orderId)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg font-sans text-sm font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Track order for ${item.name}`}
              >
                Track Order
              </motion.button>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
};

export default Orders;