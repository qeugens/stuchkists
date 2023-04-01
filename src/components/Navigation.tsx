import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreationScreen from '../screen/CreationScreen';
import ProfileScreen from '../screen/ProfileScreen';
import Q_Eyes from './Quarks/Q_Eyes';
import Q_Plus from './Quarks/Q_Plus';
import Q_Profile from './Quarks/Q_Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemScreen from '../screen/ItemScreen';
import FeedScreen from '../screen/FeedScreen';
import HomeScreen from '../screen/HomeScreen';
import LogInScreen from '../screen/LogInScreen';
import SignUpScreen from '../screen/SignUpScreen';
import CreateCollectionScreen from '../screen/CreateCollectionScreen';
import CollectionScreen from '../screen/CollectionScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useSelector } from 'react-redux';
import CrazyTabs from './Atoms/A_Tabbar';
import Q_HeaderBack from './Quarks/Q_HeaderBack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ImagePickerExample from '../components/Gallery';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';

const white = 'hsl(203, 24%, 99%)';
const beige = 'hsl(60, 4%, 96%)';
const lightBlue = 'hsl(214, 12%, 73%)';
const green = 'hsl(150, 7%, 63%)';
const darkBlue = 'hsl(204, 9%, 37%)';
const red = 'hsl(360, 62%, 65%)';

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
      initialRouteName="SignUp"
    >
      {/* <HomeNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
      <HomeNavigator.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <HomeNavigator.Screen
        name="LogIn"
        component={LogInScreen}
        // component={(props) => (
        //   <LogInScreen {...props} topNavigation={navigation} />
        // )}
        options={{ headerShown: false }}
      />

      <HomeNavigator.Screen
        name="PostsList"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      {/* <HomeNavigator.Screen name="Штучкис" component={ItemScreen} /> */}

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

export default function Tapbar({}) {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);
  // const { username, userId } = useSelector((state) => state.main);

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
        tabBar={(props) => <CrazyTabs {...props} />}
        // tabBar={(props) => <View></View>}
      >
        {token ? (
          <>
            <Tab.Screen
              name="ФИД"
              component={FeedScreen}
              options={{
                tabBarIcon: () => <Q_Eyes iconName="Q_Eyes"></Q_Eyes>,
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Создание штучкиса"
              component={CreationScreen}
              options={{
                tabBarIcon: () => <Q_Plus iconName="Q_Plus"></Q_Plus>,
                headerShown: true,
                tabBarStyle: { display: 'none' },
                headerStyle: {
                  backgroundColor: beige,
                },
                headerTitleStyle: {
                  color: darkBlue,
                  fontFamily: 'IT',
                  fontSize: 16,
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{
                      marginLeft: 8,
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <Q_HeaderBack iconName="Q_HeaderBack"></Q_HeaderBack>
                  </TouchableOpacity>
                ),
              }}
            />
            <Tab.Screen
              name="Я"
              component={ProfileScreen}
              options={{
                tabBarIcon: () => <Q_Profile iconName="Q_Profile"></Q_Profile>,
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Новая коллекция"
              component={CreateCollectionScreen}
              options={{
                headerShown: true,
                tabBarStyle: { display: 'none' },
                headerStyle: {
                  backgroundColor: beige,
                },
                headerTitleStyle: {
                  color: darkBlue,
                  fontFamily: 'IT',
                  fontSize: 16,
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{
                      marginLeft: 8,
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <Q_HeaderBack iconName="Q_HeaderBack"></Q_HeaderBack>
                  </TouchableOpacity>
                ),
              }}
            />
            <Tab.Screen
              name="Коллекция"
              component={CollectionScreen}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: beige,
                },
                headerTitleStyle: {
                  color: darkBlue,
                  fontFamily: 'IT',
                  fontSize: 16,
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{
                      marginLeft: 8,
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <Q_HeaderBack iconName="Q_HeaderBack"></Q_HeaderBack>
                  </TouchableOpacity>
                ),
              }}
            />
            <Tab.Screen
              name="Штучкис"
              component={ItemScreen}
              options={{
                headerShown: true,
                headerLeft: () => (
                  <Q_HeaderBack
                    iconName="Q_Profile"
                    onPress={() => alert('This is a button!')}
                  />
                ),
              }}
            />
            {/* <Tab.Screen name="Authorization" component={FeedNav} /> */}
          </>
        ) : (
          <>
            <Tab.Screen
              options={{
                // tabBarIcon: () => <Q_Eyes iconName="Q_Eyes"></Q_Eyes>,
                headerShown: false,
                tabBarStyle: { display: 'none' },
              }}
              name="Authorization"
              component={FeedNav}
            />
            <Tab.Screen
              name="ФИД"
              component={FeedScreen}
              options={{
                tabBarIcon: () => <Q_Eyes iconName="Q_Eyes"></Q_Eyes>,
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </>
  );
}
