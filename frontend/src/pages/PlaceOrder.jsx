import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);

  return (
    <div className="bg-gray-50 py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Left side - Delivery Info */}
          <div className="space-y-6 mb-8 lg:mb-0 lg:col-span-3">
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            <div className="bg-white rounded-md shadow p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastName"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Street
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="street"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="123 Main St"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Anytown"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="state"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="CA"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="zipCode"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="12345"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="country"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="USA"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="phoneNumber"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="555-123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Cart Total and Payment */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <CartTotal />

              <div className="bg-white rounded-md shadow p-4 sm:p-6">
                <Title text1={'PAYMENT'} text2={'METHOD'} />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div
                    onClick={() => setMethod('stripe')}
                    className={`relative flex items-center justify-center p-3 border rounded-md hover:shadow cursor-pointer ${method === 'stripe' ? 'border-indigo-500 shadow-md' : 'border-gray-300'}`}
                  >
                    {method === 'stripe' && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></span>}
                    <img src={assets.stripe_logo} alt="Stripe" className="w-auto max-h-8 object-contain" />
                  </div>

                  <div
                    onClick={() => setMethod('razorpay')}
                    className={`relative flex items-center justify-center p-3 border rounded-md hover:shadow cursor-pointer ${method === 'razorpay' ? 'border-indigo-500 shadow-md' : 'border-gray-300'}`}
                  >
                    {method === 'razorpay' && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></span>}
                    <img src={assets.razorpay_logo} alt="Razorpay" className="w-auto max-h-8 object-contain" />
                  </div>

                  <div
                    onClick={() => setMethod('cod')}
                    className={`relative flex items-center justify-center p-3 border rounded-md hover:shadow cursor-pointer ${method === 'cod' ? 'border-indigo-500 shadow-md' : 'border-gray-300'}`}
                  >
                    {method === 'cod' && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full"></span>}
                    <span className="font-medium text-gray-700 text-sm">COD</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('./orders')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
