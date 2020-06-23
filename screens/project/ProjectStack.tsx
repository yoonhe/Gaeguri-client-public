import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Room from './room/Room';
import Drawer from './room/Drawer';
import ProjectSetting from './room/ProjectSetting';

const Project = createStackNavigator();

function ProjectScreen({ navigation, route }): React.ReactElement {
  const routeName: string = route.state ? route.state.routes[route.state.index].name : '';

  const tabBarInVisibleRouters: string[] = ['Room', 'Drawer', 'ProjectSetting'];

  if (tabBarInVisibleRouters.includes(routeName)) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
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
      <Project.Screen name='Drawer' component={Drawer} />
      <Project.Screen name='ProjectSetting' component={ProjectSetting} />
    </Project.Navigator>
  );
}

export default ProjectScreen;
