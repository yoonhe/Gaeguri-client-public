import { SubscribeToMoreOptions } from 'apollo-client';
import { GET_CHAT, CHAT_SUBSCRIPTION, SEND_MESSAGE, GET_MYINFO } from './RoomQuries';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import client from '../../../apollo';
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Room({ navigation, route }): React.ReactElement {
  const [isStopFetchMore, setStopFetchMore] = useState(false);
  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState();
  const [updateMessage, { data, loading, error }] = useMutation(SEND_MESSAGE);
  const myInfo = useQuery(GET_MYINFO);
  const chatSub = useSubscription(CHAT_SUBSCRIPTION);
  const { subscribeToMore, ...result } = useQuery(GET_CHAT, {
    variables: { Project_id: route.params.projectId },
  });

  const mapExistingChat = () => {
    if (result.data) {
      const originData = result.data.GetChat.chat;
      const array: any = [];
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
      setMessages(array);
    }
  };

  const subToNewChats = () => {
    console.log('실행은 되니?', chatSub.data);
    if (chatSub.data) {
      const liveChatSub = chatSub.data.ChatSub;
      console.log('jalkjdfklajldkfjl******', liveChatSub.Chat_id || '', messages[0]);
      if (current === messages[0]._id || messages[0]._id === liveChatSub.Chat_id) {
        console.log('sub...loading.... but the same data', messages[0]);
      } else {
        console.log('valid ~~~~~sub', messages[0]);
        const newChat: any = {
          _id: liveChatSub.Chat_id,
          text: liveChatSub.Contents,
          createdAt: liveChatSub.createdAt,
          user: {
            _id: liveChatSub.User_id,
            name: liveChatSub.user.Username,
          },
        };
        const mergeChats: any = [newChat, ...messages];
        setMessages(mergeChats);
      }
    } else if (chatSub.loading) {
      console.log('loading....');
    } else {
      console.log('error sub', chatSub.error);
    }
  };

  useLayoutEffect(() => {
    mapExistingChat();
    console.log('초기로딩');
  }, [result.data]);

  useEffect(() => {
    console.log('chatsub is unmounting');
    subToNewChats();
  }, [chatSub.data]);

  const onSend = useCallback((chatsending = []) => {
    console.log('importan@$%@%@$#%@$#', chatsending[0]);
    setMessages(previousMessages => GiftedChat.append(previousMessages, chatsending[0]));
    console.log('******onsend', chatsending[0]);
    setCurrent(chatsending[0]._id);
    updateMessage({
      variables: {
        Contents: chatsending[0].text,
        Project_id: route.params.projectId,
      },
    })
      .then(data => {
        console.log('m 성공', data);
      })
      .catch(err => {
        console.log('m 실패', err);
      });
  }, []);

  const onOpenSideBar = useCallback(() => {
    navigation.navigate('Drawer', {
      projectId: route.params.projectId,
      OwnerId: route.params.OwnerId,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.projectName,
      headerRight: () => (
        <Icon name="more" size={24} onPress={onOpenSideBar} style={{ marginHorizontal: 10 }} />
      ),
    });
  }, [navigation]);

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
          <Icon name="send" size={26} style={{ marginHorizontal: 10 }} />
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      {result.loading ? (
        <View>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      ) : (
        <GiftedChat
          messages={messages}
          onSend={onSend}
          renderUsernameOnMessage={true}
          renderBubble={renderBubble}
          placeholder="메세지를 입력하세요"
          renderInputToolbar={renderInputToolbar}
          onPressAvatar={onPressAvatar}
          renderSend={renderSend}
          user={{
            _id: myInfo?.data?.GetMyProfile?.user?.User_id,
            name: myInfo?.data?.GetMyProfile?.user?.Username,
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
