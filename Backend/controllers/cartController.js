import userModel from "../models/userModel.js";

//add products to cart
const addToCart = async (req, res) => {
  try {
    const {userId,itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData: cartData });

    res.json({
      sucess: true,
      message: "Product added to cart",
      cartData: cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding product to cart" });
  }
};

//update products in cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData: cartData });
    res.json({
      success: true,
      message: "Product updated in cart",
      cartData: cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating product in cart" });
  }
};

// get user cart
const getUserCart = async (req, res) => {
    try{
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({
            success: true,
            message: "User cart data",
            cartData: cartData,
        });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error getting user cart data" });
    }
};

export { addToCart, updateCart, getUserCart };
