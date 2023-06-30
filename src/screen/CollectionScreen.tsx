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

export const ItemScreen = ({ route, navigation }) => {
  // const { route, navigation } = props;
  const params = route.params || {};
  const { item = {} } = params;
  const { id } = params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = React.useState('');
  // const { id, geotag, date } = route.params;
  const A_Image = styled.Image`
    width: 185;
    height: 185;
    border-radius: 8;
    margin-top: 8;
    margin-bottom: 4;
    margin-right: 4;
  `;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/collections/${id}/items`)
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  interface Item {
    id: any;
    image: any;
  }

  return (
    <View>
      <A_Image
        key={data?.id}
        source={{ uri: 'http://localhost:3000/' + data?.image?.url }}
      />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>

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
