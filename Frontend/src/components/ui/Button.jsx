
const Button = ({ children, variant = "primary", ...props }) => {
  const styles = {
    primary: "bg-blue-500 text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-600 text-white",
  };

  return (
    <button {...props} className={`px-6 py-3 w-full rounded  ${variant?styles[variant]:"bg-purple-600"}`}>
      {children}
    </button>
  );
};


export default Button