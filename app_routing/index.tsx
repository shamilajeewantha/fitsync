import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function index() {
  return (
    <View>
      <Text>index</Text>
      <Link href="/signin">About</Link>
      <Link href="/profile">About</Link>

    </View>
  )
}

const styles = StyleSheet.create({})