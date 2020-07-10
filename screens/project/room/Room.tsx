import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { GiftedChat, IMessage, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { HeaderRightOcticons } from '../../../styles/common';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GET_CHAT, CHAT_SUBSCRIPTION, SEND_MESSAGE } from './RoomQuries';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';

function Room({ navigation, route }): React.ReactElement {
  const [routerTitle, setRouterTitle] = useState<string>(route.params.title);
  const [messageArray, setMessageArray] = useState([]);

  const chatSub = useSubscription(CHAT_SUBSCRIPTION);
  const chetData = useQuery(GET_CHAT, {
    variables: { Project_id: route.params.projectId },
  });

  const [updateMessage] = useMutation(SEND_MESSAGE, {
    update(cache, { data }) {
      const { GetChat } = cache.readQuery({
        query: GET_CHAT,
        variables: {
          Project_id: route.params.projectId,
        },
      });

      const newChat = data.SendChat;

      cache.writeQuery({
        query: GET_CHAT,
        variables: {
          Project_id: route.params.projectId,
        },
        data: {
          GetChat: {
            chat: [...GetChat.chat, newChat.chat],
            __typename: 'chat',
          },
        },
      });
    },
  });

  useEffect(() => {
    if (chatSub.data) {
      const data = chatSub.data.ChatSub;
      const obj = {
        _id: data.Chat_id,
        text: data.Contents,
        createdAt: data.createdAt,
        user: {
          _id: data.User_id,
          name: data.user.Username,
        },
      };

      return setMessageArray(GiftedChat.append(messageArray, [obj]));
    }
  }, [chatSub.data]);

  useLayoutEffect(() => {
    if (chetData.data) {
      const originData = chetData.data.GetChat.chat;
      const array = [];
      originData.map(v => {
        const obj = {
          _id: v.Chat_id,
          text: v.Contents,
          createdAt: v.createdAt,
          user: {
            _id: v.User_id,
            name: v.user.Username,
          },
        };
        array.unshift(obj);
      });
      setMessageArray(array);
    }
  }, [!chetData.loading]);

  const onSend = newMessages => {
    updateMessage({
      variables: {
        Contents: newMessages[0].text,
        Project_id: route.params.projectId,
      },
    });
  };

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
      {chetData.loading ? (
        <Text>loading...</Text>
      ) : (
        <GiftedChat
          messages={messageArray}
          onSend={onSend}
          renderUsernameOnMessage={true}
          renderBubble={renderBubble}
          placeholder="메세지를 입력하세요"
          renderInputToolbar={renderInputToolbar}
          onPressAvatar={onPressAvatar}
          renderSend={renderSend}
          user={{
            _id: 1,
          }}
        />
      )}
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
