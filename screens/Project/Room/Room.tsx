import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';

function Room({ navigation }): React.ReactElement {
  const goToMain = useCallback(() => {
    navigation.navigate('Main');
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Room Screen</Text>
      <Button
        title='Go to Main'
        onPress={goToMain}
      />
    </View>
  );
}

export default Room;
