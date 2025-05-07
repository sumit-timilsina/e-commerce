import React from 'react'
import assets from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-200">
      <img src={assets} alt="Logo" className="h-10 w-auto" />

      <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl shadow transition duration-300">
        Logout
      </button>
    </div>
  )
}

export default Navbar