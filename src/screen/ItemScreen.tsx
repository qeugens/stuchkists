import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components/native';
import A_Image from "../components/A_Image";

export const ItemScreen = (props: { route: any; navigation: any }) => {
  const { route, navigation } = props;
  const params = route.params || {};
  const { item = {} } = params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = React.useState("");
  const {id, geotag, date} = route.params;

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/v1/items/' + id)
  //     .then(({ data }) => {
  //       console.log(JSON.stringify(data))
  //       setData(data)
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  interface Item {
   id: any;
   image: any;
 }

  return (
    <View>
      <A_Image
      source={{ uri: "http://localhost:3000/" + item.image.url}}
      />
      <Text>{item.geotag}</Text>
      <Text>{item.date}</Text>

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
}

export default ItemScreen;