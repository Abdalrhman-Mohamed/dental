'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('auth', JSON.stringify({ user, token }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        if (parsed.user && parsed.token) {
          setUser(parsed.user);
          setToken(parsed.token);
        }
      }
    } catch (error) {
      console.error('Failed to parse auth from localStorage:', error);
      localStorage.removeItem('auth');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
