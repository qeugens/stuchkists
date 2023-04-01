import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';

const white = 'hsl(203, 24%, 99%)';
const beige = 'hsl(60, 4%, 96%)';
const lightBlue = 'hsl(214, 12%, 73%)';
const green = 'hsl(150, 7%, 63%)';
const darkBlue = 'hsl(204, 9%, 37%)';
const red = 'hsl(360, 62%, 65%)';

const A_Button = styled.Button``;

const ImagePickerExample = ({ onSelectImage }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      let source = {};

      let fileName =
        result.assets[0].fileName ||
        `newFile.${result.assets[0].uri.split('.')[1]}`;
      if (
        Platform.OS === 'ios' &&
        (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
      ) {
        fileName = `${fileName?.split('.')[0]}.JPG`;
      }
      source = {
        uri: `${result.assets[0].uri.split('//')[1]}`,
        fileName,
        type: `${result.assets[0].uri.split('.')[1]}`,
      };
      console.log(source);
      onSelectImage(source);
    }
  };

  return (
    <View>
      <A_Button
        style={{
          color: green,
          fontFamily: 'IT',
          textTransform: 'uppercase',
          fontSize: 16,
          padding: 16,
          marginTop: 16,
        }}
        title="выбери фотографию"
        onPress={pickImage}
      />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 374, height: 374, borderRadius: 12 }}
        />
      )}
    </View>
  );
};
export default ImagePickerExample;
