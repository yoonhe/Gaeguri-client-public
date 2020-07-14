import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GET_CHAT, CHAT_SUBSCRIPTION, SEND_MESSAGE, GET_MYINFO, GET_PROJECT } from './RoomQuries';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';

function Room({ navigation, route }): React.ReactElement {
  const [messageArray, setMessageArray] = useState([]);

  const chatSub = useSubscription(CHAT_SUBSCRIPTION);

  const chatData = useQuery(GET_CHAT, {
    variables: { Project_id: route.params.projectId },
  });

  const myInfo = useQuery(GET_MYINFO);

  const projectInfo = useQuery(GET_PROJECT, {
    variables: { Project_id: route.params.projectId },
  });

  const [updateMessage] = useMutation(SEND_MESSAGE);

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
    if (chatSub.error) {
      console.log(chatSub.error);
    }
  }, [chatSub.data]);

  useLayoutEffect(() => {
    if (chatData.data) {
      const originData = chatData.data.GetChat.chat;
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
  }, [!chatData.loading]);

  const onSend = newMessages => {
    updateMessage({
      variables: {
        Contents: newMessages[0].text,
        Project_id: route.params.projectId,
      },
    });
  };

  const onOpenSideBar = useCallback(() => {
    navigation.navigate('Drawer', {
      projectId: route.params.projectId,
      OwnerId: route.params.OwnerId,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: projectInfo?.data?.getProjectDetail?.Project_name,
      headerRight: () => (
        <Icon
          name='more-horiz'
          size={24}
          onPress={onOpenSideBar}
          style={{ marginHorizontal: 10 }}
        />
      ),
    });
  }, [navigation, projectInfo.data]);

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
          <Icon name='send' size={26} style={{ marginHorizontal: 10 }} />
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      {chatData.loading || myInfo.loading || projectInfo.loading ? (
        <View>
          <ActivityIndicator size='small' color='#00ff00' />
        </View>
      ) : (
        <GiftedChat
          messages={messageArray}
          onSend={onSend}
          renderUsernameOnMessage={true}
          renderBubble={renderBubble}
          placeholder='메세지를 입력하세요'
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
