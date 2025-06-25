
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string, name: string, company: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    
    // Mock authentication - replace with real API call
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      company: 'Acme Corp',
      role: 'Admin'
    };
    
    setUser(mockUser);
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
    
    setIsLoading(false);
    navigate('/');
  };

  const register = async (email: string, password: string, name: string, company: string) => {
    setIsLoading(true);
    
    // Mock registration - replace with real API call
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      company: company,
      role: 'Admin'
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setIsLoading(false);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
