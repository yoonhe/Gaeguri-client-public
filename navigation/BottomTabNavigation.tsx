import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateProjectStack from '../screens/addproject/CreateProjectStack';
import ShowOffScreen from '../screens/showoff/ShowOff';
import MyProfileScreen from '../screens/myprofile/MyProfile';
import ProjectStack from '../screens/project/ProjectStack';
import HomeScreen from '../screens/home/Home';

function BottomTabNavigation(): React.ReactElement {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="프로젝트" component={ProjectStack} />
      <Tab.Screen name="만들기" component={CreateProjectStack} />
      <Tab.Screen name="자랑하기" component={ShowOffScreen} />
      <Tab.Screen name="마이" component={MyProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
