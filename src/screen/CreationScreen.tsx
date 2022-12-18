import React, { useState, useEffect } from "react";
import axios from "axios";

function CreationScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Creation Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to Creation"
        onPress={() => navigation.navigate('Creation')}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/collections')
      .then(({ data }) => {
        console.log(JSON.stringify(data))
        setData(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  interface Collection {
    id: any;
    title: any;
    description: any;
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
       keyExtractor={(item: Item) => item.id}
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


export default CreationScreen;
