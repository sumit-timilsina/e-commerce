import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe"


//gateway initilization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
        const { userId, items,amount,address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // const line_items = items.map((item)=>)

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
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });
        res.json({
            success: true,
            orders,
        })
    } catch (error) {
        
    }
}

//user order for frontend
const userOrders = async (req, res) => {

    try{
        const { userId } = req.body;
        const orders = await orderModel.find({ userId }).sort({ date: -1 });
        
    
        res.json({
            success: true,
            orders,
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message,
        });
    }

}

//update order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({
                success: false,
                message: "Order not found",
            });
        }
        order.status = status;
        await order.save();
        res.json({
            success: true,
            message: "Order status updated successfully",
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Failed to update order status",
            error: error.message,
        });
}
}



export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpar,
    allOrders,
    userOrders,
    updateStatus
}
