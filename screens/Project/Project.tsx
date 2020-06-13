import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Room from './Room/Room';
import Main from './Main';

const Project = createStackNavigator();

function ProjectScreen(): React.ReactElement {
  return (
    <Project.Navigator>
      <Project.Screen name='Main' component={Main} />
      <Project.Screen name='Room' component={Room} />
    </Project.Navigator>
  );
}

export default ProjectScreen;
