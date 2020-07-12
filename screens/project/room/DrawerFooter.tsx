import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function DrawerFooter({ navigation, projectId }): React.ReactElement {
  const inviteMember = useCallback(() => {
    console.log('Invite');
  }, []);

  const projectSettings = useCallback(() => {
    navigation.navigate('ProjectSetting', { projectId });
  }, []);

  const exitProject = useCallback(() => {
    console.log('exitProject');
    Alert.alert(
      '프로젝트에서 나가기',
      '프로젝트 방에서 나가게되면 더 이상 참여할 수 없으며 대화내용 및 프로젝트 목록에서 사라집니다.',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '나가기',
          onPress: () => navigation.navigate('Main'),
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.touchBlock} onPress={inviteMember}>
        {/* <Ionicons name='md-person-add' size={24} color='black' /> */}
        <Text style={styles.text}>멤버 초대하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchBlock} onPress={projectSettings}>
        {/* <Ionicons name='ios-settings' size={24} color='black' /> */}
        <Text style={styles.text}>프로젝트 설정하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchBlock} onPress={exitProject}>
        {/* <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={24}
          color="black"
        /> */}
        <Text style={styles.text}>프로젝트 나가기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DrawerFooter;

const styles = StyleSheet.create({
  touchBlock: {
    backgroundColor: '#FFFF',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    left: 15,
  },
});
