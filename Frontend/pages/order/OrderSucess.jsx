import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import CheckoutProgress from "../../components/ui/ChekOutProgress";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    
    <div className="min-h-[80vh] flex items-center justify-center p-6 text-black">
      <CheckoutProgress step={2} />

      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Order Placed Successfully</h1>

        <p className="text-slate-600 mb-6">
          Thank you for your purchase. Your order has been received and is now being processed.
        </p>

        {/* Order Info (placeholder for now) */}
        <div className="bg-gray-100 rounded-xl p-4 text-left mb-6">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Order Number:</span> #ORD-{Math.floor(Math.random() * 90000) + 10000}
          </p>
          <p className="text-sm text-slate-700 mt-1">
            <span className="font-semibold">Status:</span> Processing
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="w-full border border-purple-600 text-purple-700 py-3 rounded-xl font-semibold hover:bg-purple-50 transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
