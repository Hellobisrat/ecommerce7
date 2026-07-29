import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },

    // Price snapshot
    priceAtTime: {
      type: Number,
      required: true,
    },

    // Title snapshot
    titleAtTime: {
      type: String,
      required: true,
    },

    // Image snapshot
    imageAtTime: {
      type: String,
      required: true,
    },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: [cartItemSchema],
  },
  { timestamps: true }
);

// Virtual: total price
cartSchema.virtual("total").get(function () {
  return this.items.reduce((sum, item) => {
    return sum + item.priceAtTime * item.quantity;
  }, 0);
});

// Index for performance
cartSchema.index({ "items.product": 1 });

export default mongoose.model("Cart", cartSchema);
