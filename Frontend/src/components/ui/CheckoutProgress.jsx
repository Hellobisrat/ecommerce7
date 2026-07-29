import { motion } from "framer-motion";

const CheckoutProgress = ({ step }) => {
  const steps = ["Cart", "Checkout", "Success"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-6 my-6"
    >
      {steps.map((label, index) => {
        const active = index <= step;

        return (
          <div key={label} className="flex items-center gap-3">
            {/* Step Circle */}
            <motion.div
              animate={{
                backgroundColor: active ? "#7c3aed" : "#e5e7eb",
                color: active ? "#fff" : "#6b7280",
              }}
              transition={{ duration: 0.3 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shadow-md"
            >
              {index + 1}
            </motion.div>

            {/* Step Label */}
            <span
              className={`text-sm ${
                active ? "font-semibold text-purple-700" : "text-gray-500"
              }`}
            >
              {label}
            </span>

            {/* Connector */}
            {index < steps.length - 1 && (
              <motion.div
                animate={{
                  backgroundColor: index < step ? "#7c3aed" : "#d1d5db",
                }}
                transition={{ duration: 0.3 }}
                className="w-14 h-1 rounded-full"
              />
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export default CheckoutProgress;

