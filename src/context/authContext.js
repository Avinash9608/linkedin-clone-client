import { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  };



  // Load user
  const loadUser = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      // Ensure token is set in headers before each request
      setAuthToken(token);
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      // Handle error without calling logout to avoid circular dependency
      setToken(null);
      setUser(null);
      setAuthToken(null);
      history.push("/login");
    } finally {
      setLoading(false);
    }
  }, [token, history]);

  // Register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.post("/auth/register", formData, config);
      // Set token in state and localStorage
      setToken(res.data.token);
      // Set token in axios headers
      setAuthToken(res.data.token);
      await loadUser();
      history.push("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw err;
    }
  };

  // Login user
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await api.post("/auth/login", formData, config);
      // Set token in state and localStorage
      setToken(res.data.token);
      // Set token in axios headers
      setAuthToken(res.data.token);
      await loadUser();
      history.push("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    history.push("/login");
  };

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token, loadUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
