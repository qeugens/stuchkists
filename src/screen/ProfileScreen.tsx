import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import A_NotificationIcon from "../components/A_NotificationIcon";
import A_MenuIcon from "../components/A_MenuIcon";

const styles = StyleSheet.create({
title: {
  fontWeight: '700',
  fontSize: '32',
  lineHeight: '32',
},
container: {
  width: 390,
  height: 42,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingLeft: 20,
  paddingRight: 20,
},
iconContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: 67,
}
});

function ProfileScreen({}) {
    return (
      <View>
        <View style={styles.container}>
          <Text
          style={styles.title}>karinamulk</Text>

          <View style={styles.iconContainer}>
            <A_NotificationIcon style={styles.icon}/>
            <A_MenuIcon style={styles.icon}/>
          </View>
        </View>

      </View>
    );
}

export default ProfileScreen;
