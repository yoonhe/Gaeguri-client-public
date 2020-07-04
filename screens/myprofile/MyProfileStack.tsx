import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from './MyProfile';
import EditMyProfile from './EditMyProfile';

const MyProfileStack = createStackNavigator();

function MyProfileScreen({ navigation, route }): React.ReactElement {
  if (route.state) {
    navigation.setOptions({ tabBarVisible: route.state.index > 0 ? false : true });
  }
  return (
    <MyProfileStack.Navigator initialRouteName="MyProfile">
      <MyProfileStack.Screen name="MyProfile" component={MyProfile} />
      <MyProfileStack.Screen name="EditMyProfile" component={EditMyProfile} />
    </MyProfileStack.Navigator>
  );
}
// 각 탭 내에 stack navigation이 존재한다!
export default MyProfileScreen;
