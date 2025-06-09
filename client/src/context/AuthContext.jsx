import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, check if user is logged in
  useEffect(() => {
    axios.get('/auth/status', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
