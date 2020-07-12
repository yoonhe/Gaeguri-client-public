import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login/Login';
import SignupStack from '../screens/signup/Signup';

function BottomTabNavigation({ navigation }): React.ReactElement {
  const Stack = createStackNavigator();
  navigation.setOptions({ tabBarVisible: false });
  return (
    <Stack.Navigator>
      <Stack.Screen name="로그인" component={Login} />
      <Stack.Screen name="Signup" component={SignupStack} />
    </Stack.Navigator>
  );
}

export default BottomTabNavigation;
