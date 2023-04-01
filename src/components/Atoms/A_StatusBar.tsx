import React, { Component } from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';

class Statusbar extends Component {
  render() {
    return (
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle="dark-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  StatusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: '#F5F5F4',
  },
});

export default Statusbar;
