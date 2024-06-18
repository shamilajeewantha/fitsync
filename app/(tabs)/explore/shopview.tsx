import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import Icon from 'react-native-vector-icons/Entypo';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function shopview() {
  const params = useLocalSearchParams();
  console.log('shopview parameters : ', params);

  // Destructure params object for cleaner access
  const { id = undefined, shop_name, address, phone, email } = params;

  const handlePlaceOrder = async () => {
    try {
      if (id !== undefined) {
        console.log('Placing order...');
        await AsyncStorage.setItem('shop_id', id.toString());
        router.push("/marker");
      } else {
        console.error('id is undefined. Cannot place order.');
      }
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Big circle with shop icon */}
      <View style={styles.circle}>
        <Icon name="shop" size={70} color="white" /> 
      </View>
      
      <View style={styles.detailsContainer}>
        <ThemedText style={styles.headerText} type="title">{shop_name}</ThemedText>
        <View style={styles.divider} />
        <ThemedText type="subtitle">Address</ThemedText>
        <ThemedText style={styles.detailsText}>{address}</ThemedText>
        <ThemedText type="subtitle">Phone</ThemedText>
        <ThemedText style={styles.detailsText}>{phone}</ThemedText>
        <ThemedText type="subtitle">Email</ThemedText>
        <ThemedText style={styles.detailsText}>{email}</ThemedText>
        <Pressable onPress={handlePlaceOrder} style={styles.button}>
          <Text style={styles.buttonText}>Place Order</Text>
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
    textAlign: 'center',
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
