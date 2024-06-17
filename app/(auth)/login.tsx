import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native'; // Import Alert
import { TextInput as PaperTextInput } from 'react-native-paper';
import { AuthContext } from '@/contexts/authContext';
import { router } from "expo-router";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import LoginTextInput from '@/components/LoginTextInput';
import PinkButton from '@/components/PinkButton';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  if (!authContext) return null;
  const { login } = authContext;


  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      console.log('Login successful login page');
    } else {
      // Show alert and reset password field
      Alert.alert(
        'Login Failed',
        'Invalid username or password. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => setPassword(''), // Reset password field
          }
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <View style={styles.container}>
      <LoginTextInput placeholder='Email' value={username} onChangeText={setUsername}/>
      <LoginTextInput placeholder='Password' isPassword value={password} onChangeText={setPassword} />
      <PinkButton onPress={handleLogin} buttonText="Login" />
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#151718',
  },

});
