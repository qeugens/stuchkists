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
import styled from 'styled-components/native';

const A_Input = styled.TextInput`
  width: 374;
  height: 56;
  border-radius: 12;
  color: 'hsl(204, 9%, 37%)';
  opacity: 0.8;
  background-color: 'hsl(203, 24%, 99%);
  margin-top: 10;
`;
const A_Button = styled.TouchableOpacity`
  display: flex;
  text-align: center;
  width: 374;
  height: 72;
  background-color: 'hsl(203, 24%, 99%)';
  border-radius: 12;
  padding-top: 24px;
  margin-top: 100px;
`;
const O_LogInForm = styled.SafeAreaView`
  margin: 64px auto;
`;

const white = 'hsl(203, 24%, 99%)';
const beige = 'hsl(60, 4%, 96%)';
const lightBlue = 'hsl(214, 12%, 73%)';
const green = 'hsl(150, 7%, 63%)';
const darkBlue = 'hsl(204, 9%, 37%)';
const red = 'hsl(360, 62%, 65%)';

const LogInScreen = ({ navigation, route, topNavigation }) => {
  // const { topNavigation } = restprops;

  // alert(JSON.stringify(topNavigation));
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
    <O_LogInForm>
      <Text
        style={{
          color: darkBlue,
          fontFamily: 'IT',
          fontSize: 24,
          lineHeight: 24,
          textAlign: 'center',
          paddingLeft: 16,
          marginTop: 24,
          width: 350,
        }}
      >
        Ага, мы уже знакомы! Напомни свои данные
      </Text>
      <A_Input
        style={{
          color: green,
          fontFamily: 'IT',
          fontSize: 16,
          paddingLeft: 16,
          marginTop: 16,
          opacity: 0.8,
        }}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Enter login"
      />
      <A_Input
        style={{
          color: green,
          fontFamily: 'IT',
          fontSize: 16,
          paddingLeft: 16,
          marginTop: 16,
          opacity: 0.8,
        }}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <A_Button>
        <Text
          onPress={logIn}
          title={'Войти'}
          style={{
            color: darkBlue,
            fontFamily: 'IT',
            fontSize: 24,
            width: 374,
            color: 'hsl(204, 9%, 37%)',
            textAlign: 'center',
          }}
        >
          Войти
        </Text>
      </A_Button>
      <Text
        onPress={() => navigation.navigate('SignUp')}
        title={'Зарегистрироваться'}
        style={{
          color: darkBlue,
          fontFamily: 'IT',
          fontSize: 16,
          textTransform: 'uppercase',
          width: 374,
          color: 'hsl(204, 9%, 37%)',
          textAlign: 'center',
          marginTop: 24,
        }}
      >
        Зарегистрироваться
      </Text>
    </O_LogInForm>
  );
};

export default LogInScreen;
