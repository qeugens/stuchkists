import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, SafeAreaView } from "react-native";
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
    </NavigationContainer>
  );
};

export default App;

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

  interface IUser {
    id: any;
    geotag: any;
    note: any;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <FlatList
      data={data}
      keyExtractor={(item: IUser) => item.id}
      renderItem={({ item }) => (
        <>
          <View key={item.id}>
            <View>
              <Text style={{ marginBottom: 8 }}>{item.geotag}</Text>
              <Text style={{ marginBottom: 8 }}>{item.note}</Text>
            </View>
          </View>
        </>
      )}
    />
    </View>
  );
}
