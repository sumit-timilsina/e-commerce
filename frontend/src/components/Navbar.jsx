import { useState, React, useContext } from "react";
import { assets1 } from "../assets/admin_assets/assets1";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const Logout = () => {
    setToken("");
    setCartItems([]);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white py-2 px-4 sm:px-6 lg:px-2 max-w-7xl mx-auto flex justify-between items-center font-sans">
      {/* Logo */}
      <Link to="/">
        <motion.img
          src={assets.logo}
          className="w-20"
          alt="Nexus Logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 text-sm sm:text-base text-gray-600">
        {["/", "/collection", "/about", "/contact"].map((path, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center font-semibold transition-colors duration-300 ${
                isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <motion.p whileHover={{ y: -2 }} transition={{ duration: 0.3 }}>
              {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
            </motion.p>
          </NavLink>
        ))}
      </ul>

      {/* Icons and Mobile Menu Toggle */}
      <div className="flex items-center gap-4 sm:gap-6">
        <motion.img
          onClick={() => {
            navigate("/collection");
            setShowSearch(true);
          }}
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />

        <div className="group relative">
          {token ? (
            <>
              <motion.img
                onClick={() => {
                  navigate("/login");
                }}
                src={assets.profile_icon}
                alt="Profile"
                className="w-5 cursor-pointer"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="hidden group-hover:block absolute pt-4 right-0 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-2 px-5 py-3 w-36 bg-white border border-gray-100 rounded-lg shadow-sm text-gray-600 text-sm font-sans">
                  <button className="text-left hover:text-gray-900 transition-colors">
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/orders")}
                    className="text-left hover:text-gray-900 transition-colors"
                  >
                    Orders
                  </button>
                  <button
                    onClick={Logout}
                    className="text-left hover:text-gray-900 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </>
          ) : (
            <Link to="/login">
              <motion.img
                src={assets.profile_icon}
                alt="Login"
                className="w-5 cursor-pointer"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          )}
        </div>

        <Link to="/cart" className="relative">
          <motion.img
            src={assets.cart_icon}
            alt="Cart"
            className="w-5 min-w-5"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
          <span className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gray-900 text-white aspect-square rounded-full text-[8px] font-sans">
            {getCartCount()}
          </span>
        </Link>

        <motion.img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Open Menu"
          aria-label="Open Mobile Menu"
          className="w-5 cursor-pointer sm:hidden"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`sm:hidden fixed top-0 right-0 bottom-0 bg-white z-20 overflow-hidden transition-all duration-300 ease-in-out ${
          visible
            ? "w-full pointer-events-auto opacity-100"
            : "w-0 pointer-events-none opacity-0"
        }`}
        initial={{ x: "100%" }}
        animate={{ x: visible ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-hidden={!visible}
      >
        <div className="flex flex-col h-full text-gray-600">
          <motion.div
            onClick={() => setVisible(false)}
            className="flex items-center p-4 gap-4 border-b border-gray-200"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.3 }}
          >
            <img
              className="h-5 rotate-180"
              src={assets.dropdown_icon}
              alt="Close Menu"
            />
            <p className="text-sm font-semibold font-sans">Back</p>
          </motion.div>

          <div className="flex flex-col justify-start items-center py-8 space-y-6">
            {["/", "/collection", "/about", "/contact"].map((path, index) => (
              <NavLink
                key={index}
                onClick={() => setVisible(false)}
                to={path}
                className={({ isActive }) =>
                  `w-full flex flex-col items-center py-3 text-sm font-semibold font-sans transition-colors duration-300 ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                  {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
                </motion.p>
              </NavLink>
            ))}
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
