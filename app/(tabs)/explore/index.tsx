import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import axios from 'axios';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Searchbar } from 'react-native-paper';
import { router, useRouter } from 'expo-router';


export default function TabTwoScreen() {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://192.168.8.100:3000/shop');
        setShops(response.data);
        setFilteredShops(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShops();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = shops.filter((shop) =>
      shop.shop_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredShops(filtered);
  };

  const navigateToShopDetail = (shopId) => {
    // Navigate to shop detail screen with shopId as parameter
    console.log('Navigating to shop detail', shopId.shop_name);
    router.push('/explore/shopview');

  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Searchbar
            placeholder="Search for shops..."
            value={searchQuery}
            onChangeText={handleSearch}
            theme={{ colors: { primary: '#eb3483' } }}
          />
        }
        data={filteredShops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToShopDetail(item)}>
            <View style={styles.shopItem}>
              <ThemedText type="subtitle">{item.shop_name}</ThemedText>
              <ThemedText style={{ fontFamily: 'SpaceMono', fontSize: 13 }}>
                {item.address}
              </ThemedText>
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    padding: 20,

  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  shopItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

});
