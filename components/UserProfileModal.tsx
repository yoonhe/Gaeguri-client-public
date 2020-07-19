import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  TextContentStyle,
  TextSubTitleStyle,
  TextTitleStyle,
  DividerStyle,
  Color,
  ProfileSmallStyle,
} from '../styles/common';
import { TagListStyle, TagItemStyle, TagTextStyle } from '../styles/tag';
import { BorderButtonSmallStyle, BorderButtonStyle } from '../styles/button';
import UserProjectHistory from './UserProjectHistory';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USERPROFILE = gql`
  query getYourProfile($User_id: Int!) {
    GetYourProfile(User_id: $User_id) {
      ok
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
  }
`;

function UserProfileModal({ isModalVisible, toggleModal, route, id }): React.ReactElement {
  const [dataLoading, setDataLoading] = useState(true);
  const [userUsername, setUserUsername] = useState<string>('');
  const [userAboutMe, setUserAboutMe] = useState<string | null>(null);
  const [userStack, setUserStack] = useState<object[] | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const { error, data } = useQuery(GET_USERPROFILE, {
    variables: { User_id: 1 },
    // variables: { User_id: id },
  });

  useEffect(() => {
    if (error) console.log('유저프로필');
    console.log('프로필 userStack?? :', userStack);
    console.log('프로필 data?? :', data);
    setUserUsername(data.GetYourProfile.user.Username);
    setUserAboutMe(data.GetYourProfile.user.AboutMe);
    setUserStack(data.GetYourProfile.user.userstack);
    setUserProfileImage(data.GetYourProfile.user.Profile_photo_path);
    setUserEmail(data.GetYourProfile.user.Email);
    setDataLoading(false);
  }, []);

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        propagateSwipe={true}
        onBackdropPress={() => ({ isVisible: false })}
        style={styles.profileModal}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* 프로필이미지, 유저네임 */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ProfileSmallStyle image={false} />
              <TextTitleStyle>{userUsername}</TextTitleStyle>
            </View>
            <BorderButtonSmallStyle backgroundColor={true}>초대하기</BorderButtonSmallStyle>
          </View>
          <DividerStyle />

          <ScrollView>
            <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
            <TextContentStyle>
              {myAboutMe !== null ? myAboutMe : '소개글을 작성 해주세요'}
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
            {/* 프로젝트 히스토리: 토큰으로 인증 */}
            <UserProjectHistory />

            <TextSubTitleStyle>이메일</TextSubTitleStyle>
            <TextContentStyle>{myEmail}</TextContentStyle>

            <View style={styles.btnBottom}>
              <DividerStyle />
              <BorderButtonStyle backgroundColor={true} onPress={toggleModal}>
                닫기
              </BorderButtonStyle>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  profileModal: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  btnBottom: {
    flex: 1,
    borderRadius: 4,
    width: '100%',
    backgroundColor: `${Color.N0}`,
  },
});

export default UserProfileModal;
