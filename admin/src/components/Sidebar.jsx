import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { to: '/add', icon: assets.add_icon, label: 'Add Items', alt: 'Add Items icon' },
    { to: '/list', icon: assets.order_icon, label: 'List', alt: 'List icon' },
    { to: '/orders', icon: assets.order_icon, label: 'Orders', alt: 'Orders icon' },
  ];

  return (
    <motion.aside
      className="w-16 sm:w-64 bg-white border-r h-screen border-gray-100 shadow-sm p-2 sm:p-6 flex flex-col items-center sm:items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col sm:flex-row items-center gap-1 sm:gap-3 w-full sm:w-auto p-2 sm:p-3 rounded-md transition-all font-sans text-xs sm:text-base ${
              isActive
                ? 'bg-gray-100 text-gray-900 font-semibold shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'
            }`
          }
          aria-label={`Navigate to ${item.label}`}
        >
          <motion.img
            src={item.icon}
            alt={item.alt}
            className="h-6 w-6 sm:h-6 sm:w-6"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          <span className="hidden sm:inline">{item.label}</span>
        </NavLink>
      ))}
    </motion.aside>
  );
};

export default Sidebar;
