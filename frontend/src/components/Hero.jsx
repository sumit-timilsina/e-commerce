import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-[40vh] flex items-center justify-center px-4">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[60%] bg-white border border-gray-300 shadow-md rounded-xl p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-2">
          <p className="text-xs text-red-700 font-semibold">OUR BESTSELLERS</p>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Latest Arrivals</h1>
          <p className="text-gray-600 text-sm">
            Shop the freshest trends right now.
          </p>
          <button onClick={()=>navigate('/collection')} className="mt-2 bg-red-700 text-white px-4 py-2 text-sm rounded-full hover:bg-red-800 transition">
            SHOP NOW
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={assets.hero_img}
            alt="Hero"
            className="h-[100px] sm:h-[120px] md:h-[140px] object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
