import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '@/contexts/authContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState('');

  if (!authContext) return null;
  const { user, logout } = authContext;

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.get('http://192.168.8.100:3000/protected', {
          headers: { Authorization: token || '' }
        });
        setMessage(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProtectedData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.username}</Text>
      <Text>{message}</Text>
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
