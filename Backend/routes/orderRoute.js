import express from "express";
import adminAuth from "../middleware/adminAuth.js";

import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpar,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";

import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//admin feat

orderRouter.post("/list",adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//Payment features
orderRouter.post("/place",authUser, placeOrder);
orderRouter.post("/stripe",authUser, placeOrderStripe);
orderRouter.post("/razorpay",authUser, placeOrderRazorpar);

//user features
orderRouter.post("/userorders",authUser, userOrders);

//Verify payment
orderRouter.post("/verifyStripe", authUser,verifyStripe);

export default orderRouter;