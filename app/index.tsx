import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/contexts/authContext';
import { router } from "expo-router";  // Assuming this is correctly imported from your router library
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { GetStartedWave } from '@/components/GetStartedWave';
import CustomerCard from '@/components/CustomerCard';
import ShopCard from '@/components/ShopCard';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


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


  const handleShopCardPress = async () => {
    try {
      console.log('Shop card pressed');
      await AsyncStorage.setItem('role', 'shop');
      router.push("/authoptions");

    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const handleCustomerCardPress = async () => {
    try {
      console.log('Customer card pressed');
      await AsyncStorage.setItem('role', 'customer');
      await
      router.push("/authoptions");
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  return (
    <ParallaxScrollView>
      {showCards && <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Get Started! </ThemedText>
        <GetStartedWave/>
      </ThemedView>}
      {showCards && <ThemedText type="subtitle">Let us know who you are,</ThemedText>}

      {showCards && <ShopCard onPress={handleShopCardPress}/>}
      {showCards && <CustomerCard onPress={handleCustomerCardPress}/>}
      <ActivityIndicator size='large' animating={!showCards} color={MD2Colors.pink400} />
    
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
