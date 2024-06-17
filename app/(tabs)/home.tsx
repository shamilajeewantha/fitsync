import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native'; // Import Text and Divider from react-native
import { AuthContext } from '@/contexts/authContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import OrderCard from '@/components/OrderCard';
import { Divider, Button } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { router } from 'expo-router';


export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const [customerName, setCustomerName] = useState<string>('');
  const [orders, setOrders] = useState<any[]>([]);

  if (!authContext) return null;
  const { user } = authContext;

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get(`http://192.168.8.100:3000/customer/by-email?email=${user.response_email}`, {
          headers: { Authorization: token || '' }
        });
        console.log(response.data);
        if (response.data) {
          console.log('setting customer name', response.data.first_name);
          setCustomerName(response.data.first_name);
          await AsyncStorage.setItem('first_name', response.data.first_name);
          await AsyncStorage.setItem('last_name', response.data.last_name);
          if (response.data.phone_number !== null && response.data.phone_number !== undefined) {
            await AsyncStorage.setItem('phone_number', response.data.phone_number);
          }


        }
        if (response.data.orders && response.data.orders.length > 0) {
          console.log('setting orders');
          console.log(response.data.orders);
          setOrders(response.data.orders);
        }
        else {
          console.log('no orders');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProtectedData();
  }, []);

  const handleStartShopping = () => {
    router.push('explore');
    console.log('Start shopping');
  }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hi, {customerName}</ThemedText>
        <HelloWave />
      </ThemedView>
      <Button buttonColor="#eb3483"  contentStyle={styles.startShoppingButton} icon="shopping" mode="contained" onPress={handleStartShopping}>Start Shopping</Button>
      <Divider style={styles.divider} /> 
      <ThemedText type="subtitle">Your Orders</ThemedText>

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))
        ) : (
          <View style={styles.noOrdersContainer}>
            <ThemedText>No orders yet</ThemedText>
            <ThemedText>🥲</ThemedText>
          </View>
        )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#eb3483',
    marginTop: 40,
    marginBottom: 10,
  },
  noOrdersContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  startShoppingButton: {
    height: 70, // Increase the button height
  },

});
