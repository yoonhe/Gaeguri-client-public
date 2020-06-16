import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { PageWrap } from '../../styles/common';

const userData = [
  {
    title: '짧은 소개',
    data: `안녕하세요, 김코딩 입니다. 백엔드 개발을 좋아하는 프런트엔드 개발자입니다. 요즘은 장고와 리액트로 PROGRESSIVE WEB APP을 빠르게 제작하는 것에 빠져있습니다. 효율적 시간관리에 관한 서비스에 관심이 많습니다. 만나서 반갑습니다.`,
  },
  {
    title: '기술 스택',
    data: ['리액트', '노드', '자바', '리액트', ' 노드', '자바'],
  },
];

const Item = ({ title, data }) => (
  <View style={styles.item}>
    <Text>{title}</Text>
    <Text>{data}</Text>
  </View>
);

function MyProfile() {
  return (
    <PageWrap>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.profileMedium}
          source={require('../../assets/MyProfile/profile_medium.png')}
        />
        <Text>김코딩</Text>
      </View>
      <View>
        <FlatList
          data={userData}
          renderItem={({ item }) => <Item title={item.title} data={item.data} />}
          keyExtractor={item => item.title}
        />
      </View>
    </PageWrap>
  );
}

const styles = StyleSheet.create({
  profileMedium: {
    width: 67,
    height: 67,
    marginRight: 8,
  },

  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // text: {
  //   fontSize: 16,
  //   marginTop: 8,
  // },
  item: {
    backgroundColor: '#fff',
    padding: 4,
    marginVertical: 8,
  },
  // subTitle: {
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   backgroundColor: '#fff',
  // },
});

export default MyProfile;
