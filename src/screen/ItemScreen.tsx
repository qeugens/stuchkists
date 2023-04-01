import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';
import { Header, Caption, Body } from '../components/Quarks/Q_FontFile';

export const ItemScreen = ({ route, navigation }) => {
  // const { route, navigation } = props;
  const params = route.params || {};
  // const { item = {} } = params;
  const { id } = params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = React.useState('');
  // const { id, geotag, date } = route.params;
  const A_Image = styled.Image`
    width: 374;
    height: 374;
    border-radius: 8;
    margintop: '16';
    margin: auto;
  `;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/items/${id}`)
      .then(({ data }) => {
        // alert(JSON.stringify(data));
        setData(data);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  interface Item {
    id: any;
    image: any;
  }

  return (
    <View>
      {isLoading ? (
        <Text>Wait</Text>
      ) : (
        <>
          <A_Image
            key={data?.id}
            source={{ uri: 'http://localhost:3000/' + data?.image?.url }}
          />
          <Caption>Дата находки</Caption>
          <Header
            style={{
              // color: styles.mainColors.darkBlue,
              fontFamily: 'IT',
            }}
          >
            {data?.date}
          </Header>
          <Caption>Место находки</Caption>
          <Header
            style={{
              // color: styles.mainColors.darkBlue,
              fontFamily: 'IT',
            }}
          >
            {data?.geotag}
          </Header>
          <Body
            style={{
              // color: styles.mainColors.darkBlue,
              fontFamily: 'IT',
            }}
          >
            {data?.note}
          </Body>
        </>
      )}

      {/* <M_FeedImages
     data={data}
     keyExtractor={(item: Item) => item.id}
     renderItem={({ item }) => (
       <>
         <View
          key={item.id}>
           <View>
            <TouchableOpacity>
              <A_Image
              source={{ uri: "http://localhost:3000/" + item.image.url}}
              />
              <Text>{item.geotag}</Text>
              <Text>{item.date}</Text>
            </TouchableOpacity>
           </View>
         </View>
       </>
     )}
   /> */}
    </View>
  );
};

export default ItemScreen;
