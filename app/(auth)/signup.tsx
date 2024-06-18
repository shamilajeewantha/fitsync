import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { router } from "expo-router";
import LoginTextInput from '@/components/LoginTextInput';
import PinkButton from '@/components/PinkButton';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhone_number] = useState('');

  const register = async () => {
    try {
      const response = await axios.post('http://192.168.8.100:3000/customer/register', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        phone_number: phone_number,
      });
      console.log('message:', response.data.message);
      console.log('customer:', response.data.customer);

      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <LoginTextInput placeholder='First Name' value={firstName} onChangeText={setFirstName}/>
      <LoginTextInput placeholder='Last Name' value={lastName} onChangeText={setLastName}/>
      <LoginTextInput placeholder='Phone Number' value={phone_number} onChangeText={setPhone_number}/>
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
