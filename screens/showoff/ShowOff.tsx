import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import UserProfileModal from '../../components/UserProfileModal';

function ShowOffScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ShowOff Screen</Text>

      {/* 모달띄울 버튼 */}
      <Button title="유저프로필 모달 프리뷰" onPress={toggleModal} />
      {/* 유저프로필 모달 */}
      <UserProfileModal toggleModal={toggleModal} isModalVisible={isModalVisible} />
    </View>
  );
}

export default ShowOffScreen;
