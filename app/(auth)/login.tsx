import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native'; // Import Alert
import { TextInput as PaperTextInput } from 'react-native-paper';
import { AuthContext } from '@/contexts/authContext';
import { router } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  if (!authContext) return null;
  const { login } = authContext;

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      console.log('Login successful');
      router.replace("/home");
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
      <PaperTextInput
        label="Email" 
        activeUnderlineColor="#1E90FF"
        value={username}
        onChangeText={setUsername}
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
      <Button title="Login" onPress={handleLogin} />
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
