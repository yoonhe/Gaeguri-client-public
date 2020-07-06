import React, { useState, useCallback, useLayoutEffect } from 'react';
import { GiftedChat, IMessage, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { HeaderRightOcticons } from '../../../styles/common';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const dummyData: IDummyData[] = [
  {
    _id: 1,
    text: '안녕하세요~',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: '조재익',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 2,
    text: '반가워요!',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: '서나연',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 3,
    text: '어서오세요!',
    createdAt: new Date(),
    user: {
      _id: 3,
      name: '윤해은',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

interface IDummyData {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}

function Room({ navigation, route }): React.ReactElement {
  const [routerTitle, setRouterTitle] = useState<string>(route.params.title);
  const [messages, setMessages] = useState<IMessage[]>(dummyData);

  console.log('route.params.projectId ? ', route.params.projectId);

  const onSend = (newMessages: IMessage[] = []) =>
    setMessages(GiftedChat.append(messages, newMessages));

  const onOpenSideBar = useCallback(() => {
    navigation.navigate('Drawer', { title: routerTitle });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: routerTitle === '' ? 'React 프로젝트 하실 분!' : routerTitle,
      headerRight: () => (
        <Icon
          name="three-bars"
          size={24}
          onPress={onOpenSideBar}
          style={{ marginHorizontal: 10 }}
        />
      ),
    });
  }, [navigation, routerTitle]);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: 'black',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFFFFF',
          },
          right: {
            backgroundColor: '#B5D4FF',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#FFFFFF',
        }}
      />
    );
  };

  const onPressAvatar = () => {
    console.log('avatar click');
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Ionicons name="ios-send" size={24} color="black" style={{ marginHorizontal: 10 }} />
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        {...{ messages, onSend }}
        user={{
          _id: 1,
        }}
        renderUsernameOnMessage={true}
        renderBubble={renderBubble}
        placeholder="메세지를 입력하세요"
        renderInputToolbar={renderInputToolbar}
        onPressAvatar={onPressAvatar}
        renderSend={renderSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F7FF',
  },
});

export default Room;
