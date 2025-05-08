import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <div className="mb-6">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="max-w-md mx-auto bg-white border rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between text-gray-700">
          <p>Subtotal</p>
          <p>{currency}{subtotal}.00</p>
        </div>
        <hr />
        <div className="flex justify-between text-gray-700">
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between text-lg font-semibold text-black">
          <b>Total</b>
          <b>{currency}{total}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
