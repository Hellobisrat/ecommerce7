import { useEffect, useState } from "react";
import { API } from "../../api/axios.js";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { toast } from "sonner";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/my-orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-slate-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const totalQty = order.items.reduce(
              (sum, item) => sum + item.qty,
              0
            );

            return (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}   // FIXED: requires OrderDetail route
                className="block border rounded-xl p-4 bg-white shadow hover:bg-purple-50 transition"
              >
                <p className="font-semibold">Order ID: {order._id}</p>

                <p className="text-sm text-slate-600">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm text-slate-600">
                  Total: ${order.total.toFixed(2)}
                </p>

                <p className="text-sm text-slate-600">
                  Items: {totalQty}
                </p>

                <p className="text-sm text-slate-600">
                  Status: {order.status}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

