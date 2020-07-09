import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateProjectStack from '../screens/addproject/CreateProjectStack';
import ShowOffScreen from '../screens/showoff/ShowOff';
import MyProfileStack from '../screens/myprofile/MyProfileStack'; // 이름수정
import ProjectStack from '../screens/project/ProjectStack';
import HomeScreen from '../screens/home/Home';
import Login from '../screens/login/Login';
import SignupStack from '../screens/signup/Signup';

//아이콘 찾기 https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Color } from '../styles/common';

function BottomTabNavigation(): React.ReactElement {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="홈"
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
          const colors = focused ? `${Color.G300}` : `${Color.N400}`;
          return <Icon name={icons[route.name]} size={26} color={colors} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: `${Color.G300}`,
        inactiveTintColor: `${Color.N400}`,
      }}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="프로젝트" component={ProjectStack} />
      <Tab.Screen name="만들기" component={CreateProjectStack} />
      <Tab.Screen name="마이" component={MyProfileStack} />
      {/* <Tab.Screen name="로그인" component={Login} />
      <Tab.Screen name="Signup" component={SignupStack} />
      <Tab.Screen name="자랑하기" component={ShowOffScreen} /> */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
