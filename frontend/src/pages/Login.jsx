import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

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
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.token) {
        toast.success(`${currentState === "signup" ? "Registered" : "Logged in"} successfully!`);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/"); // redirect to homepage or dashboard
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {currentState === "login" ? "Login" : "Sign Up"}
          </h2>
        </div>

        {currentState === "signup" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md"
        />

        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <p className="cursor-pointer hover:underline">Forgot password?</p>
          {currentState === "login" ? (
            <p onClick={() => setCurrentState("signup")} className="text-blue-600 cursor-pointer hover:underline">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState("login")} className="text-blue-600 cursor-pointer hover:underline">
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-md transition ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Loading..." : currentState === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
