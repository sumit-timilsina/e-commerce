import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { motion } from 'framer-motion';

const Login = () => {
  const [currentState, setCurrentState] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken, backendUrl, navigate } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (currentState === "signup") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name: name.trim(),
          email: email.trim(),
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email: email.trim(),
          password,
        });
      }

      if (response.data.token) {
        toast.success(`${currentState === "signup" ? "Registered" : "Logged in"} successfully!`);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Redirect to homepage
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-sans capitalize">
            {currentState === "login" ? "Login" : "Sign Up"}
          </h2>
        </div>

        {currentState === "signup" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Full Name"
            />
          </div>
        )}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Email Address"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Password"
          />
        </div>

        <div className="flex items-center justify-between text-sm sm:text-base text-gray-600 font-sans mb-6">
          <button
            type="button"
            className="hover:text-gray-900 hover:underline transition-colors"
            onClick={() => navigate("/forgot-password")} // Placeholder route
            aria-label="Forgot password"
          >
            Forgot password?
          </button>
          {currentState === "login" ? (
            <button
              type="button"
              onClick={() => setCurrentState("signup")}
              className="text-gray-900 hover:underline transition-colors"
              aria-label="Switch to sign up"
            >
              Create account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentState("login")}
              className="text-gray-900 hover:underline transition-colors"
              aria-label="Switch to login"
            >
              Login Here
            </button>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className={`w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-sans text-sm sm:text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          aria-label={currentState === "login" ? "Sign In" : "Sign Up"}
        >
          {loading ? "Loading..." : currentState === "login" ? "Sign In" : "Sign Up"}
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Login;