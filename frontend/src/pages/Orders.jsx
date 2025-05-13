import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token){
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order)=>[
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        ])
        setOrderData(allOrdersItem);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      toast.error("Failed to load order data");
    }
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="px-4 sm:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="grid gap-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-gray-800">
                  {item.name}
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>
                    Quantity:{" "}
                    <span className="font-medium text-gray-700">{item.quantity}</span>
                  </p>
                  <p>
                    Size: <span className="font-medium text-gray-700">{item.size}</span>
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Payment: <span className="text-gray-500">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Shipping Status */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <p className="text-sm text-green-600 font-medium">
                {item.status}
              </p>
            </div>

            {/* Track Order Button */}
            <button onClick={loadOrderData} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
