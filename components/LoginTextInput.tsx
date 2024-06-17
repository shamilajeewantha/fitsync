import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

interface LoginTextInputProps {
  placeholder: string;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const LoginTextInput = ({ placeholder, isPassword, value, onChangeText }: LoginTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureEntry, setSecureEntry] = useState(isPassword || false);

  useEffect(() => {
    if (isPassword !== undefined) {
      setSecureEntry(isPassword);
    }
  }, [isPassword]);

  const togglePasswordVisibility = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, (isFocused || value.length > 0) && styles.labelFocused]}>
        {placeholder}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor="#999"
          secureTextEntry={secureEntry}
        />
        {isPassword && (
          <Pressable style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Ionicons
              name={secureEntry ? 'eye-off' : 'eye'}
              size={24}
              color="#eb3483"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    paddingTop: 18,
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 18,
    fontSize: 16,
    color: '#999',
  },
  labelFocused: {
    top: 0,
    fontSize: 12,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eb3483',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#fff',
  },
  inputFocused: {
    borderBottomColor: '#fff',
  },
  eyeIcon: {
    padding: 8,
  },
});

export default LoginTextInput;
