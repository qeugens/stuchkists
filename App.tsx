import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image } from "react-native";
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { Bone } from '../images';
import Tapbar from "./src/components/Tapbar";



const styles = StyleSheet.create({
  container: {
    textAlign: 'left',
  },
  text: {
    fontSize: 32,
    fontWeight: '500',
  },
  image: {
  width: 100,
  height: 100,
  }
});

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      axios.get('http://localhost:3000/api/v1/items')
        .then(({ data }) => {
          // console.log(JSON.stringify(data))
          setData(data)
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false)
          console.log("FEtched" + JSON.stringify(data))
        });
    }, []);


  return (
    <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
       }}
     >
    <NavigationContainer>
      
    </NavigationContainer>
    </View>



  );

}
