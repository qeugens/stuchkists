import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image } from "react-native";
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from 'react-native';
import HomeScreen from "../screen/HomeScreen";
import CreationScreen from "../screen/CreationScreen";
import ProfileScreen from "../screen/ProfileScreen";


export default function Tapbar() {
  const Tab = createBottomTabNavigator();

  return (
    <>
          <Tab.Navigator
            // screenOptions={{ headerShown: false }}
            initialRouteName="home"

          >
            <Tab.Screen
              name="effects"
              component={HomeScreen}

            />
            <Tab.Screen
              name="home"
              component={HomeScreen}

            />
            <Tab.Screen
              name="profile"
              component={HomeScreen}

            />
          </Tab.Navigator>
      )}
    </>
  );
}
