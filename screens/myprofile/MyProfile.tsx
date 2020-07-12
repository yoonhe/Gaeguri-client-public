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
import AsyncStorage from '@react-native-community/async-storage';
import { GET_MYPROFILE } from './ProfileQuries';

//토큰 확인 용
const checkToken = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log('token 확인 :', token);
};

// const GET_MYPROFILE = gql`
//   query {
//     GetMyProfile {
//       ok
//       error
//       user {
//         User_id
//         Username
//         Profile_photo_path
//         AboutMe
//         userstack {
//           stack {
//             Stack_id
//             Stack_name
//           }
//         }
//         Email
//       }
//     }
//   }
// `;

function MyProfile({ navigation }): React.ReactElement {
  //토큰확인
  checkToken();

  //데이터 확인
  const { loading, error, data } = useQuery(GET_MYPROFILE);
  if (loading) console.log('Loading...');
  if (error) console.log(`Error?? : ${error.message}`);
  if (data) console.log('[data] 확인?? :', data);

  //프로필 편집을 위한 state
  const userData = data.GetMyProfile.user;
  const [myUsername, setMyUsername] = useState<string>(userData.Username);
  const [myProfileImage, setMyProfileImage] = useState<string | null>(userData.Profile_photo_path);
  const [aboutMe, setAboutMe] = useState<string | null>(userData.AboutMe);
  const [myStack, setMyStack] = useState<object[] | null>(userData.userstack);
  const [myEmail, setMyEmail] = useState<string>(userData.Email);
  const userId = userData.User_id;
  console.log('userId ??:', userId);
  console.log('myStack ??:', userData.userstack.stack);

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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        {/* 프로필이미지, 유저네임 */}
        <ProfileMediumStyle image={myProfileImage ? myProfileImage : false} />
        <TextTitleStyle>{myUsername}</TextTitleStyle>
      </View>
      <DividerStyle />
      {/* 짧은소개 */}
      <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
      <TextContentStyle>{aboutMe ? aboutMe : '소개글을 작성 해주세요'}</TextContentStyle>
      {/* 기술스택 */}
      <TextSubTitleStyle>기술스택</TextSubTitleStyle>
      {/* <View> */}
      {myStack.length === 0 ? (
        <TextContentStyle placeholder={true}>스택을 입력해주세요</TextContentStyle>
      ) : (
        <TagListStyle>
          {myStack.map((stack, index) => (
            <TagItemStyle key={index}>
              <TagTextStyle>{stack.stack.Stack_name}</TagTextStyle>
            </TagItemStyle>
          ))}
        </TagListStyle>
      )}
      {/* </View> */}
      <TextSubTitleStyle>프로젝트 히스토리</TextSubTitleStyle>
      {/* 프로젝트 컴포넌트 */}
      <UserProjectHistory userId={userId} />
      <TextSubTitleStyle>이메일</TextSubTitleStyle>
      <TextContentStyle>{myEmail}</TextContentStyle>
      <DividerStyle />
    </PageWrapWhiteStyle>
  );
}

export default MyProfile;
