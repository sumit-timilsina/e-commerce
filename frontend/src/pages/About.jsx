import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className="bg-gray-50 px-4 sm:px-10 py-12 text-gray-800">
      {/* Title Section */}
      <div className="mb-10 text-center">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Intro Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16">
        <img src={assets.about_img} alt="About Us" className="w-full rounded-xl shadow-md" />

        <div className="space-y-4 text-justify">
          <p>
            At <b>StyleCart</b>, we believe that fashion and convenience should go hand in hand.
            Our platform brings a curated collection of premium products from top brands, ensuring
            both quality and style for every shopper.
          </p>
          <p>
            Founded with a vision to revolutionize online shopping, we are driven by a customer-first
            approach. Whether you're shopping for the latest trends or daily essentials, our goal is
            to deliver a seamless, satisfying experience every time.
          </p>
          <div>
            <h3 className="text-lg font-semibold mt-4">Our Mission</h3>
            <p>
              Our mission is simple: to make high-quality products accessible and enjoyable for
              everyone. We are committed to transparency, ethical sourcing, and building long-term
              trust with our customers through impeccable service.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-8">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16 text-center">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-lg font-semibold mb-2">Quality Assurance</h4>
          <p className="text-sm text-gray-600">
            We handpick our products to ensure top-notch quality. Each item undergoes multiple checks
            before reaching you.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-lg font-semibold mb-2">Convenience</h4>
          <p className="text-sm text-gray-600">
            Shop anytime, anywhere. Our platform is built for seamless navigation and a hassle-free
            checkout experience.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-lg font-semibold mb-2">Exceptional Service</h4>
          <p className="text-sm text-gray-600">
            Our support team is always ready to assist you. We value your time and satisfaction above all.
          </p>
        </div>
      </div>

      {/* Newsletter Box */}
      <div className="max-w-3xl mx-auto">
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default About
