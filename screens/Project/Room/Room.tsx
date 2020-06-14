import React, { useCallback } from 'react';
import { View, TextInput, Button } from 'react-native';

function Room({ navigation, route }): React.ReactElement {
  const [value, onChangeText] = React.useState(route.params.title);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: value === '' ? 'No title' : value,
    });
  }, [navigation, value]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={onChangeText}
        value={value}
      />
      <Button title='Go back' onPress={goBack} />
    </View>
  );
}

export default Room;
