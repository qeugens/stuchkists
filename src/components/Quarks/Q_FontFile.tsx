import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
const styles = require('../../Styles');

interface TextProps {
  children: React.ReactNode;
  // color?: string;
  center?: boolean;
  uppercase?: boolean;
  offsetTop?: number;
  offsetBottom?: number;
  offsetLeft?: number;
  offsetRight?: number;
  lineHeight?: number;
}

// const white = 'hsl(203, 24%, 99%)';
// const beige = 'hsl(60, 4%, 96%)';
// const lightBlue = 'hsl(214, 12%, 73%)';
// const green = 'hsl(150, 7%, 63%)';
// const darkBlue = 'hsl(204, 9%, 37%)';
// const red = 'hsl(360, 62%, 65%)';

// module.exports = StyleSheet.create({
//   mainColors: {
//     white: white,
//     beige: beige,
//     lightBlue: lightBlue,
//     green: green,
//     darkBlue: darkBlue,
//     red: red,
//   },
// });

export const Title = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: 'IT',
        fontSize: 32,
        // color: styles.mainColors.darkBlue,
        lineHeight: 32,
        textAlign: props.center ? 'center' : 'left',
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? 'uppercase' : 'none',
      }}
    >
      {props.children}
    </Text>
  );
};
export const Header = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: 'IT',
        fontSize: 24,
        // color: styles.mainColors.darkBlue,
        lineHeight: 24,
        textAlign: props.center ? 'center' : 'left',
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? 'uppercase' : 'none',
      }}
    >
      {props.children}
    </Text>
  );
};
export const Uppercase = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: 'IT',
        fontSize: 16,
        color: styles.mainColors.darkBlue,
        lineHeight: 16,
        textAlign: props.center ? 'center' : 'left',
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? 'uppercase' : 'none',
      }}
    >
      {props.children}
    </Text>
  );
};
export const Body = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: 'IT',
        fontSize: 16,
        color: styles.mainColors.darkBlue,
        lineHeight: 16,
        textAlign: props.center ? 'center' : 'left',
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? 'uppercase' : 'none',
      }}
    >
      {props.children}
    </Text>
  );
};
export const Caption = (props: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: 'IT',
        fontSize: 12,
        color: styles.mainColors.darkBlue,
        lineHeight: 12,
        textAlign: props.center ? 'center' : 'left',
        marginTop: props.offsetTop ? props.offsetTop : 0,
        marginBottom: props.offsetBottom ? props.offsetBottom : 0,
        marginLeft: props.offsetLeft ? props.offsetLeft : 0,
        marginRight: props.offsetRight ? props.offsetRight : 0,
        textTransform: props.uppercase ? 'uppercase' : 'none',
      }}
    >
      {props.children}
    </Text>
  );
};
