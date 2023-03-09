import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image } from "react-native";
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import SignUpScreen from './SignUpScreen';
import LogInScreen from './LogInScreen';

const styles = StyleSheet.create({
  title: {
  fontWeight: '700',
  fontSize: '32',
  lineHeight: '32',
},
});

export default function AuthNav() {

const AuthNav = createNativeStackNavigator()

  return (
      <AuthNav.Navigator initialRouteName="Home">
        <AuthNav.Screen name="Home" component={HomeScreen}/>
        <AuthNav.Screen name="LogIn" component={LogInScreen} />
        <AuthNav.Screen name="SignUp" component={SignUpScreen} />
      </AuthNav.Navigator>
  )
}