import React, { useContext } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../AuthContext';

const LogInScreen = ({ navigation, route }) => {
  const [email, onChangeEmail] = React.useState('qeugens@hse.ru');
  const [password, onChangePassword] = React.useState('password');
  const [token, setToken] = React.useState('');
  const [userId, setUserId] = React.useState(0);
  const [userName, setUserName] = React.useState('');

  function saveData() {
    _storeData = async () => {
      try {
        await AsyncStorage.setItem('token', token);
      } catch (error) {
        console.log(error); // Error saving data
      }
    };
  }

  function logIn() {
    dologIn();
  }

  function logOut() {
    setToken('');
    setUserId(0);
    setUserName('');
    saveData();
    alert('You are successfully sign out');
  }

  const dologIn = async () => {
    try {
      // console.log(JSON.stringify( {'email': email, 'password': password} ))
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
      let json = await response.json(); // получаем тело ответа

      if (typeof json['jti'] !== 'undefined') {
        setUserId(json.id);
        setUserName(json.username);
        setToken(json.jti);
        saveData();

        alert('You are successfully logged in as a user "' + json.jti + '"');
      } else if (typeof json['message'] !== 'undefined') {
        alert(json.message);
      } else console.log(json);
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Enter login"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Enter password"
      />
      <Button
        onPress={token === '' ? logIn : logOut}
        title={token === '' ? 'Sign In' : 'Sign out'}
        color="#841584"
        accessibilityLabel="Learn more"
      />
      <View style={styles.text}>
        <Text> {token === '' ? '' : 'Token: ' + token} </Text>
        <Text> {userId === 0 ? '' : 'User id: ' + userId} </Text>
        <Text> {userName === '' ? '' : 'User name: ' + userName} </Text>
      </View>
    </SafeAreaView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    margin: 12,
  },
});
