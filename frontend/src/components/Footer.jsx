import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
        {/* Logo and Description */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img src={assets.logo} alt="Nexus Logo" className="w-20 mb-6" />
          <p className="text-sm sm:text-base font-sans leading-relaxed max-w-md text-gray-600">
            At Nexus, we’re dedicated to bringing you quality products with a personal touch. Explore our curated collections and enjoy a seamless shopping experience tailored just for you.
          </p>
          <div className="flex space-x-4 mt-6">
            <motion.a
              href="#"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
            >
              <FaFacebookF size={20} />
            </motion.a>
            <motion.a
              href="#"
              aria-label="Twitter"
              className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
            >
              <FaTwitter size={20} />
            </motion.a>
            <motion.a
              href="#"
              aria-label="Instagram"
              className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
            >
              <FaInstagram size={20} />
            </motion.a>
          </div>
        </motion.div>

        {/* Company Links */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <p className="font-semibold text-base sm:text-lg text-gray-900 mb-5 uppercase tracking-wide font-sans">
            Company
          </p>
          <ul className="space-y-3 text-sm sm:text-base font-sans">
            <li>
              <motion.a
                href="/"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                Home
              </motion.a>
            </li>
            <li>
              <motion.a
                href="/about"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                About Us
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                Delivery
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                Privacy Policy
              </motion.a>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <p className="font-semibold text-base sm:text-lg text-gray-900 mb-5 uppercase tracking-wide font-sans">
            Get in Touch
          </p>
          <ul className="space-y-3 text-sm sm:text-base font-sans">
            <li className="flex items-center space-x-3">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="text-gray-600">+977-9876543210</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-600">helloworld@gmail.com</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center">
        <p className="text-sm text-gray-500 font-sans select-none">
          © 2025 Nexus.com — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;