import React, { useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = React.useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("orders error", error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        {headers: { token }}
      );
      console.log("status response", response);
      if (response.data.success) {
        await fetchAllOrders();
      }

    } catch (error) {
      console.log("status error", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Order Page
      </h3>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4"
          >
            {/* Parcel Items */}
            <div className="flex items-center gap-4">
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-12 h-12"
              />
              <div className="text-sm text-gray-600">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} x {item.quantity}
                    <span className="ml-1 text-gray-400">
                      {item.size}
                      {idx !== order.items.length - 1 && ","}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* Customer Info & Address */}
            <div>
              <p className="font-medium text-gray-700">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="text-sm text-gray-500 leading-relaxed mt-1">
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
              <p className="mt-2 text-sm text-gray-600">
                <strong>Phone:</strong> {order.address.phoneNumber}
              </p>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-3 mt-3 text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.payment ? (
                  <span className="text-green-600 font-medium">Paid ✅</span>
                ) : (
                  <span className="text-red-500 font-medium">Pending ❌</span>
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
                <span className="font-semibold">Amount:</span>
                {currency} {order.amount}
              </p>

              <select value={order.status} onChange={(event) => statusHandler(event, order._id)} >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
