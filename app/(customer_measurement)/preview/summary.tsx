import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { NumberContext } from '@/contexts/NumberContexts'; // Import your NumberContext
import LoginTextInput from '@/components/LoginTextInput';
import PinkButton from '@/components/PinkButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Measurements() {
  const context = useContext(NumberContext);
  const [comment, setComment] = useState('');

  // Assuming your context provides a way to access the added data
  // Handling the case where context is undefined
  if (!context) {
    throw new Error('NumberContext is not provided');
  }

  const { data } = context;

 const handleSubmit = async () => {
    // Implement your logic for submitting the comments
    console.log(data)

    const measurements = {};
    for (let i = 0; i < data.length; i++) {
    measurements[i+1] = data[i]; // Use numeric index for the object key
    }

    console.log('measurements :',measurements)
    console.log('Submitting comments:', comment);

    try {
        const id = await AsyncStorage.getItem('id');
        const shop_id = await AsyncStorage.getItem('shop_id');
        if(id && shop_id){
            const new_id=parseInt(id);
            const new_shop_id=parseInt(shop_id);
            console.log('id:',new_id);
            console.log('shop_id:',new_shop_id);
        
            let date = new Date().toJSON();
            console.log(date);
        
            const response = await axios.post('http://192.168.8.100:3000/order/add', {
                customerId: new_id,
                shopId: new_shop_id,
                measurements: measurements,
                order_comments: comment,
                expected_delivery_date: date
              });
            
              console.log('message:', response.data);
        
        
        
        
        }
    }
    catch (error) {
        console.error('Error getting token:', error);
    }




  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Measurements</ThemedText>
      <View style={styles.dataContainer}>
        {data.map(({ key, value }, index) => (
          <View key={index} style={styles.dataItem}>
            <ThemedText >Measurement {index + 1}</ThemedText>
            <ThemedText >Value(cm): {value}</ThemedText>
          </View>
        ))}
      </View>
      <ThemedText style={styles.title}>Comments</ThemedText>

      <LoginTextInput placeholder='Comments' value={comment} onChangeText={setComment} style={styles.textInput} />
      <PinkButton buttonText="Submit" onPress={handleSubmit} />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Add some padding for better aesthetics
    justifyContent: 'center', // Align content in the center
  },
  title: {
    fontSize: 24, // Set a larger font size for the title
    fontWeight: 'bold', // Make the title bolder
    marginBottom: 10, // Add some space after the title
    marginTop: 30, // Add some space before the title
  },
  dataContainer: {
    backgroundColor: 'grey', // Light background for data section
    borderRadius: 5, // Add rounded corners
    padding: 10, // Add some padding inside the data container
    marginBottom: 20, // Add some space after the data container
  },
  dataItem: {
    marginBottom: 10, // Maintain the bottom margin
    borderBottomWidth: 1, // Add a separator line between data items
    borderBottomColor: '#ccc', // Set the separator line color
  },
  measurementLabel: {
    fontSize: 16, // Set a font size for measurement labels
  },
  measurementValue: {
    fontSize: 16, // Set a font size for measurement values
    fontWeight: 'bold', // Make measurement values bolder
  },
  textInput: {
    marginTop: 0, // Add some space above the text input
    padding: 10, // Add padding to the text input
    borderRadius: 5, // Add rounded corners to the text input
    backgroundColor: '#fff', // Set the text input background color
  },
});
