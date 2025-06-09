import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, check if user is logged in
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/status`, { withCredentials: true })
      .then(res => {
        console.log("Logged in user:", res.data.user);
        setUser(res.data.user)
      })
      .catch(() => {
        console.log("not logged in");
        // setUser(null)
      });
  }, []);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
