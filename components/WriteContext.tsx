// components/AddComponent.tsx
import React, { useContext, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { NumberContext } from '@/contexts/NumberContexts';

const AddComponent: React.FC = () => {
  const context = useContext(NumberContext);

  // Handling the case where context is undefined
  if (!context) {
    throw new Error('NumberContext is not provided');
  }

  const { addData } = context;
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleAddData = () => {
    const key = parseInt(inputKey, 10);
    const value = parseInt(inputValue, 10);

    if (!isNaN(key) && !isNaN(value)) {
      addData(key, value);
      setInputKey('');
      setInputValue('');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        value={inputKey}
        onChangeText={setInputKey}
        placeholder="Enter a key (number)"
        keyboardType="numeric"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
      />
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

export default AddComponent;
