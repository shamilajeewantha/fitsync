import { View, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MeasurementImage() {
  return (
    <Image
    source={require('@/assets/images/woman.png')}
    style={styles.image}
    resizeMode="contain"
  />
  )
}

const styles = StyleSheet.create({  image: {
    width: screenWidth,
    height: screenHeight,
    marginTop: 20,
  },})