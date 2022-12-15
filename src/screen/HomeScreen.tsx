import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeScreenWrapper = styled(FlexBox)`
  background-color: ${({ theme }) => theme.appBg};
  flex:1;
  color: white;
  padding: 0px 14px 0px 14px;
`;
const HomeScreenText = styled.Text`
  color: white;
`;

const HomeScreenButton = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  background: ${({ theme }) => theme.button.solid};
  border-radius: 20px;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const HomeScreenHollowButton = styled(HomeScreenButton)`
  width: 100%;
  flex: 1;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.button.border};
  border-radius: 20px;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

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

  return (
    <HomeScreenWrapper direction="column">
      <HomeScreenButton onPress={() => navigation.push("Games", {data: data})}>
        <TitleText>Создать игру</TitleText>
      </HomeScreenButton>
      <HomeScreenHollowButton onPress={() => navigation.push("Join")}>
        <TitleText>Присоединиться к игре</TitleText>
      </HomeScreenHollowButton>
    </HomeScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
  },
});

export default HomeScreen;
