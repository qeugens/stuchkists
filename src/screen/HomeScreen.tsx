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
import A_SearchIcon from "../components/A_SearchIcon";
import A_AddIcon from "../components/A_AddIcon";
import A_ProfileIcon from "../components/A_ProfileIcon";
import 'react-native-gesture-handler';
// import { createStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native'
// import A_Image from "../components/A_Image";
import Title1 from "../components/Title1";

const A_Image = styled.Image`
    width: 171;
    height: 171;
    borderRadius: 8;
    margin-top: 8;
    margin-bottom: 8;
    margin-right: 16;
`;
const FlatListWrapper = styled.FlatList`
    display: flex;
    flex-wrap: wrap;
`;
const FeedWrapper = styled.View`
    margin-left: 16;
    margin-right: 16;
`;
const TitleWrapper = styled.View`
    width: 350;
    height: 42;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 4;
    margin-right: 4;
    margin-top: 16;
`;
// const A_SearchIcon = styled()`
//     width: 100,
//     height: 100,
// `;

const styles = StyleSheet.create({
  text_geotag: {
    fontWeight: '400',
    fontSize: '15',
    lineHeight: '20',
    marginTop: 5,
    paddingLeft: 24,
  },
  text_date: {
    fontWeight: '400',
    fontSize: '15',
    lineHeight: '20',
    paddingLeft: 24,
    marginBottom: 16,
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
    marginLeft: 4,
    marginRight: 4,
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

  return (
    <FeedWrapper>
      <TitleWrapper>
        <Title1>Лента</Title1>

        <A_SearchIcon style={styles.icon} />
      </TitleWrapper>
      <View>
        <FlatListWrapper
          data={data}
          numColumns={2}
          keyExtractor={(item: Item) => item.id}
          renderItem={({ item }) => (
            <>
                  <TouchableOpacity onPress={() => navigation.push('Штучкис', { item: item })}>
                    <A_Image
                    key={item.id}
                    source={{ uri: "http://localhost:3000/" + item.image.url }}
                    />
                  </TouchableOpacity>
            </>
          )}
        />
      </View>
    </FeedWrapper>
  );
}

export default HomeScreen;
