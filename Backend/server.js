import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/monogdb.js";
import { connectCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";


//App Config
const app = express();
const PORT = 3000||process.env.PORT;

connectDB();
connectCloudinary();

//Middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the e-commerce API!");
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
