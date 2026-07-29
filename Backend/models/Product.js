import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    sku: {
      type: String,
      unique: true,
      sparse: true,
    },

    image: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      }
    ],

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 100,
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-generate slug
productSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

// Index for sorting by newest
productSchema.index({ createdAt: -1 });

export default mongoose.model("Product", productSchema);
