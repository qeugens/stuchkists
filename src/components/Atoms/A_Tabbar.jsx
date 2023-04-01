import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BackHandler } from 'react-native';
// import BackIcon from '../icons/A_BackIcon';
import Q_Eyes from '../Quarks/Q_Eyes';
import Q_Plus from '../Quarks/Q_Plus';
import Q_Profile from '../Quarks/Q_Profile';

const styles = require('../../Styles');

const CrazyTabs = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions?.tabBarStyle?.display === 'none') {
    return null;
  }

  function handleBackButtonClick() {
    try {
      navigation?.goBack();
      return true;
    } catch {
      return;
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      );
    };
  }, []);
  const getIcon = (label) => {
    switch (label) {
      case 'ФИД':
        return <Q_Eyes />;
      case 'Создание штучкиса':
        return <Q_Plus />;
      case 'Я':
        return <Q_Profile />;
      default:
        return <Text></Text>;
    }
  };

  return (
    <View style={styles.tabbarContainer}>
      <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isHidden =
            label === 'Новая коллекция' ||
            label === 'Штучкис' ||
            label === 'Авторизация' ||
            label === 'Коллекция'
              ? true
              : false;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          if (isHidden) return;
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'raw',
                justifyContentL: 'center',
                // paddingRight: index == state.routes.length - 1 ? 0 : 32,
                opacity: isFocused ? 1 : 0.3,
              }}
            >
              {getIcon(label)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CrazyTabs;
