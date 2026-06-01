import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { API } from "../api/axios";
import { toast } from "sonner";
import OrderSummaryAccordion from "../components/ui/OrderSummaryAccordion";
import CheckoutProgress from '../components/ui/ChekOutProgress'
import OrderSummary from "./order/OrderSummary";
import Button from "../components/ui/Button";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.fullName ||
    !form.email ||
    !form.address ||
    !form.city ||
    !form.country ||
    !form.zip
  ) {
    toast.error("Please fill in all required fields.");
    return;
  }

  try {
     await API.post("/orders", {
      customer: form,
      items: cart,
      total,
    });
   toast.success("Order placed successfully!");
    clearCart();
    navigate(`/order-success`);
  } catch (err) {
    console.error("Order failed:", err);
    toast.error("Order failed. Please try again.");
  }
};

  if (cart.length === 0) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-black">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      
      <CheckoutProgress step={1} />
    <div className="p-8 max-w-5xl mx-auto text-black grid md:grid-cols-[2fr,1fr] gap-8">
      {/* Left: Form */}


      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {/* Contact Info */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name *"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email *"
              type="email"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border rounded px-3 py-2 w-full md:col-span-2"
            />
          </div>
        </section>

        {/* Shipping Address */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <div className="space-y-3">
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street Address *"
              className="border rounded px-3 py-2 w-full"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City *"
                className="border rounded px-3 py-2 w-full"
              />
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country *"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              placeholder="ZIP / Postal Code *"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </section>

        {/* Payment (mock for now) */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          <p className="text-sm text-slate-600">
            This is a demo form. Do not enter real card details.
          </p>
          <input
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            placeholder="Name on Card"
            className="border rounded px-3 py-2 w-full"
          />
          <input
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            className="border rounded px-3 py-2 w-full"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="CVV"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </section>

        <Button
          type="submit"
          className="mt-4 w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
        >
          Place Order
        </Button>
      </form>

      {/* Right: Order Summary */}
      <aside className="border rounded-xl p-4 h-fit bg-white">
        <OrderSummary/>
      </aside>
       <OrderSummaryAccordion>
          <OrderSummary />
        </OrderSummaryAccordion>
    </div>
    </div>
  );
};

export default Checkout;
