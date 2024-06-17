import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button, Alert } from 'react-native';
import LoginTextInput from '@/components/LoginTextInput'; // Adjust the import based on your file structure

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    // Replace with your actual authentication logic
    if (email && password) {
      Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <LoginTextInput placeholder="Email" value={email} onChangeText={setEmail}/>
      </View>
      <View >
        <LoginTextInput placeholder="Password" isPassword value={password} onChangeText={setPassword}/>
      </View>
      <Button title="Login" onPress={handleLogin} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

});

export default App;
