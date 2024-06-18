import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { NumberContext } from '@/contexts/NumberContexts';
import Icon from 'react-native-vector-icons/Entypo'; // Make sure this import is correct
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const order = JSON.parse(params.order);


  const context = useContext(NumberContext);
  if (!context) {
    throw new Error('NumberContext is not provided');
  }
  const { addData } = context;

  useEffect(() => {
    console.log('orderview parameters : ', order);

    if (order.measurements) {

      Object.keys(order.measurements).forEach(key => {
        const measurement = order.measurements[key];
        console.log(`Measurement: ${key}, Key: ${measurement.key}, Value: ${measurement.value} `);
        addData(measurement.key, measurement.value);
      });
    }
  }, []);

  return (
    <ParallaxScrollView >
      <View style={styles.circle}>
        <Icon name="shopping-bag" size={70} color="white" />
      </View>

      <View style={styles.detailsContainer}>
        <ThemedText style={styles.headerText} type="title">
          {order.customer.first_name} {order.customer.last_name}
        </ThemedText>
        <View style={styles.divider} />

        <ThemedText type="subtitle">Phone</ThemedText>
        <ThemedText style={styles.detailsText}>{order.customer.phone_number}</ThemedText>
        <ThemedText type="subtitle">Email</ThemedText>
        <ThemedText style={styles.detailsText}>{order.customer.email}</ThemedText>
        <ThemedText type="subtitle">Order placed date</ThemedText>
        <ThemedText style={styles.detailsText}>{order.order_placed_date}</ThemedText>
        <ThemedText type="subtitle">Expected delivery date</ThemedText>
        <ThemedText style={styles.detailsText}>{order.expected_delivery_date}</ThemedText>
        <ThemedText type="subtitle">Comments</ThemedText>
        <ThemedText style={styles.detailsText}>{order.order_comments}</ThemedText>
        
      </View>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({

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