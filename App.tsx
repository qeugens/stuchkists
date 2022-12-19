import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import Tapbar from "./src/components/Tapbar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screen/HomeScreen";
import CreationScreen from "./src/screen/CreationScreen";
import ProfileScreen from "./src/screen/ProfileScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "500",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tapbar></Tapbar>
        </NavigationContainer>
      </SafeAreaView>
  );
}
