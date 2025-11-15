import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client'; 

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    const rawUser = localStorage.getItem('auth_user');
    if (token && rawUser) {
      try { setUser(JSON.parse(rawUser)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    
    const res = await api.post('/auth/login', { email, password });
    const data = res?.data ?? res; 
    const { token, user } = data || {};

    if (!token || !user) throw new Error('Invalid credentials');

    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));

    setUser(user);
    return user;
  };

  const register = async (payload) => {
    const res = await api.post('/auth/register', payload);
    return res?.data ?? res;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
