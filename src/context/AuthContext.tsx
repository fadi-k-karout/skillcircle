// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  userRoles: string[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!authService.getToken());
  const [userRoles, setUserRoles] = useState<string[]>([]);
  

 
// Decode the token and handle any errors during decoding
const decodeRoles = (token: string): string[] => {
  try {
    const decodedToken = jwtDecode<{ roles: string | string[] }>(token);
    if (Array.isArray(decodedToken.roles)) {
      return decodedToken.roles; // If roles is an array, return it as-is
    }
    if (typeof decodedToken.roles === 'string') {
      return [decodedToken.roles]; // If roles is a string, wrap it in an array
    }
    return []; // Return an empty array if roles is not found or not in the expected format
  } catch (error) {
    console.error('Error decoding token:', error);
    return []; // Return an empty array if the token cannot be decoded
  }
};


  const login = async (email: string, password: string) => {
    try {
      const token = await authService.login(email, password);
      setIsAuthenticated(true);
      setUserRoles(decodeRoles(token)); // Update roles after login
    } catch (error) {
      console.error('Login failed:', error); // Handle login errors
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserRoles([]); // Clear roles on logout
  };

  useEffect(() => {
    const token = authService.getToken();
    
    if (token) {
      setUserRoles(decodeRoles(token)); // Decode roles on app load if token exists
      setIsAuthenticated(true);
    } else {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
      if (cookieToken) {
        localStorage.setItem('jwtToken', cookieToken); // Move token to local storage
        document.cookie = 'token=; Max-Age=0; path=/'; // Delete the cookie
        setUserRoles(decodeRoles(cookieToken));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false); // Explicitly set to false if no token found
      }
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRoles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
