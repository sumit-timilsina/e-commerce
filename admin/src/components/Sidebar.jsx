import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'


const Sidebar = () => {

    const navItems = [
    { to: "/add", icon: assets.add_icon, label: "Add Items" },
    { to: "/list", icon: assets.order_icon, label: "List" },
    { to: "/orders", icon: assets.order_icon, label: "Orders" },
  ];
  return (
    <div className="w-48 h-screen bg-white border-r border-gray-200 p-4 shadow-sm flex flex-col gap-6">
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-all ${
              isActive ? "bg-pink-100 text-pink-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          <img src={item.icon} alt="" className="h-6 w-6" />
          <p className="text-sm">{item.label}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar