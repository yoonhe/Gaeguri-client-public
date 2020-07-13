import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
  const [dataLoading, setDataLoading] = useState(false);
  const [myUsername, setMyUsername] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string | null>(null);
  const [myStack, setMyStack] = useState<object[] | null>(null);

  const [myUserId, setMyUserId] = useState<string>('');
  const [myProfileImage, setMyProfileImage] = useState<string | null>(null);
  const [myEmail, setMyEmail] = useState<string>('');

  const fetchData = async () => {
    const { loading, error, data } = await useQuery(GET_MYPROFILE);
    if (error) console.log('프로필 error?? :', error.message);
    if (loading) {
      console.log('프로필 Loading...');
      setDataLoading(true);
    }
    if (data) {
      console.log('프로필 data?? :', data.GetMyProfile.user);
      setDataLoading(false);

      setMyUsername(data.GetMyProfile.user.Username);
      setAboutMe(data.GetMyProfile.user.AboutMe);
      setMyStack(data.GetMyProfile.user.userstack);

      setMyUserId(data.GetMyProfile.user.User_id);
      setMyProfileImage(data.GetMyProfile.user.Profile_photo_path);
      setMyEmail(data.GetMyProfile.user.Email);
    }
  };
  fetchData();
  // console.log('myUsername data?? :', myUsername);

  //헤더에 버튼 넣기
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtonStyle
          title="편집"
          onPress={() => {
            /* 넘길 params */
            navigation.navigate('EditMyProfile');
          }}
        >
          편집
        </HeaderButtonStyle>
      ),
    });
  }, []);

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
          <TextContentStyle>
            {aboutMe !== null ? aboutMe : '소개글을 작성 해주세요'}
          </TextContentStyle>
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
          {/* <UserProjectHistory userId={myUserId} /> */}
          <TextSubTitleStyle>이메일</TextSubTitleStyle>
          <TextContentStyle>{myEmail}</TextContentStyle>
        </View>
      )}
    </PageWrapWhiteStyle>
  );
}

export default MyProfile;

// {
//   myUsername: myUsername,
//   myProfileImage: myProfileImage,
//   aboutMe: aboutMe,
//   myStack: myStack,
//   myEmail: myEmail,
// }
