import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { NumberContext } from '@/contexts/NumberContexts';

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
      Object.values(order.measurements).forEach(measurement => {
        const { height, value } = measurement;
        addData(height, value);
        console.log('Added data: ', height, value);
      });
    }
  }, []);

  return (
    <View>
      <ThemedText>details</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({});
