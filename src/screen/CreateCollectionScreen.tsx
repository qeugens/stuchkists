import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
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
`;
const A_Textarea = styled.TextInput`
  width: 374;
  height: 96;
  border-radius: 12;
  color: 'hsl(150, 7%, 63%)';
  opacity: 0.8;
  background-color: 'hsl(203, 24%, 99%);
`;
const M_InputDescriptionTitle = styled.View`
  display: flex;
  flex-direction: column;
  height: 96;
  justify-content: space-between;
`;
const M_TextareaDescriptionTitle = styled.View`
  display: flex;
  flex-direction: column;
  height: 136;
  justify-content: space-between;
  margin-top: 16px;
`;
const O_CreateCollectionForm = styled.View`
  display: flex;
  flex-direction: column;
  height: 256;
  justify-content: space-between;
  margin: 16px auto;
`;
const A_Button = styled.TouchableOpacity`
  display: flex;
  text-align: center;
  width: 374;
  height: 72;
  background-color: 'hsl(203, 24%, 99%)';
  border-radius: 12;
  padding-top: 24px;
  // margin-top: 377px;
`;
const O_CreationScreen = styled.View`
  display: flex;
  flex-direction: column;
  height: 701;
  justify-content: space-between;
  margin: 0 auto;
`;

const CreateCollectionScreen = ({ navigation, route }) => {
  const [title, onChangeTitle] = React.useState('Камни');
  const [description, onChangeDescription] = React.useState(
    'Собираю камни из разных стран, которые нельзя вывозить'
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
        topNavigation.navigate('Я');
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
    <O_CreationScreen>
      <O_CreateCollectionForm>
        <M_InputDescriptionTitle>
          <Text
            style={{
              color: darkBlue,
              fontFamily: 'IT',
              fontSize: 24,
              paddingLeft: 16,
            }}
          >
            Название коллекции
          </Text>
          <A_Input
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Смешные ёлочки"
            style={{
              color: green,
              fontFamily: 'IT',
              fontSize: 24,
              padding: 16,
              opacity: 0.8,
            }}
          />
        </M_InputDescriptionTitle>
        <M_TextareaDescriptionTitle>
          <Text
            style={{
              color: darkBlue,
              fontFamily: 'IT',
              fontSize: 24,
              paddingLeft: 16,
              opacity: 0.8,
            }}
          >
            Описание
          </Text>
          <A_Textarea
            onChangeText={onChangeDescription}
            multiline={true}
            numberOfLines={4}
            value={description}
            placeholder="м?"
            style={{
              color: green,
              fontFamily: 'IT',
              fontSize: 16,
              padding: 16,
            }}
          />
        </M_TextareaDescriptionTitle>
      </O_CreateCollectionForm>
      <A_Button>
        <Text
          onPress={createColletion}
          title={'Создать коллекцию'}
          style={{
            color: darkBlue,
            fontFamily: 'IT',
            fontSize: 24,
            width: 374,
            textAlign: 'center',
          }}
        >
          Создать коллекцию
        </Text>
      </A_Button>
    </O_CreationScreen>
  );
};

export default CreateCollectionScreen;
