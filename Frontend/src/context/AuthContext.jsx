import { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService.js";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const { data } = await authService.getProfile();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    setUser(data.user);
    return data.user;
  };

  const register = async (info) => {
    const { data } = await authService.register(info);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
