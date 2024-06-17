import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { router } from "expo-router";
import LoginTextInput from '@/components/LoginTextInput';
import PinkButton from '@/components/PinkButton';

export default function RegisterScreen() {
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const response = await axios.post('http://192.168.8.100:3000/shop/register', {
        shop_name: shopName,
        address: address,
        phone: phone,
        email: email,
        password: password
      });
      console.log('message:', response.data);
      console.log('shop:', response.data.shop);

      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <LoginTextInput placeholder='Shop Name' value={shopName} onChangeText={setShopName}/>
      <LoginTextInput placeholder='Address Name' value={address} onChangeText={setAddress}/>
      <LoginTextInput placeholder='Phone' value={phone} onChangeText={setPhone}/>
      <LoginTextInput placeholder='Email' value={email} onChangeText={setEmail}/>
      <LoginTextInput placeholder='Password' isPassword value={password} onChangeText={setPassword} />
      <PinkButton onPress={register} buttonText="Register" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
});
