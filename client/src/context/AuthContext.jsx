import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, check if user is logged in
  useEffect(() => {
    console.log("Checking auth status...");
    axios.get('/auth/status', { withCredentials: true })
      .then(res => {
        console.log("Auth status response:", res.data)
        setUser(res.data.user)
      })
      .catch(() => {
        console.log("Not logged in or error:", err.response?.status, err.message);
        setUser(null)
      });
  }, []);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
