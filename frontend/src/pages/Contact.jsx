import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Title text1={'CONTACT'} text2={'US'} />
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <img
          src={assets.contact_img}
          alt="Nexus Style Store Front"
          className="w-full rounded-xl shadow-sm"
        />
        <div className="space-y-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-sans">
            Our Store
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed">
            Kamalbinayak, Bhaktapur<br />
            Kamalpokhari Area, Nepal
          </p>
          <p className="text-sm sm:text-base text-gray-600 font-sans">
            Tel: <a href="tel:+9779801234567" className="hover:text-gray-900 transition-colors" aria-label="Call us at +977 980-1234567">+977 980-1234567</a><br />
            Email: <a href="mailto:support@Nexusstyle.com" className="hover:text-gray-900 transition-colors" aria-label="Email us at support@Nexusstyle.com">support@Nexusstyle.com</a>
          </p>
          <div className="pt-2">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 font-sans">
              Careers at Nexus
            </h4>
            <p className="text-sm sm:text-base text-gray-600 font-sans mt-2 mb-4 leading-relaxed">
              Join our team and help shape the future of fashion retail. Explore opportunities that value creativity and customer focus.
            </p>
            <motion.button
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-sans text-sm sm:text-base font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Explore job openings at Nexus Style"
            >
              Explore Jobs
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Newsletter Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      >
        <NewsLetterBox />
      </motion.div>
    </section>
  );
};

export default Contact;