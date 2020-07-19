import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from './MyProfile';
import EditMyProfile from './EditMyProfile';
import UserProfile from './UserProfile';

const MyProfileStack = createStackNavigator();

function MyProfileScreen({ navigation, route }): React.ReactElement {
  const routeName: string = route.state ? route.state.routes[route.state.index].name : '';

  const tabBarInVisibleRouters: string[] = ['MyProfile', '프로필 편집', 'UserProfile'];

  if (tabBarInVisibleRouters.includes(routeName)) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  // if (route.state) {
  //   navigation.setOptions({ tabBarVisible: route.state.index > 0 ? false : true });
  // }

  return (
    <MyProfileStack.Navigator initialRouteName="마이 페이지">
      <MyProfileStack.Screen name="마이 페이지" component={MyProfile} />
      <MyProfileStack.Screen name="프로필 편집" component={EditMyProfile} />
      <MyProfileStack.Screen name="유저 프로필" component={UserProfile} />
    </MyProfileStack.Navigator>
  );
}
// 각 탭 내에 stack navigation이 존재한다!
export default MyProfileScreen;
