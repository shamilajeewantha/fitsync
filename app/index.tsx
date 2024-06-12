import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

export default function index() {
  return (
    <View>
      <Text>index</Text>
      <Link href="/signin">Signin</Link>      
      <Link href="/login">Login</Link>      
    </View>
  )
}

const styles = StyleSheet.create({})