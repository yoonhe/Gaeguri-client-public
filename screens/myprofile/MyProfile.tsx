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
import Ionicons from 'react-native-vector-icons/Ionicons';

const GET_MY_PROFILE = gql`
  query GetMyProfile {
    ok
    error
    user {
      User_id
      Username
      AboutMe
      userstack {
        stack {
          Stack_name
        }
      }
      Email
    }
  }
`;

function MyProfile({ navigation, route }): React.ReactElement {
  console.log(route.data);

  const { loading, error, data } = useQuery(GET_MY_PROFILE);
  if (loading) console.log('Loading...');
  if (error) console.log(`Error! ${error.message}`);
  if (data) console.log('MyProfile data ? ', data);
  // const user = data.GetMyProfile;

  const [userImage, setUserImage] = useState('');

  //더미데이터
  const stackList = ['JavaScript', 'Java', 'JavaScript', 'Java', 'JavaScript', 'Java'];

  const gotoEditProfile = useCallback(() => {
    navigation.navigate('EditMyProfile', { userImage: '' });
  }, [userImage]);

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
        <ProfileMediumStyle image={userImage} />
        {/* <TextTitleStyle>{user.username}</TextTitleStyle> */}
        <TextTitleStyle>김코딩</TextTitleStyle>
      </View>
      <DividerStyle />
      {/* 짧은소개 */}
      <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
      {/* <TextContentStyle>{user.AboutMe}</TextContentStyle> */}
      <TextContentStyle>
        안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
        안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
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
