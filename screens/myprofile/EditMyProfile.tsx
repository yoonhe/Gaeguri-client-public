import React, { useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ActionSheetIOS, Button } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import SelectPhoto from './SelectPhoto';
import { GlobalStyle } from '../../styles/common';
import { Entypo } from '@expo/vector-icons';

// const images = {};

const getPhotos = async () => {
  try {
    const { edges } = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    });

    console.log('📸', edges);
  } catch (error) {
    console.log('getPhoto', error);
  }
};

function EditMyProfile({ navigation }) {
  // const [result, setResult] = useState('🔮');
  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['앨범에서 선택', '프로필 사진 삭제', '취소'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          /* destructive action */
          // getPhotos;
        } else {
          console.log('액션싯 취소');
        }
      },
    );
  };

  const gotoAlbum = useCallback(() => {
    navigation.navigate('사진', { title: '' });
  }, []);

  return (
    <View>
      <GlobalStyle>
        <View>
          <Image
            style={styles.profile}
            source={require('../../assets/MyProfile/profile_medium.png')}
          />

          <Entypo style={styles.camera} name="camera" size={24} color="gray" onPress={onPress} />
        </View>
        <TextInput style={styles.textInput}>김코딩</TextInput>
        <Text style={{ textAlign: 'center' }}> 프로필 사진과 이름을 입력해주세요.</Text>

        <Button title="이미지 선택" onPress={gotoAlbum} />
        {/* <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
        </ScrollView> */}
      </GlobalStyle>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 115,
    height: 115,
    marginBottom: 16,
    alignSelf: 'center',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 8,
    textAlign: 'center',
    marginBottom: 16,
  },
  camera: {
    position: 'absolute',
    top: 80,
    left: 200,
    // width: 33,
    // height: 33,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
  },
});

export default EditMyProfile;
