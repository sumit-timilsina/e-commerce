import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className="bg-gray-50 px-4 sm:px-10 py-12 text-gray-800">
      {/* Page Title */}
      <div className="text-center mb-10">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Info Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16">
        <img
          src={assets.contact_img}
          alt="Contact Us"
          className="w-full rounded-xl shadow-md"
        />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Our Store</h3>
          <p className="text-gray-600 leading-relaxed">
            Kamalbinayak, Bhaktapur<br />
            Kamalpokhari Area
          </p>
          <p className="text-gray-600">
            Tel: <a href="tel:+9779801234567" className="hover:underline">+977 980-1234567</a><br />
            Email: <a href="mailto:support@foreverstyle.com" className="hover:underline">support@foreverstyle.com</a>
          </p>

          <div className="pt-4">
            <h4 className="text-lg font-semibold">Careers at Forever</h4>
            <p className="text-sm text-gray-600 mb-4">
              Learn more about our teams and current job openings. Join a company that values creativity,
              innovation, and customer delight.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <div className="max-w-3xl mx-auto">
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default Contact
