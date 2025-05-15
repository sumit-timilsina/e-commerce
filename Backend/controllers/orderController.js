import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe"

//global variables
const currency = "USD";
const deliveryCharge = 10;


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

        const line_items = items.map((item)=>({
            price_data:{
                currency: currency,
                product_data:{
                    name:item.name
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data:{
                currency: currency,
                product_data:{
                    name:"Delivery Charges",
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        })

        res.json({success: true, session_url: session.url});

    } catch (error) {
        res.json({
            success: false,
            message: "Order Place Failed",
            error: error.message,
        });
    }
}

//Verify stripe payment
const verifyStripe = async (req, res) => {
    const { orderId,success,userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});

            res.json({sucess: true, message: "Payment Success"});
        } else {

            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Payment Failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Order Placed Failed",
            error: error.message,
        });
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
    updateStatus,
    verifyStripe,
}
