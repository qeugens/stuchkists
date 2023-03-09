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
// import { apiUrl } from '../const'
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation, route }) => {
  const [username, onChangeUsername] = React.useState('test10');
  const [password1, onChangePassword1] = React.useState('password2');
  const [password2, onChangePassword2] = React.useState('password2');
  const [email, onChangeEmail] = React.useState('test10@mail.ru');

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
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Enter login"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword1}
        value={password1}
        placeholder="Enter password"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword2}
        value={password2}
        placeholder="Enter password again"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Enter email"
      />
      <Button
        onPress={signUp}
        title="Sign up"
        color="#841584"
        accessibilityLabel="Learn more"
      />
      <View style={styles.text}>
        <Text> {user.jti === '' ? '' : 'Token: ' + user.jti} </Text>
        <Text> {user.id === 0 ? '' : 'User id: ' + user.id} </Text>
        <Text>
          {' '}
          {user.username === '' ? '' : 'User name: ' + user.username}{' '}
        </Text>
        <Text>
          {' '}
          {user.password === '' ? '' : 'User password: ' + user.password}{' '}
        </Text>
        <Text> {user.email === '' ? '' : 'User email: ' + user.email} </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
