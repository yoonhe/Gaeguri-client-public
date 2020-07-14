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
import { HeaderButtonStyle } from '../../styles/button';
import TagListComponent from '../../components/TagListComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import { GET_MYPROFILE } from './ProfileQuries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import { gql } from 'apollo-boost';
import Icon from 'react-native-vector-icons/MaterialIcons';
//아이콘 찾기 https://oblador.github.io/react-native-vector-icons/

export const UPDATE_MYPROFILE = gql`
  mutation UpdateMyProfile(
    $Username: String!
    $Profile_photo_path: String
    $AboutMe: String
    $Stacks: [String]
  ) {
    UpdateMyProfile(
      Username: $Username
      Profile_photo_path: $Profile_photo_path
      AboutMe: $AboutMe
      stacks: $Stacks
    ) {
      ok
      error
      user {
        User_id
        Username
        Profile_photo_path
        AboutMe
        userstacks {
          stack {
            Stack_name
          }
        }
      }
    }
  }
`;

function EditMyProfile({ navigation, route }): React.ReactElement {
  // 앞에서 넘겨준 객체 데이터
  const [current_Username, setUsername] = useState<string>(route.params.myUsername);
  const [current_AboutMe, setAboutMe] = useState<string | null>(route.params.myAboutMe);
  const [avatarSource, setAvatarSource] = useState('');
  const data = route.params;
  console.log('편집 data?? ', data);
  // console.log('편집 current_AboutMe?? ', current_AboutMe);

  const updateData = async () => {
    const updateMyProfile = await useMutation(UPDATE_MYPROFILE, {
      update(cache, { data }) {
        const currentProfile = cache.readQuery({
          query: GET_MYPROFILE,
        });
        console.log('편집 data?? :', data);
        console.log('편집 currentProfile?? :', currentProfile);

        const editProfile = data.user;
        console.log('편집 editProfile?? :', editProfile);

        cache.writeQuery({
          query: GET_MYPROFILE,
          data: {
            GetMyProfile: {
              user: { editProfile, ...currentProfile },
            },
          },
        });
      },
    });
  };
  updateData();

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
    onSubmit(values) {
      const { new_username, new_AboutMe } = values;

      // if (!new_username) {
      //   return Alert.alert('유저네임을 입력해주세요', '', [
      //     { text: 'OK', onPress: () => console.log('OK Pressed') },
      //   ]);
      // }

      // if (!new_AboutMe) {
      //   return Alert.alert('짧은 소개를 입력해주세요', '', [
      //     { text: 'OK', onPress: () => console.log('OK Pressed') },
      //   ]);
      // }

      UpdateMyProfile({
        variables: {
          username: new_username,
          AboutMe: new_AboutMe,
        },
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'MyProfile' }],
        }),
      );
    },
  });

  //헤더 버튼
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonStyle title="저장" onPress={formik.handleSubmit}>
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
          <ProfileMediumStyle uri={avatarSource} />
          <Text onPress={SelectPhotoTapped}>
            <Icon name="camera" size={30} color="#4F8EF7" />
          </Text>
          <FormBoxComponent
            blurOnSubmit={true}
            multiline={true}
            value={formik.values.new_username}
            onChangeText={formik.handleChange('new_username')}
          />
        </View>
        <DividerStyle />

        <FormBoxComponent
          title="짧은 소개"
          blurOnSubmit={true}
          multiline={true}
          value={formik.values.new_AboutMe}
          onChangeText={formik.handleChange('new_AboutMe')}
        />
        <FormBoxComponent title="주요스택">
          {/* <TagListComponent tagList={tagList} setTagList={setTagList} produce={produce} /> */}
        </FormBoxComponent>
      </KeyboardAwareScrollView>
    </PageWrapWhiteStyle>
  );
}

export default EditMyProfile;
