import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  // Still loading user from /auth/me
  if (authLoading) return <div>Loading...</div>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but not admin
  if (user.role !== "admin") return <Navigate to="/" replace />;

  // Admin → allow access
  return children;
};

export default AdminRoute;
