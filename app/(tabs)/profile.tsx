// components/ReadComponent.tsx
import React, { useContext, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import { NumberContext } from '@/contexts/NumberContexts';



const { width: screenWidth, height: screenHeight } = Dimensions.get('window');



const ReadComponent: React.FC = () => {
  const context = useContext(NumberContext);

  // Handling the case where context is undefined
  if (!context) {
    throw new Error('NumberContext is not provided');
  }

  const { data } = context;
  const imageLayoutRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);



  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    imageLayoutRef.current = { x, y, width, height };
    console.log(`Image Layout:\nX: ${x}\nY: ${y}\nWidth: ${width}\nHeight: ${height}`);
  };




  return (
  <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('@/assets/images/woman.png')}
        onLayout={handleImageLayout}

      />
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Data:</Text>
      {data.map(({ key, value }, index) => (
        <View key={index} style={[styles.text, { top: imageLayoutRef.current.y+(key / 100) * imageLayoutRef.current.height, width: screenWidth/1.1 }]}>
        <Text >measurement {index+1}</Text>
        <View style={[styles.line, { width: screenWidth-45 }]} />
        </View>
      ))}
      {data.map(({ key, value }, index) => (
        <Text key={index}>measurement {index+1} : {value}cm</Text>
      ))}

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300, // Define a fixed width for the image
    height: 600, // Define a fixed height for the image
  },
  line: {
    position: 'absolute',
    height: 2, // Adjusted the height to make the line more visible
    backgroundColor: 'red', // Change this value to adjust the color of the line
  },
  text: {
    position: 'absolute',
  },

});



export default ReadComponent;
