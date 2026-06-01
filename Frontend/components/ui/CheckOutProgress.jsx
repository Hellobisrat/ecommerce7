const CheckoutProgress = ({ step }) => {
  const steps = ["Cart", "Checkout", "Success"];

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      {steps.map((label, index) => {
        const active = index <= step;

        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${active ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"}
              `}
            >
              {index + 1}
            </div>

            <span className={`text-sm ${active ? "font-semibold" : "text-gray-500"}`}>
              {label}
            </span>

            {index < steps.length - 1 && (
              <div
                className={`w-10 h-1 rounded-full ${
                  index < step ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutProgress;
