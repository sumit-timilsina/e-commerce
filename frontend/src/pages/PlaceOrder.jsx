import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    delivery_fee,
    getCartAmount,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please log in to place an order");
      navigate("/login");
      return;
    }

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        navigate("/cart");
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order placed successfully!");
          } else {
            toast.error(response.data.message || "Failed to place order");
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message || "Failed to process payment");
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <motion.form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row lg:gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left side - Delivery Info */}
        <motion.div
          className="space-y-6 mb-8 lg:mb-0 lg:flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  First Name
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="firstName"
                  value={formData.firstName}
                  type="text"
                  id="firstName"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="John"
                  aria-label="First Name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  Last Name
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="lastName"
                  value={formData.lastName}
                  type="text"
                  id="lastName"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Doe"
                  aria-label="Last Name"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  Email
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="email"
                  value={formData.email}
                  type="email"
                  id="email"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="you@example.com"
                  aria-label="Email Address"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="street"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  Street
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="street"
                  value={formData.street}
                  type="text"
                  id="street"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="123 Main St"
                  aria-label="Street Address"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  City
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="city"
                  value={formData.city}
                  type="text"
                  id="city"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Anytown"
                  aria-label="City"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  State
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="state"
                  value={formData.state}
                  type="text"
                  id="state"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="CA"
                  aria-label="State"
                />
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  ZIP
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="zipCode"
                  value={formData.zipCode}
                  type="text"
                  id="zipCode"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="12345"
                  aria-label="ZIP Code"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  Country
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="country"
                  value={formData.country}
                  type="text"
                  id="country"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="USA"
                  aria-label="Country"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm sm:text-base font-medium text-gray-900 font-sans"
                >
                  Phone
                </label>
                <input
                  required
                  onChange={onChangeHandler}
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  type="tel"
                  id="phoneNumber"
                  className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="555-123-4567"
                  aria-label="Phone Number"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Cart Total and Payment */}
        <motion.div
          className="lg:w-[450px] space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        >
          <CartTotal />
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                onClick={() => setMethod("stripe")}
                className={`relative flex items-center justify-center p-4 border rounded-lg hover:shadow-sm cursor-pointer transition-all ${
                  method === "stripe" ? "border-gray-900 shadow-md" : "border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Select Stripe payment method"
              >
                {method === "stripe" && (
                  <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></span>
                )}
                <img
                  src={assets.stripe_logo}
                  alt="Stripe Payment"
                  className="w-auto max-h-8 object-contain"
                />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setMethod("cod")}
                className={`relative flex items-center justify-center p-4 border rounded-lg hover:shadow-sm cursor-pointer transition-all ${
                  method === "cod" ? "border-gray-900 shadow-md" : "border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Select Cash on Delivery payment method"
              >
                {method === "cod" && (
                  <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></span>
                )}
                <span className="font-medium text-gray-900 font-sans text-sm sm:text-base">
                  COD
                </span>
              </motion.button>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-sans text-sm sm:text-base font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Place Order"
          >
            PLACE ORDER
          </motion.button>
        </motion.div>
      </motion.form>
    </section>
  );
};

export default PlaceOrder;