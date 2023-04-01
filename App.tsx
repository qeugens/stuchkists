import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import Navigation from './src/components/Navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthState } from './src/AuthState';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Statusbar from './src/components/Atoms/A_StatusBar';
// import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
  const [fontsLoaded] = useFonts({
    IT: require('./assets/font/InterTight-Medium.ttf'),
  });
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // const Status = () => (
  //   <View
  //     style={{
  //       flex: 1,
  //       backgroundColor: '#000',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     }}
  //   >
  //     <Text style={{ color: '#fff' }}>
  //       Notice that the status bar has light text!
  //     </Text>
  //     <StatusBar style="light" />
  //   </View>
  // );

  const Tab = createBottomTabNavigator();
  return (
    <AuthState>
      <Statusbar />
      <NavigationContainer>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <Navigation></Navigation>
        </SafeAreaView>
      </NavigationContainer>
    </AuthState>
  );
}
