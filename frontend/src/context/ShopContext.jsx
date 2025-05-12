import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

// let token = localStorage.getItem("token");

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = "10";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size]++;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
   

    if (token) {
      try {
        await axios.post(
          "http://localhost:3000" + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQUantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        axios.post(
          "http://localhost:3000" + "/api/cart/update",
          { itemId, size, quantity },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

 const getProductsData = async () => {
  try {
    const response = await axios.get(backendUrl + "/api/product/list");

    if(response.data.success){
      setProducts(response.data.products);
    }
    else{
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error(error.message);
    
  }
 }

 const getCartData = async (token) => {
  try {
    const response = await axios.get(backendUrl + "/api/cart/get", {
      headers: {
        Authorization: token,
      },
    });
    setCartItems(response.data.cartData)
  } catch (error) {
    console.error("Error fetching cart data:", error);
    toast.error(error.message);
  }
 };

 useEffect(() => {
    getProductsData();

 }, []);

 useEffect(() => {
  if(!token && localStorage.getItem("token")){
    setToken(localStorage.getItem("token"));  
    getCartData(localStorage.getItem("token"));
  }
}, []);


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQUantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
