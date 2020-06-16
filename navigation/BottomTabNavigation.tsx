import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddProjectScreen from '../screens/addproject/AddProject';
import ShowOffScreen from '../screens/showoff/ShowOff';
import MyProfileScreen from '../screens/myprofile/MyProfile';
import ProjectScreen from '../screens/project/ProjectStack';
import HomeScreen from '../screens/home/Home';

function BottomTabNavigation(): React.ReactElement {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName='홈'>
      <Tab.Screen name='홈' component={HomeScreen} />
      <Tab.Screen name='프로젝트' component={ProjectScreen} />
      <Tab.Screen name='만들기' component={AddProjectScreen} />
      <Tab.Screen name='자랑하기' component={ShowOffScreen} />
      <Tab.Screen name='마이' component={MyProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
