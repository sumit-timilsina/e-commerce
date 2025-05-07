import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useState } from "react";
import Login from "./pages/Login";

const App = () => {
  const [token, setToken] = useState("srfsd");
  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login />
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
