import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  async function getUser() {
    if (!token) return;
    try {
      const res = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      if (error.response?.status === 401) {
        // Xử lý token không hợp lệ
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
      }
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}