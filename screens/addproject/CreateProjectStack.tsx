import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateProject from './CreateProject';

const CreateProjectStack = createStackNavigator();

function AddProjectScreen({ navigation, route }) {
  return (
    <CreateProjectStack.Navigator>
      <CreateProjectStack.Screen name="프로젝트 만들기" component={CreateProject} />
    </CreateProjectStack.Navigator>
  );
}
// 각 탭 내에 stack navigation이 존재한다!

export default AddProjectScreen;
