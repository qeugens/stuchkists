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
import CreateCollectionScreen from '../screen/CreateCollectionScreen';
// import { getData } from '../screen/LogInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 32,
  },
});

const HomeNavigator = createNativeStackNavigator();
//prettier-ignore
function FeedNav({navigation, route}) {
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
      <HomeNavigator.Screen
        name="LogIn"
        component={(props) => (
          <LogInScreen {...props} topNavigation={navigation} />
        )}
      />
      <HomeNavigator.Screen name="SignUp" component={SignUpScreen} />

      <HomeNavigator.Screen
        name="PostsList"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen name="Штучкис" component={ItemScreen} />

      <HomeNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="CreateCollection"
        component={CreateCollectionScreen}
      />
    </HomeNavigator.Navigator>
  );
}

export default function Tapbar() {
  const Tab = createBottomTabNavigator();
  const [token, setToken] = useState(null);

  function getData() {
    AsyncStorage.getItem('token', (err, result) => {
      // alert(result);
      setToken(result);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName=" "
        screenOptions={{
          headerShown: true,
        }}
        // tabBar={(props) => <View></View>}
      >
        {token ? (
          <>
            <Tab.Screen
              name="ФИД"
              component={FeedScreen}
              options={{
                tabBarIcon: () => (
                  <A_SearchIcon iconName="Search"></A_SearchIcon>
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="ПЛЮС"
              component={CreationScreen}
              options={{
                tabBarIcon: () => <A_AddIcon iconName="Add"></A_AddIcon>,
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Я"
              component={ProfileScreen}
              options={{
                tabBarIcon: () => (
                  <A_ProfileIcon iconName="Profile"></A_ProfileIcon>
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Новая коллекция"
              component={CreateCollectionScreen}
            />
            {/* <Tab.Screen name="Authorization" component={FeedNav} /> */}
          </>
        ) : (
          <>
            <Tab.Screen name="Authorization" component={FeedNav} />
            <Tab.Screen
              name="ФИД"
              component={FeedScreen}
              options={{
                tabBarIcon: () => (
                  <A_SearchIcon iconName="Search"></A_SearchIcon>
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </>
  );
}
