import React from 'react';
// import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from './MyProfile';
import EditMyProfile from './EditMyProfile';
// import SelectPhoto from './SelectPhoto';

const MyProfileStack = createStackNavigator();

function MyProfileScreen({ navigation, route }): React.ReactElement {
  if (route.state) {
    navigation.setOptions({ tabBarVisible: route.state.index > 0 ? false : true });
  }
  return (
    <MyProfileStack.Navigator initialRouteName="MyProfile">
      <MyProfileStack.Screen name="MyProfile" component={MyProfile} />
      <MyProfileStack.Screen name="EditMyProfile" component={EditMyProfile} />
      {/* <MyProfileStack.Screen name="SelectPhoto" component={SelectPhoto} /> */}
    </MyProfileStack.Navigator>
  );
}
// 각 탭 내에 stack navigation이 존재한다!
export default MyProfileScreen;
