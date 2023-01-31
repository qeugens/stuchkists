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
import A_NotificationIcon from "../components/A_NotificationIcon";
import A_MenuIcon from "../components/A_MenuIcon";

const styles = StyleSheet.create({
avatar: {
  width: 79,
  height: 79,
  borderRadius: '50%',
},
title: {
  fontWeight: '700',
  fontSize: '32',
  lineHeight: '32',
},
description: {
  fontWeight: '400',
  fontSize: '17',
  lineHeight: '22',
  width: 266,
  paddingLeft: 16,
},
container: {
  width: 390,
  height: 42,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingLeft: 16,
  paddingRight: 16,
  marginTop: 16,
},
iconContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: 67,
},
profile_container: {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: 'center',
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 16,
},
cover: {
  width: 358,
  height: 143,

},
collections_container: {
  paddingLeft: 16,
  paddingRight: 16,
  marginTop: 16,
},
my_collections: {
  fontWeight: '700',
  fontSize: '22',
  lineHeight: '28',
  paddingLeft: 16,
  marginTop: 24,
},
collections_title: {
  fontWeight: '600',
  fontSize: '20',
  lineHeight: '25',
  marginTop: 8,
  marginBottom: 24,
}
});

function ProfileScreen(props: { navigation: any }) {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = React.useState("");
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/users')
      .then(({ data }) => {
        //status, data: message, status, data:[{},]
        // alert(data.data[0]?.username);
        setData(data.data)
      })
      .catch((error) => console.error(error))

      axios.get('http://localhost:3000/api/v1/collections')
        .then(({ data }) => {
          //status, data: message, status, data:[{},]
          // alert(data.data[0]?.title);
          setCollections(data.data)
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);

  interface User {
   id: any;
   username: any;
   description: any;
   avatar: any;
 }
  interface Collection {
   id: any;
   title: any;
   description: any;
}
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item: User) => item.id}
          renderItem={({ item }) => (
            <>
              <View
               key={item.id}>
               <View style={styles.container}>
               <Text style={styles.title}>{item.username}</Text>
                <View style={styles.iconContainer}>
                  <A_NotificationIcon style={styles.icon}/>
                  <A_MenuIcon style={styles.icon}/>
                </View>
                </View>
                <View style={styles.profile_container}>
                <Image
                style={styles.avatar}
                source={{ uri: "http://localhost:3000/" + item.avatar.url}}
                />
                <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </>
          )}
        />

        <Text
        style={styles.my_collections}>Мои коллекции</Text>

        <View style={styles.collections_container}>
        <FlatList
          data={collections}
          keyExtractor={(item: Collection) => item.id}
          renderItem={({ item }) => (
              <View
               key={item.id}>
                 <Image
                 style={styles.cover}
                 source={{ uri: "http://localhost:3000/" + item.cover.url}}
                 />
                <Text style={styles.collections_title}>{item.title}</Text>
              </View>
          )}
        />
        </View>


      </View>

    );
}

export default ProfileScreen;