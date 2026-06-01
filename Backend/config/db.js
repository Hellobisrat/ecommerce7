import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔍 MONGO_URL from environment:", process.env.MONGO_URL);

    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing. Render is not loading the variable.");
    }

    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
