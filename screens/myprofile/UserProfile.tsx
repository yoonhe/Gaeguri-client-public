import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import UserProfileModal from '../../components/UserProfileModal';
import { ProfileSmallStyle } from '../../styles/common';

function UserList() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row', margin: 16 }}>
      {/* 모달띄울 버튼 */}
      <ProfileSmallStyle uri={false} />
      <Text title="username" onPress={toggleModal}>
        김코딩
      </Text>

      {/* 유저프로필 모달 */}
      <UserProfileModal toggleModal={toggleModal} isModalVisible={isModalVisible} />
    </View>
  );
}

export default UserList;
