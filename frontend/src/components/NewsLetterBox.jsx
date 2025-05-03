import React from 'react';

const NewsLetterBox = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-center">
            <p className="text-2xl md:text-3xl font-semibold text-gray-800">
                Subscribe now & get 30% off
            </p>
            <p className="text-gray-500 mt-4 text-sm md:text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis quae incidunt, impedit libero inventore ullam repudiandae velit porro, praesentium pariatur delectus facilis!
            </p>
            <form 
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <input
                    className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black"
                    type="email"
                    placeholder="Enter your email"
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsLetterBox;
