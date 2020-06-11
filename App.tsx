import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from 'apollo-boost';
import apolloClientOptions from './apollo';
import ProjectScreen from './screens/Project';
import HomeScreen from './screens/Home';
import AddProjectScreen from './screens/AddProject';
import ShowOffScreen from './screens/ShowOff';
import MyProfileScreen from './screens/MyProfile';

const client = new ApolloClient({
  ...apolloClientOptions,
});

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
  <ApolloProvider client = {client}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='홈' component={HomeScreen} />
        <Tab.Screen name='프로젝트' component={ProjectScreen} />
        <Tab.Screen name='만들기' component={AddProjectScreen} />
        <Tab.Screen name='자랑하기' component={ShowOffScreen} />
        <Tab.Screen name='마이' component={MyProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  </ApolloProvider>
  );
}

export default App;
