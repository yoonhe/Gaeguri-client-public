import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from 'apollo-boost';
import apolloClientOptions from './apollo';

const client = new ApolloClient({
  ...apolloClientOptions,
});

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
  <ApolloProvider client = {client}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>

  );
}

export default App;
