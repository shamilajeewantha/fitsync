import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { ThemedText } from '@/components/ThemedText'
import { AuthContext } from '@/contexts/authContext';

export default function shopprofile() {
  const { logout } = useContext(AuthContext) || {}; // Destructure logout directly, handling null or undefined case


  const handleLogout = async () => {
    // Implement your logic for logging out
    console.log('Logging out...');
    if (logout) {
      const success = await logout(); // Call the logout function from context
      if (success) {
        console.log('Logout successfull');     
      } else {
        console.log('Logout failed');
        // Handle the failure case (e.g., show error message, retry, etc.)
      }
    }
  };


  return (
    <View>
      <ThemedText>shopprofile</ThemedText>
      <Pressable onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eb3483',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
})