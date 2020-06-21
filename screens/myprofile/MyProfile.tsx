import React, { useEffect, useCallback, useLayoutEffect, useState } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import {
  PageWrapWhiteStyle,
  PageWrap,
  TextContentStyle,
  TextSubTitleStyle,
  TextTitleStyle,
  TextDateStyle,
  DividerStyle,
  Color,
} from '../../styles/common';
import { StackStyle } from '../../styles/tag';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//DB요청 정보: user_id
//DB 반환 정보: profile 사진, username, email, 짧은 소개, 기술스택
const dummyUser: IDummyUser = {
  profile: 'https://placeimg.com/67/67/any',
  username: '김코딩',
  introduction:
    '안녕하세요, 김코딩 입니다. 코딩이 취미인 프런트엔드 개발자입니다. 요즘은 그래프큐앨을 공부하고 있습니다. 제 블로그와 유튜브 채널에도 방문해주세요. 만나서 반갑습니다.',
  stack: ['react', 'react-native', 'node.js', 'express', 'redux', 'mySQL'],
  email: 'kimcoding@email.com',
  projects: [
    {
      title: '리액트 앱 프로젝트!!',
      position: '프론트엔드',
      date: '2020년 7월 1일',
    },
    {
      title: '그래프큐앨 스터디 프로젝트 함께해요',
      position: '백엔드',
      date: '2020년 7월 1일',
    },
    { title: 'Node.js 공부하면서 놀면서 만들어요', position: '프론트엔드', date: '2020년 7월 1일' },
  ],
};

interface IDummyUser {
  profile: string;
  username: string;
  introduction: string;
  email: string;
  stack: string[];
  projects: Iprojects[];
}

interface Iprojects {
  title: string;
  position: string;
  date: string;
}

function MyProfile({ navigation, route }): React.ReactElement {
  const { profile, username, introduction, stack, email } = dummyUser;

  const gotoEditProfile = useCallback(() => {
    navigation.navigate('EditMyProfile', { profile, username, introduction, stack, email });
  }, [profile, username, introduction, stack, email]);

  //헤더에 버튼 넣기
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="편집" onPress={gotoEditProfile} />,
    });
  }, []);

  return (
    <PageWrapWhiteStyle>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Image
          style={styles.profileMedium}
          source={
            profile !== '' ? { uri: profile } : require('../../assets/MyProfile/profile_medium.png')
          }
        />
        <TextTitleStyle>{username}</TextTitleStyle>
      </View>
      <DividerStyle />
      <View>
        <TextSubTitleStyle>Introduction</TextSubTitleStyle>
        <TextContentStyle>{introduction}</TextContentStyle>
      </View>
      <TextSubTitleStyle>Stack</TextSubTitleStyle>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {stack.map(stack => {
          return <StackStyle key={stack}>{stack}</StackStyle>;
        })}
      </View>

      <TextSubTitleStyle>Project History</TextSubTitleStyle>
      {dummyUser.projects.map(project => {
        return (
          <View style={styles.history} key={project.title}>
            <TextContentStyle>{project.title}</TextContentStyle>
            <TextDateStyle>
              {project.position} | {project.date}
            </TextDateStyle>
          </View>
        );
      })}
      <TextSubTitleStyle>Contact</TextSubTitleStyle>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name="email-outline"
          size={20}
          color={`${Color.N500}`}
          style={{ marginRight: 2 }}
        />
        <TextContentStyle>{email}</TextContentStyle>
      </View>
    </PageWrapWhiteStyle>
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
});

export default MyProfile;
