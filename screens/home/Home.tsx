import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BorderButton } from '../../components/ButtonComponent';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components/context';

function HomeScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  // const navigation = useNavigation();

  // useFocusEffect(
  //   useCallback(() => {
  //     // Get StackNav navigation item
  //     const stackNavigator = navigation.dangerouslyGetParent();

  //     if (stackNavigator) {
  //       // Actually set Title
  //       stackNavigator.setOptions({
  //         title: 'Home',
  //       });
  //     }
  //   }, [navigation]),
  // );

  const logoutButtonHandler = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    signOut();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <BorderButton onPress={logoutButtonHandler}>로그아웃</BorderButton>
    </View>
  );
}

export default HomeScreen;
