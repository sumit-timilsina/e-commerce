import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("No token provided.");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: {token} }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching orders.");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: {token} }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 font-sans mb-6 text-center">
          Manage Orders
        </h3>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {orders.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 font-sans text-sm sm:text-base">
              No orders available.
            </p>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order._id || index}
                className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex flex-col gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Parcel Items */}
                <div className="flex items-center gap-4">
                  <img
                    src={assets.parcel_icon}
                    alt="Order parcel icon"
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                  <div className="text-sm sm:text-base text-gray-600 font-sans">
                    {order.items.map((item, idx) => (
                      <p key={idx}>
                        {item.name} x {item.quantity}
                        <span className="ml-1 text-gray-500">
                          {item.size}
                          {idx !== order.items.length - 1 && ","}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Customer Info & Address */}
                <div>
                  <p className="font-semibold text-gray-900 font-sans text-sm sm:text-base">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="text-sm text-gray-600 font-sans leading-relaxed mt-2">
                    <p>
                      <strong>Street:</strong> {order.address.street}
                    </p>
                    <p>
                      <strong>City:</strong> {order.address.city}
                    </p>
                    <p>
                      <strong>State:</strong> {order.address.state}
                    </p>
                    <p>
                      <strong>Country:</strong> {order.address.country}
                    </p>
                    <p>
                      <strong>Zip:</strong> {order.address.zipCode}
                    </p>
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 font-sans">
                    <strong>Phone:</strong> {order.address.phoneNumber}
                  </p>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-100 pt-3 mt-3 text-sm sm:text-base text-gray-900 font-sans space-y-2">
                  <p>
                    <span className="font-semibold">Items:</span>{" "}
                    {order.items.length}
                  </p>
                  <p>
                    <span className="font-semibold">Payment:</span>{" "}
                    {order.payment ? (
                      <span className="text-gray-900 font-medium">Paid ✅</span>
                    ) : (
                      <span className="text-gray-900 font-medium">
                        Pending
                      </span>
                    )}
                  </p>
                  <p>
                    <span className="font-semibold">Method:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(order.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> {currency}
                    {order.amount.toFixed(2)}
                  </p>
                  <motion.select
                    id={`status-${order._id}`}
                    value={order.status}
                    onChange={(event) => statusHandler(event, order._id)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors mt-2"
                    aria-label={`Update status for order ${order._id}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </motion.select>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Orders;