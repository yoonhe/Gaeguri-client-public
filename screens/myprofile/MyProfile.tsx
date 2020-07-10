import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, Button } from 'react-native';
import {
  PageWrapWhiteStyle,
  TextContentStyle,
  TextSubTitleStyle,
  TextTitleStyle,
  DividerStyle,
  ProfileMediumStyle,
} from '../../styles/common';
import { TagListStyle, TagItemStyle, TagTextStyle } from '../../styles/tag';
import UserProjectHistory from '../../components/UserProjectHistory';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

//토큰 확인 용
const checkToken = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log('token 확인 :', token);
};

const GET_MYPROFILE = gql`
  query GetMyProfile {
    error
    user {
      User_id
      Username
      Profile_photo_path
      AboutMe
      userstack {
        stack {
          Stack_id
          Stack_name
        }
      }
      Email
    }
  }
`;

function MyProfile({ navigation }): React.ReactElement {
  //토큰확인
  checkToken();

  //데이터 확인
  const { loading, error, data } = useQuery(GET_MYPROFILE, { errorPolicy: 'all' });
  if (loading) console.log('Loading...');
  if (error) console.log(`Error?? : ${error.message}`);
  if (data) console.log('[data] 확인 :', data);
  if (data) console.log('[data.GetMyProfile] 확인 :', data.GetMyProfile);

  //프로필 편집을 위한 state
  // const userData = data.GetMyProfile.user;
  // const [username, setUsername] = useState<string>(userData.Username);
  // const [aboutMe, setAboutMe] = useState<string | null>(userData.AboutMe);
  // const [myStack, setMyStack] = useState<object[]>(userData.userstack.stack.Stack_name);
  // const [emailAddress, setEmailAddress] = useState<string>(userData.Email);

  //더미데이터
  const stackList = ['JavaScript', 'Java', 'JavaScript', 'Java', 'JavaScript', 'Java'];

  const gotoEditProfile = useCallback(() => {
    navigation.navigate('EditMyProfile');
  }, []);

  //헤더에 버튼 넣기
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="편집" onPress={gotoEditProfile} />,
    });
  }, []);

  return (
    <PageWrapWhiteStyle>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        {/* 프로필이미지, 유저네임 */}
        <ProfileMediumStyle image={false} />
        {/* <TextTitleStyle>{user.username}</TextTitleStyle> */}
        <TextTitleStyle>김코딩</TextTitleStyle>
      </View>
      <DividerStyle />
      {/* 짧은소개 */}
      <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
      {/* <TextContentStyle>{data ? user.AboutMe : 'loading...'}</TextContentStyle> */}
      <TextContentStyle>
        안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
        안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
        안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
        안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
        안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
      </TextContentStyle>
      {/* 기술스택 */}
      <TextSubTitleStyle>기술스택</TextSubTitleStyle>
      <TagListStyle>
        {/* {user.userstack.stack === 'null' ? (
          <TextContentStyle>기술스택이 없습니다.</TextContentStyle>
        ) : (
          user.userstack.stack.map(stack => (
            <TagItemStyle key={stack.Stack_id}>
              <TagTextStyle>{stack.Stack_name}</TagTextStyle>
            </TagItemStyle>
          ))
        )} */}
        {stackList &&
          stackList.map((stack, index) => (
            <TagItemStyle key={index}>
              <TagTextStyle>{stack}</TagTextStyle>
            </TagItemStyle>
          ))}
      </TagListStyle>
      {/* 프로젝트 히스토리 */}
      <TextSubTitleStyle>프로젝트 히스토리</TextSubTitleStyle>

      {/* 프로젝트 컴포넌트 */}
      <UserProjectHistory />
      <TextSubTitleStyle>이메일</TextSubTitleStyle>
      {/* <TextContentStyle>{user.Email}</TextContentStyle> */}
      <TextContentStyle>user@email.com</TextContentStyle>
      <DividerStyle />
    </PageWrapWhiteStyle>
  );
}

export default MyProfile;
