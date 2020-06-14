import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Room from './room/Room';
import RoomHeaderButton from '../../components/project/RoomRightHeaderToggle';

const Project = createStackNavigator();

function ProjectScreen({ navigation, route }): React.ReactElement {
  const routeName: string = route.state ? route.state.routes[route.state.index].name : '';

  const tabBarVisibleRouters: string[] = ['Main'];

  if (tabBarVisibleRouters.includes(routeName)) {
    navigation.setOptions({ tabBarVisible: true });
  } else {
    navigation.setOptions({ tabBarVisible: false });
  }

  return (
    <Project.Navigator initialRouteName='Main'>
      <Project.Screen
        name='Main'
        component={Main}
        options={{
          title: '',
        }}
      />
      <Project.Screen name='Room' component={Room} />
    </Project.Navigator>
  );
}

export default ProjectScreen;
