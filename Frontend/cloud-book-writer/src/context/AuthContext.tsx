import { jwtDecode } from 'jwt-decode';
import React, {
  createContext, useContext, useEffect, useState, useCallback, useMemo,
} from 'react';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') ?? null,
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode(storedToken) as { id: string; role: string };
      setToken(storedToken);
      setUserId(decoded.id);
      setRole(decoded.role);
    }
  }, []);

  const handleLogin = useCallback((newToken: string) => {
    const decoded = jwtDecode(newToken) as { id: string; role: string };
    setToken(newToken);
    setUserId(decoded.id);
    setRole(decoded.role);
    localStorage.setItem('token', newToken);
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      handleLogin(storedToken);
    }
  }, [handleLogin]);

  const contextValue = useMemo(() => ({
    token,
    userId,
    role,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!token,
  }), [token, handleLogin, handleLogout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
