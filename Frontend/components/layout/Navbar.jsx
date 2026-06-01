import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogIn, LogOut, ShoppingCart } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import CartDrawer from "../cart/CartDrawer";
import { AnimatePresence } from "framer-motion";



const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const name = user?.name
  ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
  : "Guest";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  console.log(user)
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
         top-4 z-50 mx-auto max-w-[80%]
        backdrop-blur-md bg-white/40 border border-white/30
        shadow-lg shadow-purple-200/40
        rounded-2xl px-6 py-3 flex items-center justify-between
      "
    >
      {/* Left: Home Link */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <Home className="w-6 h-6 text-purple-400" />
        <span className="text-purple-600 font-bold">Home</span>
      </Link>

      {/* Middle: Welcome Text */}
      <div className="flex-1 flex justify-center">
        <p className="text-purple-600 font-medium hidden md:block">
          Welcome, {name}
        </p>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">

        {/* Cart Icon */}
        <button onClick={() => setIsCartOpen(true)} className="relative hover:scale-110 transition">
          <ShoppingCart className="w-7 h-7 text-purple-600" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {cart.length}
            </span>
          )}
        </button>

        {/* Login / Logout */}
        {!user ? (
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <LogIn className="w-6 h-6 text-purple-400" />
            <span className="font-semibold text-purple-600">Login</span>
          </Link>
        ) : (
          <>
            <span className="font-semibold text-blue-700 hidden md:block">
              Welcome, {name}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-700 transition"
            >
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          </>
        )}
        

  {user?.role === "admin" && (
  <Link to="/admin/products" className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition">
    Admin Panel
  </Link>
)}


      </div>

      {/* Cart Drawer */}
     <AnimatePresence>
  {isCartOpen && (
     <CartDrawer onClose={() => setIsCartOpen(false)} />
      //<Cart/>
  )}
</AnimatePresence>


    </motion.div>
  );
};

export default Navbar;
