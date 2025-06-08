import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <motion.section
        className="bg-white shadow-sm rounded-xl p-6 sm:p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 font-sans mb-6">
          Admin Panel Login
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-gray-900 font-sans mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              type="email"
              placeholder="your@email.com"
              required
              aria-label="Email address"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium text-gray-900 font-sans mb-2"
            >
              Password
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              type="password"
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-sans text-sm sm:text-base font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Log in to admin panel"
          >
            Login
          </motion.button>
        </form>
      </motion.section>
    </main>
  );
};

export default Login;