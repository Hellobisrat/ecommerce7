import { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService.js";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Restore user on refresh
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthLoading(false);
      return;
    }

    try {
      const { data } = await authService.getProfile(token);
      setUser(data); // backend returns user WITHOUT token
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Login
  const login = async (credentials) => {
    const { data } = await authService.login(credentials);

    // Save token
    localStorage.setItem("token", data.token);

    // Save user (remove token from user object)
    const { token, ...userData } = data;
    setUser(userData);

    return userData;
  };

  // Register
  const register = async (info) => {
    const { data } = await authService.register(info);

    // Save token
    localStorage.setItem("token", data.token);

    // Save user
    const { token, ...userData } = data;
    setUser(userData);

    return userData;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
