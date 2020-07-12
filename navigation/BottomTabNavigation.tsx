import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateProjectStack from '../screens/addproject/CreateProjectStack';
import AsyncStorage from '@react-native-community/async-storage';
import MyProfileStack from '../screens/myprofile/MyProfileStack'; // 이름수정
import BeforeLoginNavigation from './BeforeLoginNavigation';
import ProjectStack from '../screens/project/ProjectStack';
import HomeScreen from '../screens/home/Home';
import { BorderButton } from '../components/ButtonComponent';

//아이콘 찾기 https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Color } from '../styles/common';

function BottomTabNavigation(): React.ReactElement {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="로그인"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            // 홈: focused ? 'home-variant' : 'home-variant-outline',
            // 프로젝트: focused ? 'view-grid' : 'view-grid-outline',
            // 만들기: focused ? 'plus-circle' : 'plus-circle-outline',
            // 마이: focused ? 'clipboard-account' : 'clipboard-account-outline',
            홈: 'home',
            프로젝트: 'apps',
            만들기: 'edit',
            마이: 'person',
          };
          const colors = focused ? `${Color.G300}` : `${Color.N300}`;
          return <Icon name={icons[route.name]} size={26} color={colors} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: `${Color.G300}`,
        inactiveTintColor: `${Color.N300}`,
      }}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="프로젝트" component={ProjectStack} />
      <Tab.Screen name="만들기" component={CreateProjectStack} />
      <Tab.Screen name="마이" component={MyProfileStack} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
