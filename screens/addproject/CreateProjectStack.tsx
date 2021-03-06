import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateProject from './CreateProject';
import ChoosePosition from './ChoosePosition';
const CreateProjectStack = createStackNavigator();

function AddProjectScreen(): React.ReactElement {
  return (
    <CreateProjectStack.Navigator>
      <CreateProjectStack.Screen name="포지션 선택하기" component={ChoosePosition} />
      <CreateProjectStack.Screen name="프로젝트 만들기" component={CreateProject} />
    </CreateProjectStack.Navigator>
  );
}
// 각 탭 내에 stack navigation이 존재한다!

export default AddProjectScreen;
