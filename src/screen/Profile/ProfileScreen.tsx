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
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Title, Body } from '../components/Quarks/Q_FontFile';
import Q_HeaderBack from '../../components/Quarks/Q_HeaderBack';
import Q_ButtonEllipse from '../../components/Quarks/Q_ButtonEllipse';
import styled from 'styled-components/native';

const white = 'hsl(203, 24%, 99%)';
const beige = 'hsl(60, 4%, 96%)';
const lightBlue = 'hsl(214, 12%, 73%)';
const green = 'hsl(150, 7%, 63%)';
const darkBlue = 'hsl(204, 9%, 37%)';
const red = 'hsl(360, 62%, 65%)';

const Q_Image = styled.Image`
  width: 80;
  height: 80;
  border-radius: 40;
  // margin-top: 8;
  margin-bottom: 4;
  margin-right: 4;
`;
const A_ProfileBody = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 72;
`;
const M_ProfileInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 374;
  height: 80;
  margin-top: 16;
  padding: 0px 4px;
`;
const A_Statistic1 = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  width: 183;
  height: 76;
  background-color: white;
  padding: 12px;
  border-radius: 12px;
`;
const A_Statistic2 = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  width: 183;
  height: 76;
  background-color: white;
  padding: 12px;
  border-radius: 12px;
`;
const M_StatisticBlock = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 374;
  margin: 16px auto;
`;
const O_UserBlock = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const A_CollectionCard = styled.Text`
  width: 374px;
  height: 152px;
  border-radius: 12px;
  background-image: require('../../../assets/images/A_CollectionCard1.png');
`;
const M_CollectionList = styled.View`
  width: 374;
  margin-right: 8px;
`;
// const styles = require('../Styles');

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

  function getData() {
    AsyncStorage.getItem('userId', (err, result) => {
      if (result) {
        setUserId(result);
        // alert(result);
      } else {
        alert('no user id');
      }
    });

    AsyncStorage.getItem('token', (err, result) => {
      if (result) {
        console.log(result);
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
      <O_UserBlock key={data?.id}>
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
        <M_ProfileInfo>
          <Q_Image source={require('../../images/Q_UserImage.png')} />
          <A_ProfileBody>
            <Text
              style={{
                color: darkBlue,
                fontFamily: 'IT',
                fontSize: 32,
                lineHeight: 32,
              }}
            >
              {data?.username}
            </Text>
            <Text
              style={{
                color: darkBlue,
                fontFamily: 'IT',
                fontSize: 16,
                lineHeight: 16,
                width: 274,
              }}
            >
              быть студенткой шд — значит везде собирать референсы по проектам
            </Text>
          </A_ProfileBody>
        </M_ProfileInfo>
        <M_StatisticBlock>
          <A_Statistic1>
            <Text
              style={{
                color: green,
                fontFamily: 'IT',
                fontSize: 32,
                lineHeight: 32,
                width: 159,
              }}
            >
              10
            </Text>
            <Text
              style={{
                color: green,
                fontFamily: 'IT',
                fontSize: 16,
                lineHeight: 16,
                width: 159,
              }}
            >
              штучкисов
            </Text>
          </A_Statistic1>
          <A_Statistic2>
            <Text
              style={{
                color: green,
                fontFamily: 'IT',
                fontSize: 32,
                lineHeight: 32,
              }}
            >
              4
            </Text>
            <Text
              style={{
                color: green,
                fontFamily: 'IT',
                fontSize: 16,
                lineHeight: 16,
              }}
            >
              коллекции
            </Text>
          </A_Statistic2>
        </M_StatisticBlock>
        <TouchableOpacity
          onPress={() => navigation.navigate('Новая коллекция')}
        >
          <View>
            <Q_ButtonEllipse title="Новая коллекция" />
          </View>
        </TouchableOpacity>
      </O_UserBlock>

      <M_CollectionList>
        <FlatList
          data={collections}
          keyExtractor={(item: Collection) => item.id}
          renderItem={({ item }) => (
            <View key={item.id}>
              {/* <Image
                source={{ uri: 'http://localhost:3000/' + item.cover.url }}
              /> */}
              <A_CollectionCard
                // source={require('../../../assets/images/A_CollectionCard.png')}
                style={{
                  backgroundImage: require('../../../assets/images/A_CollectionCard1.png'),
                  color: darkBlue,
                  fontFamily: 'IT',
                  fontSize: 24,
                  lineHeight: 24,
                }}
                onPress={() => navigation.navigate('Коллекция')}
              >
                {item.title}
              </A_CollectionCard>
            </View>
          )}
        />
      </M_CollectionList>

      <Button
        onPress={() => logOut()}
        title={'Sign out'}
        color="#841584"
        accessibilityLabel="Learn more"
      />
    </View>
  );
};

export default ProfileScreen;