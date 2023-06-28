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
import A_LikeButton from '../components/Atoms/A_LikeButton';

const white = 'hsl(203, 24%, 99%)';
const beige = 'hsl(60, 4%, 96%)';
const lightBlue = 'hsl(214, 12%, 73%)';
const green = 'hsl(150, 7%, 63%)';
const darkBlue = 'hsl(204, 9%, 37%)';
const red = 'hsl(360, 62%, 65%)';

export const ItemScreen = ({ route, navigation }) => {
  // const { route, navigation } = props;
  const params = route.params || {};
  // const { item = {} } = params;
  const { id } = params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = React.useState('');
  const [liked, setLiked] = useState(false);
  // const { getItem } = useLocalStorage();
  // const { id, geotag, date } = route.params;

  // const like = (e) => {
  //   e.preventDefault();
  //   axios.post(
  //     `http://localhost:3000/api/v1/items/${item.id}/likes`,
  //     { like: {} },
  //     {
  //       headers: {
  //         Authorization: `${getItem('token')}`,
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  // };

  // const unlike = (e) => {
  //   e.preventDefault();
  //   axios.delete(
  //     `http://localhost:3000/api/v1/items/${item.id}/likes/${
  //       item?.likes?.filter((item) => item?.user_id === userId)?.[0]?.id
  //     }`,
  //     {
  //       headers: {
  //         Authorization: `${getItem('token')}`,
  //       },
  //     }
  //   );
  // };
  // useEffect(() => {
  //   const s = Boolean(
  //     item?.likes?.filter((item) => item?.user_id === userId).length
  //   );
  //   setLiked(s);
  // }, [item]);

  const A_Image = styled.Image`
    width: 374;
    height: 374;
    border-radius: 8;
    margintop: '16';
    margin: auto;
  `;
  const A_LikeButton = styled.Text`
    position: relative;
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
          <Text
            style={{
              color: green,
              fontFamily: 'IT',
              fontSize: 12,
              lineHeight: 16,
              width: 274,
            }}
          >
            Дата находки
          </Text>
          <Text
            style={{
              color: green,
              fontFamily: 'IT',
              fontSize: 24,
              lineHeight: 24,
              width: 274,
            }}
          >
            {data?.date}
          </Text>
          <Text
            style={{
              color: green,
              fontFamily: 'IT',
              fontSize: 12,
              lineHeight: 12,
              width: 274,
            }}
          >
            Место находки
          </Text>
          <Text
            style={{
              color: green,
              fontFamily: 'IT',
              fontSize: 24,
              lineHeight: 24,
              width: 274,
            }}
          >
            {data?.geotag}
          </Text>
          <Text
            style={{
              color: green,
              fontFamily: 'IT',
              fontSize: 16,
              lineHeight: 16,
              width: 274,
            }}
          >
            {data?.note}
          </Text>
        </>
      )}
      <A_LikeButton />

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
