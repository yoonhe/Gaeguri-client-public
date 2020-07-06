import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActionSheetIOS,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  TextCaptionStyle,
  DividerStyle,
  TextSubTitleStyle,
  PageWrapWhiteStyle,
  ProfileMediumStyle,
} from '../../styles/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

function EditMyProfile({ navigation, route }): React.ReactElement {
  // 앞에서 넘겨준 객체 데이터
  // const { profile, username, introduction, stack, email } = route.prams;

  //편집 데이터 상태 관리
  const [avatarSource, setAvatarSource] = useState('');
  // const [username, setUsername] = useState<string>(route.params.username);
  // const [introduction, setIntroduction] = useState<string>(route.params.introduction);
  // const [stack, setStack] = useState<string>(route.params.stack.join());
  // const [email, setEmail] = useState<string>(route.params.email);
  console.log('route.prams ??', route.prams);
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    title: '프로필 이미지 바꾸기',
    customButtons: [{ name: 'delete', title: '이미지 삭제하기' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const SelectPhotoTapped = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setAvatarSource('');
      } else {
        const source = { uri: response.uri };
        // console.log('response.uri ?? ', response.uri);
        console.log('avatarSource ?? ', avatarSource);
        setAvatarSource(source);
      }
    });
  };

  //마이 페이지로 업데이트할 데이터 넘겨주기. 아드로이드는 이전 버튼 필요 없음.
  const gotoMyProfile = useCallback(() => {
    // console.log('username 1 :', username);
    navigation.goBack('MyProfile', { userImage: avatarSource });
  }, []);

  //헤더에 버튼
  useLayoutEffect(() => {
    // console.log('username 2:', username);
    navigation.setOptions({
      headerRight: () => <Button title="저장" onPress={gotoMyProfile} />,
    });
  }, [navigation]);
  console.log('avatarSource ?? ', avatarSource);
  return (
    <PageWrapWhiteStyle>
      <KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          {/* 프로필이미지, 유저네임 */}
          <ProfileMediumStyle image={avatarSource} />
          {/* <TouchableOpacity onPress={SelectPhotoTapped}>
            <View>
              {avatarSource === '' ? (
                <Text>Select a Photo</Text>
              ) : (
                <ProfileMediumStyle image={avatarSource} />
              )}
            </View>
          </TouchableOpacity> */}
          <Button title="수정" onPress={SelectPhotoTapped} />
          {/* </View> */}
          {/* <TextInput style={styles.input} value={username} onChangeText={setUsername} /> */}
        </View>
        <DividerStyle />
        {/* 짧은소개 */}
        <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
        {/* <TextInput
          style={styles.inputMulti}
          multiline
          numberOfLines={8}
          value={introduction}
          onChangeText={setIntroduction}
        /> */}
        <TextCaptionStyle>000자 까지 작성할 수 있습니다.</TextCaptionStyle>
        {/* 기술스택 */}
        <TextSubTitleStyle>기술스택</TextSubTitleStyle>
        {/* <TextInput style={styles.input} value={stack} onChangeText={setStack} /> */}
        <TextCaptionStyle>Stack은 콤마로 구분해주세요.</TextCaptionStyle>
        <TextSubTitleStyle>이메일</TextSubTitleStyle>
        {/* <TextInput style={styles.input} value={email} onChangeText={setEmail} /> */}
      </KeyboardAwareScrollView>
    </PageWrapWhiteStyle>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
