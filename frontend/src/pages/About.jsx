import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title Section */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Title text1={'ABOUT'} text2={'US'} />
      </motion.div>

      {/* Intro Section */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <img
          src={assets.about_img}
          alt="StyleCart Team and Products"
          className="w-full rounded-xl shadow-sm"
        />
        <div className="space-y-4 text-gray-600 font-sans text-sm sm:text-base md:text-lg leading-relaxed">
          <p>
            At <span className="font-semibold text-gray-900">StyleCart</span>, we blend fashion with convenience. Our curated collection of premium products from top brands ensures quality and style for every shopper.
          </p>
          <p>
            Founded to redefine online shopping, we prioritize a customer-first experience. From the latest trends to daily essentials, we deliver seamless shopping with every click.
          </p>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-4">Our Mission</h3>
            <p>
              We aim to make high-quality products accessible to all, with transparency, ethical sourcing, and exceptional service at our core.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      >
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
      >
        {[
          {
            title: 'Quality Assurance',
            desc: 'We handpick products to ensure top-tier quality, with rigorous checks before they reach you.',
          },
          {
            title: 'Convenience',
            desc: 'Shop anytime, anywhere with our user-friendly platform and hassle-free checkout.',
          },
          {
            title: 'Exceptional Service',
            desc: 'Our dedicated support team is here 24/7 to ensure your satisfaction.',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 font-sans mb-2">
              {item.title}
            </h4>
            <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Newsletter Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
      >
        <NewsLetterBox />
      </motion.div>
    </section>
  );
};

export default About;