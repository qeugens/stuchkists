import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import A_SearchIcon from "../components/A_SearchIcon";
import A_AddIcon from "../components/A_AddIcon";
import A_ProfileIcon from "../components/A_ProfileIcon";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
image: {
  width: 100,
  height: 100,
  borderRadius: 8,
  marginLeft: 16,
  marginRight: 16,
  },
title: {
  fontWeight: '700',
  fontSize: '32',
  lineHeight: '32',
},
text: {
  fontWeight: '400',
  fontSize: '15',
  lineHeight: '20',
  margin: 5,
},
text_container: {
  marginBottom: 20,
  marginLeft: 16,
},
icon: {
  width: 100,
  height: 100,
},
container: {
  width: 390,
  height: 42,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 16,
},
});

function HomeScreen(props: { navigation: any }) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = React.useState("");

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/items')
      .then(({ data }) => {
        console.log(JSON.stringify(data))
        setData(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  interface Item {
   id: any;
   image: any;
 }
 //
 // const HomeNavigator = createStackNavigator();
 //
 // function Home(props: { route: any; navigation: any }) {
 //   const { navigation, route } = props;
 //
 //   const routeName = getFocusedRouteNameFromRoute(route);
 //
 //   React.useEffect(() => {
 //     if (routeName === "SItem") {
 //       navigation.setOptions({
 //         tabBarVisible: false,
 //       });
 //     } else {
 //       navigation.setOptions({
 //         tabBarVisible: true,
 //       });
 //     }
 //   }, [navigation, route]);
 // }

  return (
    <View
       style={{
         // flex: 1,
         // justifyContent: "center",
         // alignItems: "center",
         backgroundColor: 'white',
       }}
     >
     <View style={styles.container}>
     <Text
     style={styles.title}>Лента</Text>

     <A_SearchIcon style={styles.icon}/>
     </View>

     <FlatList
     data={data}
     keyExtractor={(item: Item) => item.id}
     renderItem={({ item }) => (
       <>
         <View
          key={item.id}>
           <View>
           <Image
           style={styles.image}
           source={{ uri: "http://localhost:3000/" + item.image.url}}
           />
           </View>
         </View>
       </>
     )}
   />

     </View>
  );
}

export default HomeScreen;
