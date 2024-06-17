import React, { createContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router } from "expo-router";
import { useNavigation  } from 'expo-router';
import { CommonActions } from '@react-navigation/native'

interface AuthContextProps {
  user: { response_email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>; // Modify return type
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ response_email: string } | null>(null);

  const navigation = useNavigation();


  const checkAsyncStorage = async (): Promise<string | null> => {
    try {
      const role = await AsyncStorage.getItem('role');
      console.log('role checkasync authctx:', role);
      if (role) {
        console.log('Role is present in AsyncStorage');
        return role;
      } else {
        console.log('Role is not present in AsyncStorage');
        return null;
      }
    } catch (error) {
      console.error('Error checking AsyncStorage:', error);
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const role = await checkAsyncStorage();
      console.log('role authctx login:', role);
      if (role=='customer') {
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

      console.log('user login complete auth context');
      router.replace("/home");
      return true; // Return true on successful login
      }
      else if (role=='shop') {
        console.log('shop login authctx');
        const response = await axios.post('http://192.168.8.100:3000/shop/login', {
          email: email,
          password: password
        });

        console.log('authctx shop message:', response.data.message);
        console.log('authctx shop email:', response.data.email);
        console.log('authctx shop token:', response.data.token);        

        const response_email = response.data.email;
        const token = response.data.token;

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);

        setUser({ response_email });
        console.log('user login complete auth context');
        router.replace("/shophome");
        return true;
      }
      else {
        console.log('role not set authctx');
        return false;
      }

    } catch (error) {
      console.log('error login authctx');
      console.error(error);

      return false; // Return false on login failure
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      console.log('user logout complete auth context');

      setUser(null);
      navigation.dispatch(CommonActions.reset({
        routes: [{key: "index", name: "index"}]
      }))   
      
      return true; // Return true on successful logout
    } catch (error) {
      console.log('error logout');
      console.error(error);

      return false; // Return false on logout failure
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
