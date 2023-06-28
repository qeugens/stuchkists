import * as React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

const white = 'hsl(203, 24%, 99%)';
const beige = 'hsl(60, 4%, 96%)';
const lightBlue = 'hsl(214, 12%, 73%)';
const green = 'hsl(150, 7%, 63%)';
const darkBlue = 'hsl(204, 9%, 37%)';
const red = 'hsl(360, 62%, 65%)';

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
const O_SignUpForm = styled.SafeAreaView`
  margin: 64px auto;
`;

const SignUpScreen = ({ navigation, route }) => {
  const [username, onChangeUsername] = React.useState('qeugens');
  const [password1, onChangePassword1] = React.useState('password');
  const [password2, onChangePassword2] = React.useState('password');
  const [email, onChangeEmail] = React.useState('qeugens@hse.ru');

  const emptyUser = {
    id: 0,
    username: '',
    password: '',
    email: '',
    jti: '',
  };
  const [user, setUser] = useState(emptyUser);

  function signUp() {
    signOut();
    doSignUp();
  }

  function signOut() {
    setUser(emptyUser);
  }

  const doSignUp = async () => {
    // console.log(username, email, password1, password2);
    try {
      const response = await fetch('http://localhost:3000/api/v1/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            password: password1,
            password_confirmation: password2,
            email: email,
            username: username,
          },
        }),
      });
      const json = await response.json();
      console.log(json);

      if (typeof json['user'] !== 'undefined') {
        // setUser(json.user);
        // setData(json);
        console.log(json.user.jti);
        const user = {
          jti: json.user.jti,
          id: json.user.id,
          username: json.user.username,
          password: json.user.password,
          email: json.user.email,
        };
        setUser(user);

        alert(
          'You are successfully signed up as a user "' + json.user.jti + '"'
        );
      } else if (typeof json['message'] !== 'undefined') {
        alert(json.message);
      } else console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <O_SignUpForm>
      <Text
        style={{
          color: darkBlue,
          fontFamily: 'IT',
          fontSize: 24,
          lineHeight: 24,
          textAlign: 'center',
          paddingLeft: 16,
          marginTop: 24,
        }}
      >
        Хэй! Давай сделаем тебе профиль
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
        placeholder="Твоя почта"
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
        onChangeText={onChangePassword1}
        value={password1}
        placeholder="Твой пароль"
        secureTextEntry={true}
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
        onChangeText={onChangePassword2}
        value={password2}
        placeholder="И ещё разок"
        secureTextEntry={true}
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
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Твой никнейм"
      />
      <A_Button>
        <Text
          onPress={signUp}
          title={'Зарегистрироваться'}
          style={{
            color: darkBlue,
            fontFamily: 'IT',
            fontSize: 24,
            width: 374,
            color: 'hsl(204, 9%, 37%)',
            textAlign: 'center',
          }}
        >
          Зарегистрироваться
        </Text>
      </A_Button>
      <Text
        onPress={() => navigation.navigate('LogIn')}
        title={'Войти'}
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
        Войти
      </Text>
    </O_SignUpForm>
  );
};

export default SignUpScreen;
