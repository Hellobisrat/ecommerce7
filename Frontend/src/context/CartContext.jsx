export const CartProvider = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);
  const { products } = useContext(ProductContext);

  const [cart, setCart] = useState({ items: [], total: 0 });

  const computeGuestTotal = (guest) => {
    return guest.reduce((sum, item) => {
      const product = products.find(p => p._id === item.productId);
      return sum + ((product?.price || 0) * item.qty);
    }, 0);
  };

  const loadCart = useCallback(async () => {
    if (authLoading) return;

    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart({
        items: guest,
        total: computeGuestTotal(guest)
      });
      return;
    }

    try {
      const { data } = await cartService.get();
      setCart({
        items: data.items || [],
        total: data.total ?? 0
      });
    } catch {
      toast.error("Failed to load cart");
    }
  }, [user, authLoading, products]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existing = guest.find(i => i.productId === product._id);

      if (existing) existing.qty += quantity;
      else guest.push({ productId: product._id, qty: quantity });

      localStorage.setItem("guestCart", JSON.stringify(guest));

      setCart({
        items: guest,
        total: computeGuestTotal(guest)
      });

      toast.success("Added to cart");
      return;
    }

    try {
      const { data } = await cartService.add(product._id, quantity);
      setCart({
        items: data.items,
        total: data.total ?? 0
      });
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const updateQty = async (productId, qty) => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      const item = guest.find(i => i.productId === productId);
      if (item) item.qty = qty;

      localStorage.setItem("guestCart", JSON.stringify(guest));

      setCart({
        items: guest,
        total: computeGuestTotal(guest)
      });

      return;
    }

    try {
      const { data } = await cartService.update(productId, qty);
      setCart({
        items: data.items,
        total: data.total ?? 0
      });
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) {
      const guest = JSON.parse(localStorage.getItem("guestCart")) || [];
      const updated = guest.filter(i => i.productId !== productId);

      localStorage.setItem("guestCart", JSON.stringify(updated));

      setCart({
        items: updated,
        total: computeGuestTotal(updated)
      });

      return;
    }

    try {
      const { data } = await cartService.remove(productId);
      setCart({
        items: data.items,
        total: data.total ?? 0
      });
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    if (!user) {
      localStorage.removeItem("guestCart");
      setCart({ items: [], total: 0 });
      return;
    }

    try {
      const { data } = await cartService.clear();
      setCart({
        items: data.items,
        total: data.total ?? 0
      });
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
