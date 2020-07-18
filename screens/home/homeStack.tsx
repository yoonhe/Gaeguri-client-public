import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyAlramList from './myAlarmList';
import HomeScreen from './Home';

function HomeScreenStack({ navigation }): React.ReactElement {
  const Home = createStackNavigator();
  navigation.setOptions({ tabBarVisible: false });
  return (
    <Home.Navigator>
      <Home.Screen name="home" component={HomeScreen} />
      <Home.Screen name="MyAlramList" component={MyAlramList} />
    </Home.Navigator>
  );
}

export default HomeScreenStack;
