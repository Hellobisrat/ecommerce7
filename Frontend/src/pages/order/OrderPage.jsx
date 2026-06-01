import { useEffect, useState } from "react";
import {API} from "../../api/axios.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/my-orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-slate-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 bg-white shadow"
            >
              <p className="font-semibold">Order ID: {order._id}</p>
              <p className="text-sm text-slate-600">
                Total: ${order.total.toFixed(2)}
              </p>
              <p className="text-sm text-slate-600">
                Items: {order.items.length}
              </p>
              <p className="text-sm text-slate-600">
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
