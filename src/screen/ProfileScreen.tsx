import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileScreen(props: { navigation: any }) {
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

  );
}

export default ProfileScreen;
