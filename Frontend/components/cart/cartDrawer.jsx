import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";


const CartDrawer = ({ onClose }) => {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, removeFromCart ,clearCart} =
    useContext(CartContext);

 const total = cart.reduce((sum, item) => {
  const qty = Number(item.quantity) || 0;
  const price = item.product && typeof item.product.price === "number"
    ? item.product.price
    : 0;

  return sum + qty * price;
}, 0);


  console.log ("cart inside cartDrawer",cart)
  console.log(cart);
console.log("First item:", cart[0]);
console.log("qty:", cart[0]?.quantity, "price:", cart[0]?.product?.price);

  


  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 backdrop-blur-md bg-black/40 z-[999]"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed right-0 top-0 h-full w-[420px] bg-white flex flex-col z-[1000]"
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-purple-700">Your Cart</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-purple-600 hover:text-purple-800 transition" />
          </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-slate-600 text-center mt-10">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-3 border p-3 rounded-lg"
              >
                {/* Product Info */}
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 line-clamp-2">
                    {item.product.title} 
                  </p>

                  <p className="text-sm text-slate-600">
                    ${item.product.price} × {item.quantity}
                  </p>

                  <p className="font-bold text-purple-700">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.product._id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    –
                  </button>

                  <span className="font-semibold">{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item.product._id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))
          )}
          <button
                  onClick={() => clearCart()}
                  className="bg-red-500 text-white px-3 py-2 w-full rounded"
                >
                  Clear cart
                </button>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartDrawer;