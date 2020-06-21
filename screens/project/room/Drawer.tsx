import React, { useLayoutEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {
  PageWrapWhiteStyle,
  PageWrap,
  TextContentStyle,
  TextSubTitleStyle,
  TextTitleStyle,
  TextDateStyle,
  DividerStyle,
  Color,
} from '../../../styles/common';
import DrawerFooter from './DrawerFooter';

const DATA: IData[] = [
  {
    id: 1,
    name: '조재익',
    profile: 'https://placeimg.com/140/140/any',
    position: '백엔드',
    owner: true,
  },
  {
    id: 2,
    name: '서나연',
    profile: 'https://placeimg.com/140/140/any',
    position: '프론트엔드',
    owner: false,
  },
  {
    id: 3,
    name: '윤해은',
    profile: 'https://placeimg.com/140/140/any',
    position: '프론트엔드',
    owner: false,
  },
  {
    id: 4,
    name: '오코딩',
    profile: 'https://placeimg.com/140/140/any',
    position: '백엔드',
    owner: false,
  },
  {
    id: 5,
    name: '조코딩',
    profile: 'https://placeimg.com/140/140/any',
    position: '프론트엔드',
    owner: false,
  },
  {
    id: 6,
    name: '김코딩',
    profile: 'https://placeimg.com/140/140/any',
    position: '프론트엔드',
    owner: false,
  },
  {
    id: 7,
    name: '윤코딩',
    profile: 'https://placeimg.com/140/140/any',
    position: '백엔드',
    owner: false,
  },
];

interface IData {
  id: number;
  name: string;
  profile: string;
  position: string;
  owner: boolean;
}

function Drawer({ navigation, router }): React.ReactElement {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로젝트 서랍',
      headerLeft: () => <Button title='닫기' onPress={closeDrawer} />,
    });
  }, [navigation]);

  const closeDrawer = useCallback(() => {
    navigation.goBack();
  }, []);

  const keyExtractor = (item: IData) => String(item.id);

  const renderItem = ({ item }): React.ReactElement => {
    return (
      <View style={styles.item}>
        <Image
          style={styles.profileMedium}
          source={
            item.profile !== ''
              ? { uri: item.profile }
              : require('../../../assets/MyProfile/profile_medium.png')
          }
        />
        {item.owner && (
          <Image style={styles.crown} source={require('../../../assets/Room/crown.png')} />
        )}
        <Text
          style={{
            fontSize: 12,
            color: '#2F80ED',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            left: 60,
          }}
        >
          {item.position}
        </Text>
        <Text style={{ fontSize: 16, left: 130, position: 'absolute' }}>{item.name}</Text>
        <TouchableOpacity style={{ position: 'absolute', right: 5 }}>
          <Image
            style={styles.retreatButton}
            source={require('../../../assets/Room/retreat.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={keyExtractor} />
      <DividerStyle />
      <DrawerFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#FFFF',
    padding: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
  },
  profileMedium: {
    width: 40,
    height: 40,
    borderRadius: 34,
    marginRight: 12,
  },
  retreatButton: {
    width: 40,
    height: 40,
    marginLeft: 12,
  },
  crown: {
    width: 20,
    height: 20,
    right: 30,
    top: 20,
  },
});

export default Drawer;
