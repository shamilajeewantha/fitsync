import React, { createContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router } from "expo-router";


interface AuthContextProps {
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://192.168.8.100:3000/customer/login', {
        email: username,
        password: password
      });
      console.log('message :', response.data.message);
      console.log('token :', response.data.token);

      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      setUser({ username });
      console.log('user login complete');
      router.replace("/home");

    } catch (error) {
      console.log('error login');
      console.error(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    router.replace("/");

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
