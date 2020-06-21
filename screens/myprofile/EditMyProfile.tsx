import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActionSheetIOS,
  TextInput,
  Button,
  Platform,
  Alert,
} from 'react-native';
import {
  TextCaptionStyle,
  DividerStyle,
  TextSubTitleStyle,
  PageWrapWhiteStyle,
} from '../../styles/common';
// import { FormBox } from '../../styles/form';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

function EditMyProfile({ navigation, route }) {
  //앞에서 넘겨준 객체 데이터 = { profile, username, introduction, stack, email }

  //편집 데이터 상태 관리
  const [profile, setProfile] = useState<string>(route.params.profile);
  const [username, setUsername] = useState<string>(route.params.username);
  const [introduction, setIntroduction] = useState<string>(route.params.introduction);
  const [stack, setStack] = useState<string>(route.params.stack.join());
  const [email, setEmail] = useState<string>(route.params.email);

  //액션시트 열기
  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['앨범에서 선택', '프로필 사진 삭제', '취소'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          pickImage();
        }
        if (buttonIndex === 1) {
          setProfile('');
        }
      },
    );
  };

  //권한 요청
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //이미지만 선택
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    } else if (!result.cancelled) {
      // console.log(result.uri);
      setProfile(result.uri);
    }
  };

  //마이 페이지로 업데이트할 데이터 넘겨주기
  const gotoMyProfile = useCallback(() => {
    console.log('username 1 :', username);
    navigation.goBack('MyProfile', { profile, username, introduction, stack, email });
  }, []);

  //헤더에 버튼 넣기
  useLayoutEffect(() => {
    console.log('username 2:', username);
    navigation.setOptions({
      headerRight: () => <Button title="저장" onPress={gotoMyProfile} />,
    });
  }, [navigation]);

  return (
    <PageWrapWhiteStyle>
      <KeyboardAwareScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View>
            <Image
              style={styles.profile}
              source={
                profile !== ''
                  ? { uri: profile }
                  : require('../../assets/MyProfile/profile_medium.png')
              }
            />
            <Feather style={styles.camera} name="camera" size={21} color="gray" onPress={onPress} />
          </View>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />
        </View>
        <DividerStyle />
        <TextSubTitleStyle> Introduction</TextSubTitleStyle>
        <TextInput
          style={styles.inputMulti}
          multiline
          numberOfLines={8}
          value={introduction}
          onChangeText={setIntroduction}
        />
        <TextCaptionStyle>000자 까지 작성할 수 있습니다.</TextCaptionStyle>
        <TextSubTitleStyle> Stack</TextSubTitleStyle>
        <TextInput style={styles.input} value={stack} onChangeText={setStack} />
        <TextCaptionStyle>Stack은 콤마로 구분해주세요.</TextCaptionStyle>
        <TextSubTitleStyle> Contact</TextSubTitleStyle>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      </KeyboardAwareScrollView>
    </PageWrapWhiteStyle>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 67,
    height: 67,
    borderRadius: 34,
    marginRight: 24,
  },
  camera: {
    position: 'absolute',
    top: 36,
    left: 46,
    backgroundColor: '#fff',
    padding: 4,
    borderWidth: 1,
  },
  input: {
    height: 38,
    padding: 8,
    borderWidth: 1,
  },
  inputMulti: {
    padding: 8,
    borderWidth: 1,
  },
});

export default EditMyProfile;
