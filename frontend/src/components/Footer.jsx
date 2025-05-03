import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis fugit id soluta nihil quia eveniet iure, dolores laboriosam tenetur recusandae.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-semibold text-lg mb-3">COMPANY</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Home</a></li>
            <li><a href="#" className="hover:text-black">About Us</a></li>
            <li><a href="#" className="hover:text-black">Delivery</a></li>
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="font-semibold text-lg mb-3">GET IN TOUCH</p>
          <ul className="space-y-2 text-sm">
            <li>+977-9876543210</li>
            <li>helloworld@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center text-xs text-gray-500">
        <p>© 2025 Nexus.com — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
