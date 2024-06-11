// components/ReadComponent.tsx
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NumberContext } from '@/contexts/NumberContexts';

const ReadComponent: React.FC = () => {
  const context = useContext(NumberContext);

  // Handling the case where context is undefined
  if (!context) {
    throw new Error('NumberContext is not provided');
  }

  const { data } = context;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Data:</Text>
      {data.map(({ key, value }, index) => (
        <Text key={index}>{`${key}: ${value}`}</Text>
      ))}
    </View>
  );
};

export default ReadComponent;
