import React, { createContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router } from "expo-router";


interface AuthContextProps {
  user: { response_email: string } | null;
  login: (email: string, password: string) => Promise<boolean>; // Modify return type
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ response_email: string } | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('http://192.168.8.100:3000/customer/login', {
        email: email,
        password: password
      });

      console.log('authctx message:', response.data.message);
      console.log('authctx email:', response.data.email);
      console.log('authctx token:', response.data.token);

      const response_email = response.data.email;
      const token = response.data.token;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      setUser({ response_email });

      console.log('user login complete');

      return true; // Return true on successful login

    } catch (error) {
      console.log('error login');
      console.error(error);

      return false; // Return false on login failure
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');

    setUser(null);
    // router.replace("/");

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
