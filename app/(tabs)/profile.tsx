import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/contexts/authContext';
import Icon from 'react-native-vector-icons/Entypo'; // Make sure this import is correct
import { ThemedText } from '@/components/ThemedText';



export default function ShopView() {
  const [first_name, setFirst_name] = useState<string>('');
  const [last_name, setLast_name] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone_number, setPhone_number] = useState<string>('');

  const { logout } = useContext(AuthContext) || {}; // Destructure logout directly, handling null or undefined case


  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const first_name = await AsyncStorage.getItem('first_name');
        const last_name = await AsyncStorage.getItem('last_name');
        const email = await AsyncStorage.getItem('email');
        const phone_number = await AsyncStorage.getItem('phone_number');

        console.log('profile first_name:', first_name);
        console.log('profile last_name:', last_name);
        console.log('profile email:', email);
        console.log('profile phone_number:', phone_number);

        if (first_name && last_name && email) {
          console.log('All required items for profile present in AsyncStorage');
          setFirst_name(first_name);
          setLast_name(last_name);
          setEmail(email);
          setPhone_number(phone_number || 'No phone number provided'); // Handle null or undefined case
        } else {
          console.log('Not all required items for profile are present in AsyncStorage');
        }
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
      }
    };

    checkAsyncStorage();
  }, []); // Ensure dependencies are properly specified

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
    <View style={styles.container}>
      {/* Big circle with shop icon */}
      <View style={styles.circle}>
        <Icon name="v-card" size={70} color="white" />
      </View>

      <View style={styles.detailsContainer}>
        <ThemedText style={styles.headerText} type="title">
          {first_name} {last_name}
        </ThemedText>
        <View style={styles.divider} />

        <ThemedText type="subtitle">Phone</ThemedText>
        <ThemedText style={styles.detailsText}>{phone_number}</ThemedText>
        <ThemedText type="subtitle">Email</ThemedText>
        <ThemedText style={styles.detailsText}>{email}</ThemedText>
        
        <Pressable onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    paddingTop: 90, // Adjusted to accommodate the circle at the top
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eb3483',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Center the circle horizontally
    marginBottom: 20, // Adjusted to create space between circle and details
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align content at the top of this container
    alignItems: 'center', // Center items horizontally
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Adjusted to center text horizontally
  },
  divider: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '100%', // Full width divider
  },
  detailsText: {
    marginBottom: 20,
    fontFamily: 'SpaceMono',
  },
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
});
