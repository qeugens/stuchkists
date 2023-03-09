import React, { useState, useContext, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  const [token, setToken] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Log In" onPress={() => navigation.navigate('LogIn')} />

      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      <Text> {token === '' ? '' : 'Token: ' + token} </Text>
    </View>
  );
};

export default HomeScreen;
