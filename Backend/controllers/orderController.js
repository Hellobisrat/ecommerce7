import Order from "../models/Order.js";
import Product from "../models/Product.js";

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { items, shipping } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // Validate products and calculate total
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({ message: `Not enough stock for ${product.title}` });
      }

      total += product.price * item.qty;
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shipping,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders/my-orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product", "title price image");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product", "title price image");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders (admin only)
export const getAllOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "title price image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments();

    res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};


