import { useState } from "react";
import { ChevronDown } from "lucide-react";

const OrderSummaryAccordion = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden border rounded-xl bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 font-semibold"
      >
        <span>Order Summary</span>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="p-4 border-t space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default OrderSummaryAccordion;
