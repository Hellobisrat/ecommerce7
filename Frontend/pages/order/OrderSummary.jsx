import { useContext, } from "react";
import { CartContext } from"../../context/CartContext"

const OrderSummary = () => {
  const { cart} = useContext(CartContext);
 const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );
  return (
    <div>
     <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="max-w-[70%]">
                <p className="font-medium line-clamp-2">{item.product.title}</p>
                <p className="text-slate-600">
                  Qty: {item.quantity} × ${Number(item.product.price).toFixed(2)}
                </p>
              </div>
              <p className="font-semibold">
                ${(Number(item.product.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        </div>
  )
}

export default OrderSummary