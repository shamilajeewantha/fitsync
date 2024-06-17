import React, { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";  // Assuming this is correctly imported from your router library
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import LoginCard from '@/components/LoginCard';
import SignUpCard from '@/components/SignUpCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { GetStartedWave } from '@/components/GetStartedWave';
import { useFocusEffect } from '@react-navigation/native';  // If using React Navigation



export default function index() {

    const [role, setRole] = useState('');

    const checkAsyncStorage = async () => {
        try {
            const role = await AsyncStorage.getItem('role');
            console.log('role auth options page:', role);
            if (role) {
                console.log('Role is present in AsyncStorage');
                setRole(role);
            }
            else {
                console.log('Role is not present in AsyncStorage');
            }
        }
        catch (error) {
            console.error('Error checking AsyncStorage:', error);
        }
    }

    useFocusEffect(
      useCallback(() => {
        console.log('useFocusEffect called');
        checkAsyncStorage();
      }, [])
    );

  const handleLoginCardPress = () => {
    console.log('Login card pressed');
    router.push("/login");
  };

  const handleSignUpCardPress = () => {
    console.log('Sign Up card pressed');
    if (role === 'shop') {
      console.log('shop signup opened')
      router.push("/shopsignup");
      return;
    }
    else if (role === 'customer') {
      console.log('customer signup opened')
      router.push("/signup");
      return;
    }
  }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Get Started! </ThemedText>
        <GetStartedWave/>
      </ThemedView>
      <ThemedText type="subtitle">Check out your {role} profile,</ThemedText>

    <LoginCard onPress={handleLoginCardPress} />
    <SignUpCard onPress={handleSignUpCardPress} />
           
    </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({  
  titleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginBottom: 20,
},
});
