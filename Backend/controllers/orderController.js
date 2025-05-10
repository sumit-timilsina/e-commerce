import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
//cash on deliver

const placeOrder = async (req, res) => {
    try {
        const { userId, items,amount,address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }; 
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {
            cartData:{}
        });
        res.json({
            success: true,
            message: "Order Placed Successfully",
            orderId: newOrder._id,
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Order Placed Failed",
            error: error.message,
        });
    }
}

//Using stripe
const placeOrderStripe = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//Razorpay

const placeOrderRazorpar = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//all orders for admin
const allOrders = async (req, res) => {

}

//user order for frontend
const userOrders = async (req, res) => {

}

//update order status
const updateStatus = async (req, res) => {

}



export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpar,
    allOrders,
    userOrders,
    updateStatus
}
