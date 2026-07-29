import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../api/axios";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import CheckoutProgress from "../../components/ui/CheckoutProgress";
import { ArrowLeft } from "lucide-react";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        console.error("Failed to load order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <LoadingSpinner />;

  if (!order) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-600">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <CheckoutProgress step={2} />

      {/* Back Button */}
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Orders
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>

        {/* Order Info */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Order ID:</span> {order._id}
          </p>

          <p className="text-sm text-slate-700 mt-1">
            <span className="font-semibold">Status:</span> {order.status}
          </p>

          <p className="text-sm text-slate-700 mt-1">
            <span className="font-semibold">Total:</span> ${order.total}
          </p>

          <p className="text-sm text-slate-700 mt-1">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Shipping Info */}
        <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Name:</span>{" "}
            {order.shippingInfo.fullName}
          </p>

          <p className="text-sm text-slate-700 mt-1">
            <span className="font-semibold">Email:</span>{" "}
            {order.shippingInfo.email}
          </p>

          <p className="text-sm text-slate-700 mt-1">
            <span className="font-semibold">Phone:</span>{" "}
            {order.shippingInfo.phone || "N/A"}
          </p>

          <p className="text-sm text-slate-700 mt-1">
            <span className="font-semibold">Address:</span>{" "}
            {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
            {order.shippingInfo.country} {order.shippingInfo.zip}
          </p>
        </div>

        {/* Items */}
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <p className="font-semibold">Product ID: {item.productId}</p>
              <p className="text-sm text-slate-600">Quantity: {item.qty}</p>
              <p className="text-sm text-slate-600">Price: ${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
