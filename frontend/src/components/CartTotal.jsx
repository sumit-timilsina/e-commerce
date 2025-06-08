import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { motion } from 'framer-motion';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Ensure subtotal and delivery_fee are numbers, with fallback to 0
  const subtotal = parseFloat(getCartAmount()) || 0;
  const deliveryFee = parseFloat(delivery_fee) || 0;
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
      <div className="text-center mb-10">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      >
        <div className="flex justify-between text-gray-600 text-sm sm:text-base font-sans">
          <span>Subtotal</span>
          <span>{currency}{subtotal.toFixed(2)}</span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-gray-600 text-sm sm:text-base font-sans">
          <span>Shipping Fee</span>
          <span>{currency}{deliveryFee.toFixed(2)}</span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-gray-900 text-base sm:text-lg font-semibold font-sans">
          <span>Total</span>
          <span>{currency}{total.toFixed(2)}</span>
        </div>
      </motion.div>
    </section>
  );
};

export default CartTotal;