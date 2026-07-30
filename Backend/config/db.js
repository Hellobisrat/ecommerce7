import crypto from "crypto";
global.crypto = crypto; // ⭐ REQUIRED FIX

import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURL = process.env.MONGO_URI;

  if (!mongoURL) {
    throw new Error("❌ MONGO_URI is missing. Check your environment variables.");
  }

  try {
    console.log("🔍 Attempting MongoDB connection...");

    const conn = await mongoose.connect(mongoURL);

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("connected", () => {
      console.log("🟢 MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("🟡 MongoDB disconnected");
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
