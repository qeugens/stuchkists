import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const white = 'hsl(203, 24%, 99%)';
const beige = 'hsl(60, 4%, 96%)';
const lightBlue = 'hsl(214, 12%, 73%)';
const green = 'hsl(150, 7%, 63%)';
const darkBlue = 'hsl(204, 9%, 37%)';
const red = 'hsl(360, 62%, 65%)';

module.exports = StyleSheet.create({
  mainColors: {
    white: white,
    beige: beige,
    lightBlue: lightBlue,
    green: green,
    darkBlue: darkBlue,
    red: red,
  },
  tabbarContainer: {
    marginBottom: 6,
    position: 'absolute',
    width: 100,
    bottom: 0,
    elevation: 0,
    borderTopWidth: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabbar: {
    backgroundColor: '#FCFDFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 366,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
