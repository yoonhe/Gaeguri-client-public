import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, ActionSheetIOS } from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';
import { PageWrap } from '../../styles/common';
import { FormBox, InputText } from '../../styles/form';
import { Entypo } from '@expo/vector-icons';

function EditMyProfile({ navigation }) {
  // const [result, setResult] = useState(null);

  const gotoAlbum = useCallback(() => {
    navigation.navigate('사진', { title: '' });
  }, []);

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
          gotoAlbum();
        }
      },
    );
  };

  return (
    <PageWrap>
      <View>
        <Image
          style={styles.profile}
          source={require('../../assets/MyProfile/profile_medium.png')}
        />
        <Entypo style={styles.camera} name="camera" size={24} color="gray" onPress={onPress} />
      </View>
      <FormBox>
        <InputText>김코딩</InputText>
        <Text style={{ marginTop: 8 }}> 프로필 사진과 이름을 입력해주세요.</Text>
      </FormBox>
    </PageWrap>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 115,
    height: 115,
    marginBottom: 16,
    alignSelf: 'center',
  },
  camera: {
    position: 'absolute',
    top: 80,
    left: 200,
    backgroundColor: '#fff',
    padding: 6,
    borderWidth: 1,
  },
});

export default EditMyProfile;
