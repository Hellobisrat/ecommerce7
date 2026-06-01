import mongoose from "mongoose";
import Cart from "../models/Cart.js";

// Helper: return populated cart


// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
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

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity: qty }]
      });
    } else {
      const item = cart.items.find(i => i.product.toString() === productId);

      if (item) {
        item.quantity = Number(item.quantity || 0) + qty;
      } else {
        cart.items.push({ product: productId, quantity: qty });
      }
    }

    await cart.save();
    await cart.populate("items.product");   // ⭐ THIS IS THE FIX

    res.status(200).json(cart);

  } catch (err) {
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

    const cart = await Cart.findOne({user:req.user._id});

   


    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = qty;
 await cart.save();
await cart.populate("items.product");
res.status(200).json(cart);
    
  } catch (err) {
    console.error("UPDATE CART ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/cart/remove/:productId
// DELETE /api/cart/remove/:productId
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

   cart.items = cart.items.filter(i => i._id.toString() !== productId);
await cart.save();
await cart.populate("items.product");
res.status(200).json(cart);

    res.status(200).json(cart);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE /api/cart/clear
export const clearCart = async (req, res) => {
  try {
  
    const cart = await Cart.findOne({ user: req.user._id });
cart.items = [];
await cart.save();
res.status(200).json(cart);
   
  } catch (err) {
    
    res.status(500).json({ message: "Server error" });
  }
};


