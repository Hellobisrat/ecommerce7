import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { cartService } from "../services/cartService.js";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Load cart only after authLoading finishes
  const loadCart = useCallback(async () => {
    if (authLoading) return;

    // Guest cart
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart(guest);
      return;
    }

    // User cart
    try {
      const { data } = await cartService.get();
      setCart(data.items || []);
    } catch {
      toast.error("Failed to load cart");
    }
  }, [user, authLoading]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existing = guest.find((i) => i.productId === product._id);

      if (existing) existing.qty += quantity;
      else guest.push({ productId: product._id, qty: quantity });

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

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
