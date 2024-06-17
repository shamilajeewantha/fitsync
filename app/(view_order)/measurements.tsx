import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { NumberContext } from '@/contexts/NumberContexts'; // Import your NumberContext

export default function Measurements() {
  const context = useContext(NumberContext);

  // Assuming your context provides a way to access the added data
  // Handling the case where context is undefined
  if (!context) {
    throw new Error('NumberContext is not provided');
  }

  const { data } = context;

  return (
    <View style={styles.container}>
      <ThemedText>Measurements</ThemedText>
      <View style={styles.dataContainer}>
        {data.map(({ key, value }, index) => (
          <View key={index} style={styles.dataItem}>
            <ThemedText>Height: {key}</ThemedText>
            <ThemedText>Value: {value}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  dataItem: {
    marginBottom: 10,
  },
});
