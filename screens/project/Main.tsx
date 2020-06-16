import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';

function Main({ navigation }): React.ReactElement {
  const goToRoom = useCallback(() => {
    navigation.navigate('Room', { title: '' });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the home screen of the app</Text>
      <Button onPress={goToRoom} title='Go to Room' />
    </View>
  );
}

export default Main;
