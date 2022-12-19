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

const styles = StyleSheet.create({
  image: {
  width: 171,
  height: 171,
  },
  title: {
  fontWeight: '700',
  fontSize: '32',
  lineHeight: '32',
},
  icon: {
  width: 26.7,
  height: 34,
},
container: {
  width: 390,
  height: 42,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingLeft: 20,
  paddingRight: 20,

}
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

  return (
    <View
       style={{
         // flex: 1,
         // justifyContent: "center",
         // alignItems: "center",
       }}
     >
     <View style={styles.container}>
     <Text
     style={styles.title}>Лента</Text>

     <Image
     style={styles.icon}
     source={require("../images/SearchIcon.png")}
     />
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
