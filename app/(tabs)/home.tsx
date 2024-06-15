import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '@/contexts/authContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const [orders, setOrders] = useState([]); // Changed state variable name to orders

  if (!authContext) return null;
  const { user, logout } = authContext;
  console.log('home user:', user);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get('http://192.168.8.100:3000/order', {
          headers: { Authorization: token || '' }
        });
        console.log(response.data);
        setOrders(response.data); // Store orders in state variable
      } catch (error) {
        console.error(error);
      }
    };
    fetchProtectedData();
  }, []);

  return (
    <View style={styles.container}>
      <ThemedText>Welcome, {user?.first_name}</ThemedText>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});





// {orders.map(order => (
//   <View key={order.order_id} style={styles.orderContainer}>
//     <Text style={styles.orderText}>Order ID: {order.order_id}</Text>
//     <Text style={styles.orderText}>Customer ID: {order.customer_id}</Text>
//     <Text style={styles.orderText}>Shop ID: {order.shop_id}</Text>
//     {/* Render other properties as needed */}
//     <Text style={styles.orderText}>Comments: {order.comments}</Text>
//     {/* Render measurements if they vary */}
//     {order.measurements && (
//       <Text style={styles.orderText}>
//         Measurements: {JSON.stringify(order.measurements)}
//       </Text>
//     )}
//   </View>
// ))}