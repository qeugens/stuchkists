import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import Navigation from './src/components/Navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthState } from './src/AuthState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: '500',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <AuthState>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Navigation></Navigation>
        </SafeAreaView>
      </NavigationContainer>
    </AuthState>
  );
}
