import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { AuthContext } from '../AuthContext';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    // retrieveData()
    if (token.length > 0) {
      // Let's check out this token
      console.log(token);
      // checkOutToken()
    } else console.log('No token yet');
    setLoading(false);
  }, []);

  useEffect(() => {
    // authorise()
    loadData();
  }, [isLoading]);

  function loadData() {
    _storeData = async () => {
      try {
        // await AsyncStorage.setItem('token', token);
        const tok = await AsyncStorage.getItem('token');
        console.log(tok);
        if (tok) {
          setToken(tok);
          // config.headers.Authorization = "Bearer "+token
        }
      } catch (error) {
        console.log(error); // Error saving data
      }
    };
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Log In" onPress={() => navigation.navigate('LogIn')} />

      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      <Text> {token === '' ? '' : 'Token: ' + token} </Text>
    </View>
  );
};

export default HomeScreen;
