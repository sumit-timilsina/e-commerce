import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { motion } from 'framer-motion';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Title text1={"YOUR"} text2={"CART"} />
      </motion.div>

      {/* Cart Items */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        {cartData.length === 0 ? (
          <p className="text-center text-gray-600 font-sans text-sm sm:text-base">
            Your cart is empty. <a href="/collection" className="text-gray-900 hover:underline">Start shopping now!</a>
          </p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;
            return (
              <motion.div
                key={`${item._id}-${item.size}`}
                className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={productData.images[0]}
                  alt={`${productData.name} in size ${item.size}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 w-full sm:w-auto">
                  <p className="text-base sm:text-lg font-semibold text-gray-900 font-sans">
                    {productData.name}
                  </p>
                  <div className="text-sm sm:text-base text-gray-600 font-sans flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2">
                    <p>
                      <span className="font-medium">{currency}</span>
                      {productData.price.toFixed(2)}
                    </p>
                    <p>
                      Size: <span className="uppercase">{item.size}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item._id,
                        item.size,
                        e.target.value === "" ? 1 : Number(e.target.value)
                      )
                    }
                    className="w-16 px-3 py-2 border border-gray-200 rounded-lg text-center text-gray-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label={`Quantity for ${productData.name} size ${item.size}`}
                  />
                  <motion.button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Remove ${productData.name} size ${item.size} from cart`}
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove Item"
                      className="w-5 h-5"
                    />
                  </motion.button>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Cart Total and Checkout */}
      {cartData.length > 0 && (
        <motion.div
          className="flex justify-center md:justify-end my-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <div className="w-full sm:w-[450px] space-y-6">
            <CartTotal />
            <motion.button
              onClick={() => navigate("/place-order")}
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-300 font-sans text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PROCEED TO CHECKOUT
            </motion.button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Cart;