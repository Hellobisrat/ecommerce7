import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURL = process.env.MONGO_URL;

  if (!mongoURL) {
    throw new Error("❌ MONGO_URL is missing. Check your environment variables.");
  }

  try {
    console.log("🔍 Attempting MongoDB connection...");

    const conn = await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Prevent long hangs
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);

    // Connection events
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
    throw error; // Let global error handler catch it
  }
};

export default connectDB;
