import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { cartService } from "../services/cartService.js";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Load cart
  const loadCart = useCallback(async () => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart(guest);
      return;
    }

    try {
      const { data } = await cartService.get();
      setCart(data.items || []);
    } catch {
      toast.error("Failed to load cart");
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existing = guest.find((i) => i.productId === product._id);

      if (existing) existing.qty += quantity;
      else guest.push({ productId: product._id, qty: quantity, product });

      localStorage.setItem("guestCart", JSON.stringify(guest));
      setCart(guest);
      toast.success("Added to cart");
      return;
    }

    try {
      const { data } = await cartService.add(product._id, quantity);
      setCart(data.items);
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  // Update quantity
  const updateQty = async (productId, qty) => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      const item = guest.find((i) => i.productId === productId);
      if (item) item.qty = qty;

      localStorage.setItem("guestCart", JSON.stringify(guest));
      setCart(guest);
      return;
    }

    try {
      const { data } = await cartService.update(productId, qty);
      setCart(data.items);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      const updated = guest.filter((i) => i.productId !== productId);

      localStorage.setItem("guestCart", JSON.stringify(updated));
      setCart(updated);
      return;
    }

    try {
      const { data } = await cartService.remove(productId);
      setCart(data.items);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!user) {
      localStorage.removeItem("guestCart");
      setCart([]);
      return;
    }

    try {
      const { data } = await cartService.clear();
      setCart(data.items);
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  // Merge guest cart after login
  const mergeGuestCart = async () => {
    const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (guest.length === 0) return;

    try {
      const { data } = await cartService.merge(guest);
      localStorage.removeItem("guestCart");
      setCart(data.items);
    } catch {
      toast.error("Failed to merge cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        mergeGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
