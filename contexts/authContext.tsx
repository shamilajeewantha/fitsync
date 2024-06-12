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
      const response = await axios.post('http://192.168.8.100:3000/login', { username, password });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      setUser({ username });
      router.replace("/home");

    } catch (error) {
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
