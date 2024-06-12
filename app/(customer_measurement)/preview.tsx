import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

interface KeyValuePair {
  key: number;
  value: number;
}

const App = () => {
  const [data, setData] = useState<KeyValuePair[]>([]);

  useEffect(() => {
    axios.get('http://192.168.8.100:3000/integer-key-value-pairs')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          {data.map((pair) => (
            <Text key={pair.key} style={styles.pair}>
              Key: {pair.key}, Value: {pair.value}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  pair: {
    fontSize: 18,
    marginVertical: 8,
  },
});

export default App;
