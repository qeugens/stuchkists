import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as permissions from 'react-native-permissions';
import { request, PERMISSIONS } from 'react-native-permissions';
import ImagePickerExample from '../components/Gallery';
import styled from 'styled-components/native';

const Consumer = styled.Image`
  display: none;
`;

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
  background-color: 'hsl(203, 24%, 99%)';
`;
const A_Textarea = styled.TextInput`
  width: 374;
  height: 96;
  border-radius: 12;
  color: 'hsl(150, 7%, 63%)';
  opacity: 0.8;
  background-color: 'hsl(203, 24%, 99%)';
`;
const A_Button = styled.TouchableOpacity`
  display: flex;
  text-align: center;
  width: 374;
  height: 72;
  background-color: 'hsl(203, 24%, 99%)';
  border-radius: 12;
  padding-top: 24px;
  margin-top: 80px;
`;
const O_ItemsCreationForm = styled.ScrollView`
  margin: 0 auto;
`;
// const M_CollectionList = styled.View`
//   width: 374;
//   margin-right: 8px;
// `;
// const A_CollectionCard = styled.Text`
//   width: 374;
//   height: 50;
//   border-radius: 12px;
// `;

const CreationScreen = ({ navigation, route, topNavigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = useState('');
  const [date, onChangeDate] = useState('29.05.2023');
  const [geotag, onChangeGeotag] = useState('Дубай');
  const [note, onChangeNote] = useState('Любимый штучкис');
  const [collection_id, onChangeCollectionId] = useState('15');
  const { token, setToken } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/collections', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createItem = () => {
    let formdata = new FormData();

    formdata.append('item[date]', date);
    formdata.append('item[geotag]', geotag);
    formdata.append('item[note]', note);
    formdata.append('item[collection_id]', collection_id);
    formdata.append('item[image]', {
      uri: `${image.uri}`,
      name: `${image.fileName}`,
      type: `${image.type}`,
    });

    axios
      .post('http://localhost:3000/api/v1/items/', formdata, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // alert(JSON.stringify(response));
        // saveData('userId', response.data.id);
        // setToken(response.headers.authorization);
      })
      .then(() => {
        topNavigation.navigate('Коллекция');
      });
  };

  const selectCollection = (collectionId) => {
    onChangeCollectionId(collectionId);
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

  interface Collection {
    id: any;
    title: any;
    description: any;
  }

  return (
    <O_ItemsCreationForm>
      <ImagePickerExample
        onSelectImage={(image) => {
          console.log(image);
          setImage(image);
        }}
      />
      {/* <ImageAnalyticsTagContext></ImageAnalyticsTagContext> */}
      <Text
        style={{
          color: darkBlue,
          fontFamily: 'IT',
          fontSize: 24,
          paddingLeft: 16,
          marginTop: 24,
        }}
      >
        Дата находки
      </Text>
      <A_Input
        style={{
          color: green,
          fontFamily: 'IT',
          fontSize: 16,
          padding: 16,
          opacity: 0.8,
          marginTop: 16,
        }}
        onChangeText={onChangeDate}
        value={date}
        placeholder="18.03.2023"
      />
      <Text
        style={{
          color: darkBlue,
          fontFamily: 'IT',
          fontSize: 24,
          paddingLeft: 16,
          marginTop: 24,
        }}
      >
        Место находки
      </Text>
      <A_Input
        style={{
          color: green,
          fontFamily: 'IT',
          fontSize: 16,
          padding: 16,
          opacity: 0.8,
          marginTop: 16,
        }}
        onChangeText={onChangeGeotag}
        value={geotag}
        placeholder="Бабушкина кладовка"
      />
      <Text
        style={{
          color: green,
          fontFamily: 'IT',
          fontSize: 12,
          lineHeight: 12,
          textAlign: 'center',
          width: 374,
          padding: 8,
        }}
      >
        Ты можешь назвать локацию как только захочешь, без географических
        точностей
      </Text>
      <Text
        style={{
          color: darkBlue,
          fontFamily: 'IT',
          fontSize: 24,
          paddingLeft: 16,
          marginTop: 16,
        }}
      >
        Описание
      </Text>
      <A_Textarea
        style={{
          color: green,
          fontFamily: 'IT',
          fontSize: 16,
          padding: 16,
          opacity: 0.8,
          marginTop: 16,
        }}
        multiline={true}
        numberOfLines={4}
        onChangeText={onChangeNote}
        value={note}
        placeholder="Enter password"
      />
      <Text
        style={{
          color: green,
          fontFamily: 'IT',
          fontSize: 12,
          lineHeight: 12,
          textAlign: 'center',
          width: 374,
          padding: 8,
        }}
      >
        Никто, кроме тебя, его не увидит, поэтому можешь здесь описать даже
        самые сокровенные мысли о находке
      </Text>
      {/* <M_CollectionList>
        <FlatList
          data={collections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectCollection(item.id)}>
              <A_CollectionCard>{item.title}</A_CollectionCard>
            </TouchableOpacity>
          )}
        />
      </M_CollectionList> */}
      <A_Button>
        <Text
          onPress={() => createItem()}
          title={'Создать штучкис'}
          style={{
            color: darkBlue,
            fontFamily: 'IT',
            fontSize: 24,
            width: 374,
            color: 'hsl(204, 9%, 37%)',
            textAlign: 'center',
          }}
        >
          Создать штучкис
        </Text>
      </A_Button>
      {/* <View style={styles.text}>
        <Text> {token === '' ? '' : 'Token: ' + token} </Text>
        <Text> {userId === 0 ? '' : 'User id: ' + userId} </Text>
        <Text> {userName === '' ? '' : 'User name: ' + userName} </Text>
      </View> */}
    </O_ItemsCreationForm>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default CreationScreen;
