import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';

function Main({ navigation }) {
  const goToRoom = useCallback(() => {
    navigation.navigate('Room');
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Main Screen</Text>
      <Button
        title='Go to Room'
        onPress={goToRoom}
      />
    </View>
  );
}

export default Main;
