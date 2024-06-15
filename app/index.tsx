import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/contexts/authContext';
import { router } from "expo-router";  // Assuming this is correctly imported from your router library

import { ThemedText } from '@/components/ThemedText';
import LoginCard from '@/components/LoginCard';
import SignUpCard from '@/components/SignUpCard';

export default function index() {
  const authContext = useContext(AuthContext); // Move inside the functional component

  if (!authContext) return null;
  const { login } = authContext;

  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');

        console.log('index token:', token);
        console.log('index email:', email);
        console.log('index password:', password);

        if (token && email && password) {
          console.log('All required items are present in AsyncStorage');
          const success = await login(email, password);
          if (success) {
            // Optional: Perform additional actions upon successful login
            // For example, hide cards or navigate to another screen
            // setShowCards(false);
            console.log('login success index)');
            router.replace("/home");
          }
          else {
            console.log('login failed index');
            setShowCards(true);
          }
        } else {
          console.log('Not all required items are present in AsyncStorage');
          setShowCards(true);
        }
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
        setShowCards(true);
      }
    };

    checkAsyncStorage();
  }, []); // Ensure dependencies are properly specified

  const handleLoginCardPress = () => {
    console.log('Login card pressed');
    router.push("/login");
  };

  const handleSignUpCardPress = () => {
    console.log('Sign Up card pressed');
    router.push("/signup");
  }

  return (
    <View>
      <ThemedText>ThemedText</ThemedText>
      {showCards && <LoginCard onPress={handleLoginCardPress} />}
      {showCards && <SignUpCard onPress={handleSignUpCardPress} />}     
    </View>
  );
}

const styles = StyleSheet.create({});
