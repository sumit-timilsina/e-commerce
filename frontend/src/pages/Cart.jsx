import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQUantity , navigate} = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <div className="mb-8">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <img
                src={productData.image[0]}
                alt={productData.name}
                className="w-24 h-24 object-cover rounded-md"
              />

              <div className="flex-1 w-full md:w-auto">
                <p className="text-lg font-semibold">{productData.name}</p>
                <div className="text-sm text-gray-600 flex gap-6 mt-1">
                  <p>
                    <span className="font-medium">{currency}</span>
                    {productData.price}
                  </p>
                  <p>Size: <span className="uppercase">{item.size}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQUantity(item._id, item.size, Number(e.target.value))
                  }
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <img
                  onClick={() => updateQUantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  alt="Delete"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center md:justify-end my-20 px-4 md:px-10">
        <div className="w-full sm:w-[450px] space-y-6">
          <CartTotal />
          <button 
          onClick={() => navigate('./place-order')}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

    </div>
  )
}

export default Cart
