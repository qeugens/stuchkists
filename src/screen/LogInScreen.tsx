import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

import { AuthContext } from '../AuthContext';

const LogInScreen = ({ navigation, route, topNavigation }) => {
  // const { topNavigation } = restprops;

  alert(JSON.stringify(topNavigation));
  const [email, onChangeEmail] = React.useState('qeugens@hse.ru');
  const [password, onChangePassword] = React.useState('password');
  const [userId, setUserId] = React.useState(0);
  const [userName, setUserName] = React.useState('');
  const { token, setToken } = useContext(AuthContext);

  function saveData(name: string, value: any) {
    try {
      AsyncStorage.setItem(name, value.toString());
    } catch (error) {
      console.log('error');
      console.log(error); // Error saving data
    }
  }

  function deleteData() {
    console.log('deleting');
    try {
      AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('error');
      console.log(error); // Error saving data
    }
  }

  function getData() {
    AsyncStorage.getItem('token', (err, result) => {
      if (result) {
        setToken(result);
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate('FeedScrenn');
  //     }
  //   });
  //   return unsubscribe;
  // });

  const loginFunc = () => {
    axios
      .post('http://localhost:3000/api/v1/login', {
        user: {
          email: email,
          password: password,
        },
      })
      // {headers: {Authorization: ${token}}})
      .then((response) => {
        // alert(JSON.stringify(response.data.id));
        saveData('token', response.headers.authorization);
        saveData('userId', response.data.id);
        setToken(response.headers.authorization);
      })
      .then(() => {
        topNavigation.navigate('ФИД');
      });
  };

  const logoutFunc = () => {
    axios.delete('http://localhost:3000/api/v1/logout').then((response) => {
      deleteData();
    });
  };

  // const dologIn = async () => {
  //   try {
  //     // console.log(JSON.stringify({ email: email, password: password }));
  //     const response = await fetch('http://localhost:3000/api/v1/login', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           email: email,
  //           password: password,
  //         },
  //       }),
  //     });

  //     let json = await response.json(); // получаем тело ответа
  //     alert(JSON.stringify(json));
  //     if (typeof json['jti'] !== 'undefined') {
  //       setUserId(json.id);
  //       setUserName(json.username);
  //       setToken(json.jti);
  //       saveData(json.jti);

  //       alert('You are successfully logged in as a user "' + json.jti + '"');
  //     } else if (typeof json['message'] !== 'undefined') {
  //       alert(json.message);
  //     } else console.log(json);
  //   } catch (error) {
  //     alert(error);
  //   } finally {
  //   }
  // };

  function logIn() {
    // dologIn();
    loginFunc();
  }

  function logOut() {
    setToken('');
    setUserId(0);
    setUserName('');
    logoutFunc();
    navigation?.navigate('FeedScreen');
    alert('You are successfully sign out');
  }

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
      {/* <Button
        onPress={() => topNavigation.navigate('ФИД')}
        title={'go somewhere'}
        color="#841584"
        accessibilityLabel="Learn more"
      /> */}
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
