import React from 'react';
import ProjectScreen from '../screens/Project/Project';
import HomeScreen from '../screens/Home/Home';
import AddProjectScreen from '../screens/AddProject/AddProject';
import ShowOffScreen from '../screens/ShowOff/ShowOff';
import MyProfileScreen from '../screens/MyProfile/MyProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function BottomTabNavigation() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name='홈' component={HomeScreen} />
      <Tab.Screen name='프로젝트' component={ProjectScreen} />
      <Tab.Screen name='만들기' component={AddProjectScreen} />
      <Tab.Screen name='자랑하기' component={ShowOffScreen} />
      <Tab.Screen name='마이' component={MyProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
