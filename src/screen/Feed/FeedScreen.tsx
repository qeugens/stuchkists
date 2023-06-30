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
import 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Header } from '../../components/Quarks/Q_FontFile';

const white = 'hsl(203, 24%, 99%)';
const beige = 'hsl(60, 4%, 96%)';
const lightBlue = 'hsl(214, 12%, 73%)';
const green = 'hsl(150, 7%, 63%)';
const darkBlue = 'hsl(204, 9%, 37%)';
const red = 'hsl(360, 62%, 65%)';

const Q_Image = styled.Image`
  width: 185;
  height: 185;
  border-radius: 8;
  // margin-top: 8;
  margin-bottom: 4;
  margin-right: 4;
`;
const FlatListWrapper = styled.FlatList`
  display: flex;
  flex-wrap: wrap;
  margin-top: 76;
`;
const FeedWrapper = styled.View`
  margin-left: 8;
  margin-right: 8;
`;
const TitleWrapper = styled.View`
  width: 350;
  height: 42;
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 4,
    marginRight: 4,
    marginTop: 16,
  },
});

const FeedScreen = ({ navigation }) => {
  // const { navigation } = props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [testData, setTestData] = useState(null);
  const [scode, setSCode] = React.useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/items')
      .then(({ data }) => {
        // console.log(JSON.stringify(data));
        setData(data);
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
        <Text
          style={{
            color: darkBlue,
            fontFamily: 'IT',
            fontSize: 24,
            lineHeight: 24,
          }}
        >
          Штучки для тебя здесь
        </Text>
      </TitleWrapper>
      <View>
        <FlatListWrapper
          data={data}
          numColumns={2}
          keyExtractor={(item: Item) => item.id}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Штучкис', { id: item.id })}
              >
                <Q_Image
                  key={item.id}
                  source={{ uri: 'http://localhost:3000/' + item.image.url }}
                />
              </TouchableOpacity>
            </>
          )}
        />
      </View>
    </FeedWrapper>
  );
};

export default FeedScreen;
