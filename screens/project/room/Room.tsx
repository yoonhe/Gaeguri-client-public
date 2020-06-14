import React, { useCallback } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons';

function Room({ navigation, route }): React.ReactElement {
  const [value, onChangeText] = React.useState(route.params.title);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const IoniconsHeaderButton = props => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color='blue' />
  );

  const onOpenDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: value === '' ? 'No title' : value,
      headerRight: () => (
        <Octicons
          style={{ marginHorizontal: 10 }}
          name='three-bars'
          size={24}
          color='black'
          onPress={onOpenDrawer}
        />
      ),
    });
  }, [navigation, value]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

export default Room;
