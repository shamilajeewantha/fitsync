// components/ReadComponent.tsx
import React, { useContext, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, LayoutChangeEvent, ScrollView, Pressable } from 'react-native';
import { NumberContext } from '@/contexts/NumberContexts';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';



const { width: screenWidth, height: screenHeight } = Dimensions.get('window');



const ReadComponent: React.FC = () => {
  const context = useContext(NumberContext);

  // Handling the case where context is undefined
  if (!context) {
    throw new Error('NumberContext is not provided');
  }

  const { data } = context;
  const imageLayoutRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);



  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    imageLayoutRef.current = { x, y, width, height };
    console.log(`Image Preview Layout:\nX: ${x}\nY: ${y}\nWidth: ${width}\nHeight: ${height}`);
    setImageLoaded(true);
  };

  const handlePlaceOrder = () => {
    // Implement your logic for placing an order here
    console.log('confirming order...');
  };


  return (
    <ThemedView style={styles.container}>
      <Image
        style={styles.image}
        source={require('@/assets/images/woman.png')}
        onLayout={handleImageLayout}

      />
      {imageLoaded && data.map(({ key, value }, index) => (
        <View key={index} style={{position: 'absolute', top: imageLayoutRef.current.y+(key / 100) * imageLayoutRef.current.height, width: screenWidth/1.1 }}>
        <Text style={styles.text}>MS {index+1}</Text>
        <View style={[styles.line, { width: screenWidth-45 }]} />
        </View>
      ))}

      <ScrollView >
      <View style={{ alignItems: 'center', marginTop:15}}> 
        <ThemedText type="subtitle">Your Data</ThemedText>          
        {data.map(({ key, value }, index) => (
          <ThemedText style={{fontFamily: 'SpaceMono', marginTop:10}} key={index}>Measurement {index+1} : {value}cm</ThemedText>
        ))}

      </View>
      </ScrollView>
      <Pressable onPress={handlePlaceOrder} style={styles.button}>
          <Text style={styles.buttonText}>Confirm Order</Text>
      </Pressable>
    </ThemedView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250, // Define a fixed width for the image
    height: 500, // Define a fixed height for the image
  },
  line: {
    position: 'absolute',
    height: 2, // Adjusted the height to make the line more visible
    backgroundColor: 'red', // Change this value to adjust the color of the line
  },
  text: {
    color: 'red',
  },
  button: {
    backgroundColor: '#eb3483',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});



export default ReadComponent;
