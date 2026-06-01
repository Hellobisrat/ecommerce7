import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setError("Email and password are required");
    return;
  }

 const user = await login(formData);

console.log("Returned user from login():", user);
console.log("AuthContext user BEFORE navigate:", user);
console.log("AuthContext user AFTER login():", user);


  if (!user) {
    setError("Invalid email or password");
    return;
  }

  setError("");
  toast.success("Logged in successfully");

  setTimeout(() => {
    navigate("/", { replace: true });
  }, 50);
};




  return (
    <div className="grid grid-cols-3 gap-10 sm:m-6 md:m-12 lg:m-24 min-h-screen">
      {/* Left Section */}
      <div className="border rounded col-span-2 w-full p-6 md:p-12 flex flex-col justify-center gap-6 shadow-lg">
        <div className="flex items-center justify-center w-60 h-60 rounded-full hover:bg-pink-50 mx-auto">
          <LogIn className="w-40 h-40 text-purple-300 hover:text-purple-500" />
        </div>

        <h1 className="text-lg text-slate-700 font-semibold">
          Welcome back!
        </h1>
        <p className="text-slate-600">
          Please enter your email and password to continue.
        </p>
      </div>

      {/* Right Section */}
      <div className="border rounded w-full p-6 md:p-12 flex justify-center shadow-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="space-y-6 flex flex-col max-w-full">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-600">
                <span className="text-red-500">*</span> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-slate-400 rounded px-2 py-2"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-600">
                <span className="text-red-500">*</span> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-slate-400 rounded px-2 py-2"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              className="bg-blue-500 text-white hover:bg-blue-800 py-3 w-full font-medium rounded-lg"
              type="submit"
            >
              LOGIN
            </button>
          </div>
          <p className="text-sm text-red-400 text-center mt-4">
              Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 font-semibold">
               Register
              </a>
        </p>
        </form>
       

      </div>
       
    </div>
  );
};

export default Login;

