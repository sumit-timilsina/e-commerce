import { useState, React, useContext } from 'react'
import { assets1 } from '../assets/admin_assets/assets1'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate,token,setToken,setCartItems} = useContext(ShopContext);

    const Logout = () => {
        setToken("");
        // setCartItems([]);
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className='flex justify-between items-center py-5 font-medium '>
            <Link to='/'>
            <img src={assets1.logo} className='w-34' alt="Logo" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

                <NavLink to='/'
                    className={({ isActive }) =>
                        `flex flex-col items-center text-gray-700 hover:text-red-800 font-bold 
                 ${isActive ? "text-red-800" : ""}`
                    }>
                    <p>HOME</p>
                </NavLink>

                <NavLink to='/collection'
                    className={({ isActive }) =>
                        `flex flex-col items-center text-gray-700 hover:text-red-800 font-bold 
                 ${isActive ? "text-red-800" : ""}`
                    }>
                    <p>COLLECTION</p>
                </NavLink>

                <NavLink to='/about'
                    className={({ isActive }) =>
                        `flex flex-col items-center text-gray-700 hover:text-red-800 font-bold 
                 ${isActive ? "text-red-800" : ""}`
                    }>
                    <p>ABOUT</p>
                </NavLink>

                <NavLink to='/contact'
                    className={({ isActive }) =>
                        `flex flex-col items-center text-gray-700 hover:text-red-800 font-bold 
                 ${isActive ? "text-red-800" : ""}`
                    }>
                    <p>CONTACT</p>
                </NavLink>

            </ul>
            <div className='flex items-center gap-6'>
                <img 
                onClick={() => {
                    navigate('./collection')
                    setShowSearch(true)}}
                src={assets.search_icon} alt="search-icon" className='w-5 cursor-pointer' />

                <div className='group relative'>
                    <Link to='./login'>
                    <img src={assets.profile_icon} alt="cart-icon" className='w-5 cursor-pointer' />
                    </Link>
                    <div className='hidden group-hover:block absolute pt-4 dropdown-menu right-0 '>
                        <div className='flex flex-col gap-2 px-5 py-3 w-36 bg-slate-100 text-gray-700'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black' onClick = {Logout}>Logout</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />
            </div>

            {/* sidebar menu for small screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'} `}>
                <div className='flex flex-col hover:text-black text-gray-700'>
                    <div onClick={() => setVisible(false)} className='flex items-center p-3 gap-4'>
                        <img className='h-5 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p className='text-sm cursor-pointer'>Back</p>
                    </div>

                    <div className="w-48 h-screen bg-white shadow-md flex flex-col justify-start items-center py-8 space-y-6">
                        <NavLink
                        onClick={() => setVisible(false)}
                            to="/"
                            className={({ isActive }) =>
                                `w-full flex flex-col items-center py-3 transition-colors duration-300 font-bold 
                                ${isActive ? "text-red-800" : "text-gray-700 hover:text-red-800"}`
                            }
                        >
                            <p className="text-sm cursor-pointer">HOME</p>
                        </NavLink>

                        <NavLink
                        onClick={() => setVisible(false)}
                            to="/collection"
                            className={({ isActive }) =>
                                `w-full flex flex-col items-center py-3 transition-colors duration-300 font-bold 
                                ${isActive ? "text-red-800" : "text-gray-700 hover:text-red-800"}`
                            }
                        >
                            <p className="text-sm cursor-pointer">COLLECTION</p>
                        </NavLink>

                        <NavLink
                        onClick={() => setVisible(false)}
                            to="/about"
                            className={({ isActive }) =>
                                `w-full flex flex-col items-center py-3 transition-colors duration-300 font-bold 
                                    ${isActive ? "text-red-800" : "text-gray-700 hover:text-red-800"}`
                            }
                        >
                            <p className="text-sm cursor-pointer">ABOUT</p>
                        </NavLink>

                        <NavLink
                        onClick={() => setVisible(false)}
                            to="/contact"
                            className={({ isActive }) =>
                                `w-full flex flex-col items-center py-3 transition-colors duration-300 font-bold 
                            ${isActive ? "text-red-800" : "text-gray-700 hover:text-red-800"}`
                            }
                        >
                            <p className="text-sm cursor-pointer">CONTACT</p>
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar;