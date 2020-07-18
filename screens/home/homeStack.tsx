import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyAlramList from './myAlarmList';
import HomeScreen from './Home';
import Room from '../project/room/Room';
import Drawer from '../project/room/Drawer';
import ProjectSetting from '../project/room/ProjectSetting';

function HomeScreenStack({ navigation, route }): React.ReactElement {
  const Home = createStackNavigator();

  const routeName: string = route.state ? route.state.routes[route.state.index].name : '';
  const tabBarInVisibleRouters: string[] = ['MyAlramList'];

  if (tabBarInVisibleRouters.includes(routeName)) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <Home.Navigator initialRouteName="home">
      <Home.Screen name="home" component={HomeScreen} />
      <Home.Screen name="MyAlramList" component={MyAlramList} />
      <Home.Screen name="Room" component={Room} />
      <Home.Screen name="Drawer" component={Drawer} />
      <Home.Screen name="ProjectSetting" component={ProjectSetting} />
    </Home.Navigator>
  );
}

export default HomeScreenStack;
