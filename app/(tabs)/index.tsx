import React from 'react';
import { StyleSheet } from 'react-native';
import HorizontalLine from '@/components/HorizontalLine';

export default function HomeScreen(): JSX.Element {
  return (
      <HorizontalLine />
  );
}

const styles = StyleSheet.create({



});



/* 
import React, { useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const DrawLinesOnImage = () => {
  const imageRef = useRef();

  const saveImage = async () => {
    try {
      const uri = await captureRef(imageRef, {
        format: 'png',
        quality: 1,
      });

      const fileName = 'drawn_image.png';
      const filePath = FileSystem.documentDirectory + fileName;

      await FileSystem.copyAsync({
        from: uri,
        to: filePath,
      });

      console.log('Image saved:', filePath);
      // Here you can save the image path or perform further actions
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={imageRef} collapsable={false}>
        <Image
          source={require('@/assets/images/woman.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={[styles.line, { top: screenHeight / 2 }]} />
      </View>
      <TouchableOpacity onPress={saveImage} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight,
  },
  line: {
    width: screenWidth,
    height: 1,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DrawLinesOnImage;
 */