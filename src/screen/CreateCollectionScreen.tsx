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

const CreateCollectionScreen = ({ navigation, route }) => {
  const [title, onChangeTitle] = React.useState('Упаковка');
  const [description, onChangeDescription] = React.useState(
    'фоткаю прикольные пачки чипсов и дошиков, а потом ем'
  );
  // const [userId, setUserId] = React.useState(0);
  // const [userName, setUserName] = React.useState('');
  const { token, setToken } = useContext(AuthContext);

  const createColletion = ({ navigation, topNavigation }) => {
    axios
      .post(
        'http://localhost:3000/api/v1/collections/',
        {
          collection: {
            title: title,
            description: description,
          },
        },
        { withCredentials: true, headers: { Authorization: `${token}` } }
      )
      .then((response) => {
        // alert(JSON.stringify(response));
        // saveData('userId', response.data.id);
        // setToken(response.headers.authorization);
      })
      .then(() => {
        topNavigation.navigate('');
      });
  };

  function getData() {
    AsyncStorage.getItem('token', (err, result) => {
      if (result) {
        setToken(result);
        // alert(result);
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        placeholder="Enter login"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeDescription}
        value={description}
        placeholder="Enter password"
      />
      <Button
        onPress={createColletion}
        title={'Создать коллекцию'}
        color="#841584"
        accessibilityLabel="Learn more"
      />
      {/* <View style={styles.text}>
        <Text> {token === '' ? '' : 'Token: ' + token} </Text>
        <Text> {userId === 0 ? '' : 'User id: ' + userId} </Text>
        <Text> {userName === '' ? '' : 'User name: ' + userName} </Text>
      </View> */}
    </SafeAreaView>
  );
};

export default CreateCollectionScreen;

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
