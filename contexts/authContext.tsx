import React, { createContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router } from "expo-router";


interface AuthContextProps {
  user: { first_name: string } | null;
  login: (username: string, password: string) => Promise<boolean>; // Modify return type
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ first_name: string } | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('http://192.168.8.100:3000/customer/login', {
        email: username,
        password: password
      });

      console.log('authctx message:', response.data.message);
      console.log('authctx first_name:', response.data.first_name);
      console.log('authctx token:', response.data.token);

      const first_name = response.data.first_name;
      const token = response.data.token;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', username);
      await AsyncStorage.setItem('password', password);

      setUser({ first_name });

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
