import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
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
import { useQuery } from '@apollo/react-hooks';
import { GET_MYPROFILE } from './ProfileQuries';

function MyProfile({ navigation }): React.ReactElement {
  //데이터 확인
  const { loading, error, data } = useQuery(GET_MYPROFILE);
  if (loading) console.log('Loading...');
  if (error) console.log(`Error?? : ${error.message}`);
  if (data) console.log('[data] 확인?? :', data);

  //프로필 데이터
  const [myUsername, setMyUsername] = useState<string>(data.GetMyProfile.user.Username);
  const [aboutMe, setAboutMe] = useState<string | null>(data.GetMyProfile.user.AboutMe);
  const [myStack, setMyStack] = useState<object[] | null>(data.GetMyProfile.user.userstack);
  const [myEmail, setMyEmail] = useState<string>(data.GetMyProfile.user.Email);
  const myProfileImage = data.GetMyProfile.user.Profile_photo_path;
  const userId = data.GetMyProfile.user.User_id;
  // console.log('userId ??:', userId);
  // console.log('myStack ??:', userData.userstack.stack);

  //헤더에 버튼 넣기
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonStyle
          title="편집"
          onPress={() => {
            /* 넘길 params */
            navigation.navigate('EditMyProfile', {
              myUsername: myUsername,
              myProfileImage: myProfileImage,
              aboutMe: aboutMe,
              myStack: myStack,
              myEmail: myEmail,
            });
          }}
        >
          편집
        </HeaderButtonStyle>
      ),
    });
  }, []);

  return (
    <PageWrapWhiteStyle>
      {loading && (
        <View>
          <ActivityIndicator />
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        {/* 프로필이미지, 유저네임 */}
        <ProfileMediumStyle image={myProfileImage ? myProfileImage : false} />
        <TextTitleStyle>{myUsername}</TextTitleStyle>
      </View>
      <DividerStyle />

      <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
      <TextContentStyle>{data && aboutMe ? aboutMe : '소개글을 작성 해주세요'}</TextContentStyle>

      <TextSubTitleStyle>기술스택</TextSubTitleStyle>
      {data && myStack === null ? (
        <TextContentStyle placeholder={true}>스택을 입력해주세요</TextContentStyle>
      ) : (
        <TagListStyle>
          {data &&
            myStack.map((stack, index) => (
              <TagItemStyle key={index}>
                <TagTextStyle>{stack.stack.Stack_name}</TagTextStyle>
              </TagItemStyle>
            ))}
        </TagListStyle>
      )}

      <TextSubTitleStyle>프로젝트 히스토리</TextSubTitleStyle>
      <UserProjectHistory userId={userId} />

      <TextSubTitleStyle>이메일</TextSubTitleStyle>
      <TextContentStyle>{data && myEmail}</TextContentStyle>
      <DividerStyle />
    </PageWrapWhiteStyle>
  );
}

export default MyProfile;
