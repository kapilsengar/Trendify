import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import cors from "cors"
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();

let port = process.env.PORT || 6000;

let app=express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin:["https://trendily-frontend.onrender.com" , "https://trendify-admin-2n29.onrender.com"],
 credentials:true
}))

app.use("/api/auth" , authRoutes)
app.use("/api/user" , userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)

app.listen(port,()=>{
    console.log("hello from server")
    connectDb();
})
