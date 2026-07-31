import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product", "title price image stock");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/cart/add
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity) || 1;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
  cart = await Cart.create({
    user: req.user._id,
    items: [{
      product: productId,
      quantity: qty,
      titleAtTime: product.title,
      priceAtTime: product.price,
      imageAtTime: product.image
    }]
  });
} else {
  const item = cart.items.find(i => i.product.toString() === productId);

  if (item) {
    if (product.stock < item.quantity + qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }
    item.quantity += qty;
  } else {
    cart.items.push({
      product: productId,
      quantity: qty,
      titleAtTime: product.title,
      priceAtTime: product.price,
      imageAtTime: product.image
    });
  }
}


    await cart.save();
    await cart.populate("items.product", "title price image stock");

    res.status(200).json(cart);
  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/cart/update
export const updateCartItem = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = qty;

    await cart.save();
    await cart.populate("items.product", "title price image stock");

    res.status(200).json(cart);
  } catch (err) {
    console.error("UPDATE CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/cart/remove/:productId
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.product.toString() !== productId);

    await cart.save();
    await cart.populate("items.product", "title price image stock");

    res.status(200).json(cart);
  } catch (err) {
    console.error("REMOVE CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/cart/clear
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error("CLEAR CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
