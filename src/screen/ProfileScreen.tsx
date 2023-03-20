import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import A_NotificationIcon from '../components/A_NotificationIcon';
import A_MenuIcon from '../components/A_MenuIcon';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

// function CustomFont() {
//   const [fontsLoaded] = useFonts({
//     'Inter-Black': require('../../assets/fonts/InterTight-Medium.ttf'),
//   });

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);
// }

const styles = require('../Styles');

function Test() {
  // const [fontsLoaded] = useFonts({
  //   'InterTight-Medium': require('../../assets/font/InterTight-Medium.ttf'),
  // });
}

const ProfileScreen = ({ navigation, route }) => {
  // const [profile, setProfile] = useState([]);
  // const { navigation } = props;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = React.useState('');
  const [collections, setCollections] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  // const [fontsLoaded] = useFonts({
  //   'InterTight-Medium': require('../../assets/font/InterTight-Medium.ttf'),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);
  // if (!fontsLoaded) {
  //   return null;
  // }

  function getData() {
    AsyncStorage.getItem('userId', (err, result) => {
      if (result) {
        setUserId(result);
        // alert(result);
      } else {
        alert('no user id');
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/api/v1/users/${userId}`)
        .then(({ data }) => {
          //status, data: message, status, data:[{},]
          // alert(JSON.stringify(data));
          setData(data);
        })
        .catch((error) => console.error(error));
    }

    axios
      .get('http://localhost:3000/api/v1/collections')
      .then(({ data }) => {
        //status, data: message, status, data:[{},]
        // alert(data[0]?.title);

        setCollections(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [userId]);

  const logOut = () => {
    axios
      .delete('http://localhost:3000/api/v1/logout', {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        try {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('userId');
        } catch (error) {
          console.log('error');
          console.log(error); // Error saving data
        }
      })
      .then(() => {
        navigation.goBack();
      });
  };

  interface User {
    id: any;
    username: any;
    description: any;
    avatar: any;
    jti: any;
  }
  interface Collection {
    id: any;
    title: any;
    description: any;
  }
  return (
    <View>
      <View key={data?.id}>
        {/* <View>
          <View style={styles.iconContainer}>
            <A_NotificationIcon style={styles.icon} />
            <A_MenuIcon style={styles.icon} />
          </View>
        </View> */}
        {/* <View style={styles.profile_container}>
          <Image
            style={styles.avatar}
            source={{ uri: 'http://localhost:3000/' + data?.avatar?.url }}
          />
          <Text style={styles.description}>{data?.description}</Text>
        </View> */}
        <Text
          style={{
            color: styles.mainColors.darkBlue,
            fontFamily: 'InterTight-Medium',
            fontSize: 20,
          }}
        >
          {data?.username}
        </Text>
      </View>

      <Button
        onPress={() => logOut()}
        title={'Sign out'}
        color="#841584"
        accessibilityLabel="Learn more"
      />
      {/* <Text style={styles.my_collections}>Мои коллекции</Text> */}
      {/* <Text> {token === '' ? '' : 'Token: ' + token} </Text> */}

      <View>
        <FlatList
          data={collections}
          keyExtractor={(item: Collection) => item.id}
          renderItem={({ item }) => (
            <View key={item.id}>
              <Image
                source={{ uri: 'http://localhost:3000/' + item.cover.url }}
              />
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <Button
          title="Новая коллекция"
          onPress={() => navigation.navigate('Новая коллекция')}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
