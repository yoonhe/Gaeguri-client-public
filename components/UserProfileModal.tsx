import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Button, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
// import Dimensions from 'react-native-extra-dimensions-android';
import {
  PageWrapStyle,
  TextContentStyle,
  TextSubTitleStyle,
  TextTitleStyle,
  TextDateStyle,
  DividerStyle,
  Color,
  ProfileSmallStyle,
} from '../styles/common';
import { TagListStyle, TagItemStyle, TagTextStyle } from '../styles/tag';
import { BorderButtonStyle } from '../styles/button';
import { ProjectHistoryStyle } from '../styles/list';

function UserProfileModal({ isModalVisible, toggleModal }): React.ReactElement {
  const [tagList, setTagList] = useState<object[]>([]);

  const stackList = ['JavaScript', 'Java', 'JavaScript', 'Java', 'JavaScript', 'Java'];
  const projectList = [
    {
      Project_id: 1,
      Project_name: '리액트 앱 프로젝트!!',
      projectpositionno: { position: '프론트엔드' },
      EndAt: '2020년 7월 1일',
    },
    {
      Project_id: 2,
      Project_name: '그래프큐앨 스터디 프로젝트 함께해요',
      projectpositionno: { position: '백엔드' },
      EndAt: '2020년 7월 1일',
    },
    {
      Project_id: 3,
      Project_name: 'Node.js 공부하면서 놀면서 만들어요',
      projectpositionno: { position: '프론트엔드' },
      EndAt: '2020년 7월 1일',
    },
  ];
  // const deviceWidth = Dimensions.get('window').width;
  // console.log(' deviceWidth ?? :', deviceWidth);

  return (
    <PageWrapStyle>
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
            <BorderButtonStyle small={true} backgroundColor={true} onPress={() => {}}>
              초대하기
            </BorderButtonStyle>
          </View>
          <DividerStyle />
          <ScrollView>
            <TextSubTitleStyle>짧은소개</TextSubTitleStyle>
            <TextContentStyle>
              안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
              안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
              안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
              안녕하세요, 코딩을 좋아하는 김코딩 입니다. 안녕하세요, 코딩을 좋아하는 김코딩 입니다.
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
            <View>
              {projectList &&
                projectList.map(project => (
                  <ProjectHistoryStyle key={project.Project_id}>
                    <TextContentStyle>{project.Project_name}</TextContentStyle>
                    <TextDateStyle>{project.projectpositionno.position}</TextDateStyle>
                    <TextDateStyle>{project.EndAt}</TextDateStyle>
                  </ProjectHistoryStyle>
                ))}
            </View>
            <TextSubTitleStyle>이메일</TextSubTitleStyle>
            <TextContentStyle>user@email.com</TextContentStyle>
            <View style={styles.btnBottom}>
              <DividerStyle />
              {/* <Button title="닫기" onPress={toggleModal} /> */}
              <BorderButtonStyle backgroundColor={true} onPress={toggleModal}>
                닫기
              </BorderButtonStyle>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </PageWrapStyle>
  );
}

const styles = StyleSheet.create({
  profileMedium: {
    width: 67,
    height: 67,
    borderRadius: 34,
    marginRight: 12,
  },
  history: {
    justifyContent: 'center',
    height: 70,
    marginTop: 2,
    marginBottom: 4,
    borderColor: `${Color.B400}`,
    backgroundColor: `${Color.B50}`,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  profileModal: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  btnBottom: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // position: 'absolute',
    // bottom: 0,
    borderRadius: 4,
    width: '100%',
    backgroundColor: `${Color.N0}`,
  },
});
export default UserProfileModal;
