import React, { useState, useEffect } from 'react';
import { Button, Image, View, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function SelectPhoto() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS == 'ios') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // setImage({ result.uri }); 해당 코드 실행 못함. vscode 에러라고함.. 서치 중.
      console.log(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {pickImage}
      <Button title="갤러리 불러오기(오류해결중)" onPress={pickImage} />
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

export default SelectPhoto;
