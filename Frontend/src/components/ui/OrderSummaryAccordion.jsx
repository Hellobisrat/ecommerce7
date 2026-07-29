import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OrderSummaryAccordion = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden bg-white/60 backdrop-blur-xl border border-purple-200/40 rounded-2xl shadow-lg">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 font-semibold text-purple-700"
      >
        <span>Order Summary</span>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Animated Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-purple-200/40 p-4 space-y-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderSummaryAccordion;
