import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection'))
            setVisible(true);
        else {
            setVisible(false);
        }
    }, [location]);

    return (
        showSearch && visible ? (
            <div className="relative w-full max-w-lg mx-auto p-6 flex items-center">
                <div className="relative rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out focus-within:shadow-lg flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <img
                            src={assets.search_icon}
                            alt="Search Icon"
                            className="w-5 h-5 text-gray-400"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Explore our collections..."
                        className="block w-full pl-10 pr-10 py-3 sm:py-4 border border-transparent bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            className="absolute inset-y-0 right-8 flex items-center focus:outline-none"
                        >
                            <img
                                src={assets.cross_icon}
                                alt="Clear Icon"
                                className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                            />
                        </button>
                    )}
                </div>
                {/* Close button to the side */}
                <button
                    onClick={() => setShowSearch(false)}
                    className="ml-3 bg-red-400 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-colors duration-200"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        ) : null
    );
};

export default SearchBar;