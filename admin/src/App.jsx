import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useState } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState("12");
  // const [token, setToken] = useState(localStorage.getItem('token') 
  // ? localStorage.getItem('token') 
  // : '');

  useEffect(
    () =>{
      localStorage.setItem('token',token)
    } , [token]
  )
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken = {setToken} />
      ) : (
        <>
          <Navbar />
          <div className="flex w-full">
            <Sidebar />
            <div>
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      )} 
    </div>
  );
};

export default App;