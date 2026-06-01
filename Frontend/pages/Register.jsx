import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.password) {
    setError("All fields are required");
    return;
  }

  try {
    await register(formData); // this already sets localStorage + user

    toast.success("Account created successfully");
    navigate("/home");
  } catch (err) {
    const msg = err.response?.data?.message || "Registration failed";
    setError(msg);
    toast.error(msg);
  }
};


  return (
    <div className="grid grid-cols-3 gap-10 sm:m-6 md:m-12 lg:m-24 min-h-screen">
      {/* Left Section */}
      <div className="border rounded col-span-2 w-full p-6 md:p-12 flex flex-col justify-center gap-6 shadow-lg">
        <div className="flex items-center justify-center w-60 h-60 rounded-full hover:bg-purple-50 mx-auto">
          <UserPlus className="w-40 h-40 text-purple-300 hover:text-purple-500" />
        </div>

        <h1 className="text-lg text-slate-700 font-semibold">
          Create your account
        </h1>
        <p className="text-slate-600">
          Enter your details below to get started.
        </p>
      </div>

      {/* Right Section */}
      <div className="border rounded w-full p-6 md:p-12 flex justify-center shadow-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="space-y-6 flex flex-col max-w-full">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-600">
                <span className="text-red-500">*</span> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-slate-400 rounded px-2 py-2"
              />
            </div>

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
              className="bg-purple-600 text-white hover:bg-purple-800 py-3 w-full font-medium rounded-lg"
              type="submit"
            >
              REGISTER
            </button>

            <p className="text-sm text-center text-slate-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
