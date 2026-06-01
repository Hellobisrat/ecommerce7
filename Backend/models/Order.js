import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: String,
        price: Number,
        qty: Number,
        image: String,
      }
    ],

    shipping: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      country: String,
      zip: String,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "processing", // processing, shipped, delivered, cancelled
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
