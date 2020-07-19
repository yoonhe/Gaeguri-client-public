import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, Button, Text } from 'react-native';
import {
  PageWrapWhiteStyle,
  TextContentStyle,
  TextSubTitleStyle,
  TextTitleStyle,
  DividerStyle,
  ProfileMediumStyle,
} from '../../styles/common';
import { TagListStyle, TagItemStyle, TagTextStyle } from '../../styles/tag';
import { HeaderButtonStyle } from '../../styles/button';
import UserProjectHistory from '../../components/UserProjectHistory';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { GET_MYPROFILE } from './ProfileQuries';

function MyProfile({ navigation }): React.ReactElement {
  //데이터 확인
  const client = useApolloClient();
  const [dataLoading, setDataLoading] = useState(true);
  const [myUsername, setMyUsername] = useState<string>('');
  const [myAboutMe, setMyAboutMe] = useState<string | null>(null);
  const [myStack, setMyStack] = useState<object[] | null>(null);
  const [myProfileImage, setMyProfileImage] = useState<string | null>(null);
  const [myEmail, setMyEmail] = useState('');

  useEffect(() => {
    getUserData();
    console.log('프로필 myStack?? :', myStack);
  }, []);

  const getUserData = async () => {
    const {
      data: {
        GetMyProfile: { user },
      },
    } = await client.query({
      query: GET_MYPROFILE,
    });
    console.log('프로필 data?? :', user);
    setMyUsername(user.Username);
    setMyAboutMe(user.AboutMe);
    setMyStack(user.userstack);
    setMyProfileImage(user.Profile_photo_path);
    setMyEmail(user.Email);
    setDataLoading(false);
  };

  //헤더에 버튼 넣기
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonStyle
          title="편집"
          onPress={() => {
            navigation.navigate('프로필 편집', {
              current_Username: myUsername,
              current_ProfileImage: myProfileImage,
              current_AboutMe: myAboutMe,
              current_Stack: myStack,
            });
          }}
        >
          편집
        </HeaderButtonStyle>
      ),
    });
  }, [navigation, myUsername, myProfileImage, myAboutMe, myStack]);

  return (
    <PageWrapWhiteStyle>
      {dataLoading ? (
        <View>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      ) : (
        <View>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <ProfileMediumStyle uri={false} />
            <TextTitleStyle>{myUsername}</TextTitleStyle>
          </View>
          <DividerStyle />

          <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
          <Text>
            {myAboutMe !== null ? (
              <TextContentStyle>myAboutMe</TextContentStyle>
            ) : (
              <TextContentStyle placeholder={true}>소개글을 작성 해주세요</TextContentStyle>
            )}
          </Text>

          <TextSubTitleStyle>기술스택</TextSubTitleStyle>
          <TagListStyle>
            {myStack === null ? (
              <TextContentStyle placeholder={true}>스택을 입력해주세요</TextContentStyle>
            ) : (
              myStack.map((stack, index) => (
                <TagItemStyle key={index}>
                  <TagTextStyle>{stack.stack.Stack_name}</TagTextStyle>
                </TagItemStyle>
              ))
            )}
          </TagListStyle>
          <TextSubTitleStyle>프로젝트 히스토리</TextSubTitleStyle>
          {/* 프로젝트 히스토리: 토큰으로 인증 */}
          <UserProjectHistory />
          <TextSubTitleStyle>이메일</TextSubTitleStyle>
          <TextContentStyle>{myEmail}</TextContentStyle>
        </View>
      )}
      {/* 유저리스트 */}
      {/* <View>
        <DividerStyle />
        <Text onPress={() => navigation.navigate('유저 프로필')}>유저리스트 > </Text>
      </View> */}
    </PageWrapWhiteStyle>
  );
}

export default MyProfile;
