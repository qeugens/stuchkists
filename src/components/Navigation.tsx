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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreationScreen from '../screen/CreationScreen';
import ProfileScreen from '../screen/ProfileScreen';
import A_SearchIcon from './A_SearchIcon';
import A_AddIcon from './A_AddIcon';
import A_ProfileIcon from './A_ProfileIcon';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemScreen from '../screen/ItemScreen';
import FeedScreen from '../screen/FeedScreen';
import HomeScreen from '../screen/HomeScreen';
import LogInScreen from '../screen/LogInScreen';
import SignUpScreen from '../screen/SignUpScreen';

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: '32',
    lineHeight: '32',
  },
});

const HomeNavigator = createNativeStackNavigator();

function FeedNav() {
  return (
    <HomeNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: true,
      }}
      initialRouteName="Home"
    >
      <HomeNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen name="LogIn" component={LogInScreen} />
      <HomeNavigator.Screen name="SignUp" component={SignUpScreen} />

      <HomeNavigator.Screen
        name="PostsList"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen name="Штучкис" component={ItemScreen} />
    </HomeNavigator.Navigator>
  );
}

export default function Tapbar() {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name=" "
          component={FeedNav}
          options={{
            tabBarIcon: () => <A_SearchIcon iconName="Search"></A_SearchIcon>,
          }}
        />
        <Tab.Screen
          name="  "
          component={CreationScreen}
          options={{
            tabBarIcon: () => <A_AddIcon iconName="Add"></A_AddIcon>,
          }}
        />
        <Tab.Screen
          name="   "
          component={ProfileScreen}
          options={{
            tabBarIcon: () => (
              <A_ProfileIcon iconName="Profile"></A_ProfileIcon>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
