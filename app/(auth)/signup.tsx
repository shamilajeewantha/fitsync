import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import axios from 'axios';
import { router } from "expo-router";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const register = async () => {
    try {
      const response = await axios.post('http://192.168.8.100:3000/customer/register', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
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
      <PaperTextInput
        label="First Name"
        activeUnderlineColor="#1E90FF"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <PaperTextInput
        label="Last Name"
        activeUnderlineColor="#1E90FF"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <PaperTextInput
        label="Email"
        activeUnderlineColor="#1E90FF"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <PaperTextInput
        label="Password"
        activeUnderlineColor="#1E90FF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        right={<PaperTextInput.Icon icon={secureTextEntry ? 'eye' : 'eye-off'} onPress={togglePasswordVisibility} />}
        style={styles.input}
      />
      <Button title="Register" onPress={register} />
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
