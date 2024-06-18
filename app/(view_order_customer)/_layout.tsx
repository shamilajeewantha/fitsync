import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NumberProvider } from '@/contexts/NumberContexts';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <NumberProvider>

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="details_cusord"
        options={{
          title: 'Details',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="measurements_cusord"
        options={{
          title: 'Measurements',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'print' : 'print-outline'} color={color} />
          ),
        }}
      />

    </Tabs>
    </NumberProvider>

  );
}
