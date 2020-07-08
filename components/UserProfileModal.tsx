import React from 'react';
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
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

function UserProfileModal({ isModalVisible, toggleModal, route }): React.ReactElement {
  const { loading, error, data } = useQuery(GET_MY_PROFILE);
  if (loading) console.log('Loading...');
  if (error) console.log(`Error! ${error.message}`);
  if (data) console.log('data ? ', data);
  // const  user  = data.GetMyProfile;

  const stackList = ['JavaScript', 'Java', 'JavaScript', 'Java', 'JavaScript', 'Java'];
  // const deviceWidth = Dimensions.get('window').width;
  // console.log(' deviceWidth ?? :', deviceWidth);

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
              <TextTitleStyle>김코딩</TextTitleStyle>
            </View>
            <BorderButtonSmallStyle backgroundColor={true}>초대하기</BorderButtonSmallStyle>
          </View>
          <DividerStyle />
          <ScrollView>
            <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
            <TextContentStyle>
              안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
              안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
              안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
            </TextContentStyle>
            <TextSubTitleStyle>기술스택</TextSubTitleStyle>
            <TagListStyle>
              {stackList &&
                stackList.map((stack, index) => (
                  <TagItemStyle key={index}>
                    <TagTextStyle>{stack}</TagTextStyle>
                  </TagItemStyle>
                ))}
            </TagListStyle>
            <TextSubTitleStyle>프로젝트 히스토리</TextSubTitleStyle>

            {/* 프로젝트 컴포넌트 */}
            <UserProjectHistory />

            <TextSubTitleStyle>이메일</TextSubTitleStyle>
            <TextContentStyle>user@email.com</TextContentStyle>
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
