import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Image, StyleSheet, LayoutChangeEvent, NativeSyntheticEvent, PanResponder, Dimensions, Text, Button, TextInput } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { NumberContext } from '@/contexts/NumberContexts';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MyComponent: React.FC = () => {
  const context = useContext(NumberContext);

  // Handling the case where context is undefined
  if (!context) {
    throw new Error('NumberContext is not provided');
  }

  const { addData } = context;
  const [inputValue, setInputValue] = useState('');

  const handleAddData = () => {
    if (imageLayoutRef.current) {
      const heightPercentage = ((linePosition - imageLayoutRef.current.y) / imageLayoutRef.current.height) * 100;
      const key = heightPercentage;
      const value = parseInt(inputValue, 10);

      if (!isNaN(key) && !isNaN(value)) {
        addData(key, value);
        setInputValue('');
      }
      setLinePosition(screenHeight / 2);
    }
  };

  const [linePosition, setLinePosition] = useState(screenHeight / 2);
  const imageLayoutRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const [lineWidth, setLineWidth] = useState(0);

  const headerHeight = 2*useHeaderHeight();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (_, gestureState) => {
        if (imageLayoutRef.current) {
          const adjustedY = gestureState.moveY - headerHeight;
          if (adjustedY >= imageLayoutRef.current.y && adjustedY <= imageLayoutRef.current.y + imageLayoutRef.current.height) {
            const heightPercentage = ((adjustedY - imageLayoutRef.current.y) / imageLayoutRef.current.height) * 100;
            console.log(`Movedgrant at ${heightPercentage.toFixed(2)}% of the image height.`);
            setLinePosition(adjustedY);
          }
        }
      },
      onPanResponderMove: (_, gestureState) => {
        console.log("moveY: ", gestureState.moveY);

        if (imageLayoutRef.current) {
          const adjustedY = gestureState.moveY - headerHeight;
          if (adjustedY >= imageLayoutRef.current.y && adjustedY <= imageLayoutRef.current.y + imageLayoutRef.current.height) {
            const heightPercentage = ((adjustedY - imageLayoutRef.current.y) / imageLayoutRef.current.height) * 100;
            console.log(`Moved at ${heightPercentage.toFixed(2)}% of the image height.`);
            setLinePosition(adjustedY);
            console.log("inside");
          } else {
            console.log("outside");
          }
        }
      },
    })
  ).current;

  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    imageLayoutRef.current = { x, y, width, height };
    setLineWidth(width); // Set the line width to match the image width
    console.log(`Image Layout:\nX: ${x}\nY: ${y}\nWidth: ${width}\nHeight: ${height}`);
  };

  const onTouchStart = (event: NativeSyntheticEvent<any>) => {
    console.log("Image touched");

    if (imageLayoutRef.current) {
      const touchY = event.nativeEvent.locationY;
      const heightPercentage = (touchY / imageLayoutRef.current.height) * 100;
      const pageY = event.nativeEvent.pageY;
      const absoluteY = imageLayoutRef.current.y + touchY;
      console.log(`Touched at ${heightPercentage.toFixed(2)}% of the image height.`);
      console.log(`Touched at pageY: ${pageY}`);
      console.log(`Touched at absoluteY: ${absoluteY}`);
      setLinePosition(absoluteY);
    }
  };

  useEffect(() => {
    console.log("Line position updated:", linePosition);
    if (imageLayoutRef.current) {
      const heightPercentage = ((linePosition - imageLayoutRef.current.y) / imageLayoutRef.current.height) * 100;
      console.log(`Line position updated at ${heightPercentage.toFixed(2)}% of the image height.`);
    }
  }, [linePosition]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        {...panResponder.panHandlers}
        source={require('@/assets/images/woman.png')}
        onLayout={handleImageLayout}
        onTouchStart={onTouchStart}
      />
      <View style={[styles.line, { top: linePosition - 0.5, width: lineWidth }]} />
      <Text style={styles.text}>Line position: {linePosition}</Text>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter a value (number)"
        keyboardType="numeric"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
      />
      <Button title="Add Data" onPress={handleAddData} />
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
    color: 'white',
    marginTop: 20,
  },
});

export default MyComponent;
