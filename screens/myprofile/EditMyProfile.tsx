import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert, Button, Image, TouchableOpacity } from 'react-native';
import {
  TextCaptionStyle,
  DividerStyle,
  TextSubTitleStyle,
  PageWrapWhiteStyle,
  ProfileMediumStyle,
} from '../../styles/common';
import { HeaderButtonStyle, BorderButtonSmallStyle } from '../../styles/button';
import TagListComponent from '../../components/TagListComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import { GET_MYPROFILE } from './ProfileQuries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import { gql } from 'apollo-boost';
import Icon from 'react-native-vector-icons/MaterialIcons';
import produce from 'immer';
//아이콘 찾기 https://oblador.github.io/react-native-vector-icons/

export const UPDATE_MYPROFILE = gql`
  mutation UpdateMyProfile($Username: String!) {
    UpdateMyProfile(Username: $Username) {
      ok
      error
      user {
        User_id
        Username
        AboutMe
        Profile_photo_path
      }
      stack {
        Stack_name
      }
    }
  }
`;

function EditMyProfile({ navigation, route }): React.ReactElement {
  // 앞에서 넘겨준 객체 데이터
  const [avatarSource, setAvatarSource] = useState('');
  const [myTagList, setMyTagList] = useState<object[]>([]);
  const { current_Username, current_ProfileImage, current_AboutMe, current_Stack } = route.params;
  // console.log(
  //   '편집 data?? :',
  //   current_Username,
  //   current_ProfileImage,
  //   current_AboutMe,
  //   current_Stack,
  // );
  useEffect(() => {
    setAvatarSource(current_ProfileImage);
    setMyTagList(current_Stack);
  }, []);

  // const [updateMyProfile] = useMutation(UPDATE_MYPROFILE, {
  //   update(cache, { data }) {
  //     const currentProfile = cache.readQuery({
  //       query: GET_MYPROFILE,
  //     });
  //     console.log('편집 data?? :', data);
  //     console.log('편집 currentProfile?? :', currentProfile);

  //     // const editProfile = data.user;
  //     // console.log('편집 editProfile?? :', editProfile);

  //     cache.writeQuery({
  //       query: GET_MYPROFILE,
  //       data: {
  //         GetMyProfile: {
  //           user: { ...currentProfile.GetMyProfile.user },
  //         },
  //         __typename: 'User',
  //       },
  //     });
  //   },
  // });

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
        // console.log('avatarSource ?? ', avatarSource);
        setAvatarSource(source);
      }
    });
  };
  // console.log('avatarSource ?? ', avatarSource);

  const formik = useFormik({
    initialValues: {
      new_username: current_Username,
      new_AboutMe: current_AboutMe,
    },
    async onSubmit(values) {
      const { new_username, new_AboutMe, new_tagList } = values;

      if (!new_username) {
        return Alert.alert('유저네임을 입력해주세요', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

      if (!new_AboutMe) {
        return Alert.alert('짧은 소개를 입력해주세요', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
      console.log('new_username??', new_username);

      // await updateMyProfile({
      //   variables: {
      //     Username: new_username,
      //     AboutMe: new_AboutMe,
      //   },
      // });

      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: '마이' }],
        }),
      );
    },
  });

  //헤더 버튼
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonStyle
          title="저장"
          onPress={() => {
            formik.handleSubmit;
          }}
        >
          저장
        </HeaderButtonStyle>
      ),
    });
  }, [navigation]);

  return (
    <PageWrapWhiteStyle>
      <KeyboardAwareScrollView>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <ProfileMediumStyle uri={avatarSource} />
            <Text onPress={SelectPhotoTapped} style={styles.cameraIcon}>
              <Icon name="camera" size={30} color="#fff" />
            </Text>
          </View>
          <FormBoxComponent
            placeholder={formik.values.new_username}
            blurOnSubmit={true}
            multiline={true}
            // value={formik.values.new_username}
            onChangeText={formik.handleChange('new_username')}
          />
        </View>
        <DividerStyle />

        <FormBoxComponent
          title="짧은 소개"
          placeholder={formik.values.new_AboutMe}
          blurOnSubmit={true}
          multiline={true}
          // value={formik.values.new_AboutMe}
          onChangeText={formik.handleChange('new_AboutMe')}
        />
        <FormBoxComponent title="주요스택" placeholder={formik.values.new_tagList}>
          {/* <TagListComponent tagList={myTagList} setTagList={setMyTagList} produce={produce} /> */}
        </FormBoxComponent>
      </KeyboardAwareScrollView>
    </PageWrapWhiteStyle>
  );
}

const styles = StyleSheet.create({
  cameraIcon: {
    flex: 1,
    position: 'absolute',
    padding: 8,
    top: 45,
    left: 46,
    width: 46,
    height: 46,
    borderRadius: 25,
    backgroundColor: '#5dd7b9',
  },
});
export default EditMyProfile;
