import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

function HomeScreen({}) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Get StackNav navigation item
      const stackNavigator = navigation.dangerouslyGetParent();

      if (stackNavigator) {
        // Actually set Title
        stackNavigator.setOptions({
          title: 'Home',
        });
      }
    }, [navigation]),
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;
