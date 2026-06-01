import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import connectDB from './config/db.js'

dotenv.config();
connectDB();


const app = express();

// Middleware

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://splendorous-meerkat-7ca579.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json())
app.use(morgan("dev"))


// Test route
app.get("/",(req,res)=>{
  res.json({message:"API is running..."})
})
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Server start
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT}`);
})