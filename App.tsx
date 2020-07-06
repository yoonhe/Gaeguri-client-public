import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import apolloClientOptions from './apollo';
import StatusBarComponent from './components/StatusBarComponent';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
const cache = new InMemoryCache();

const client = new ApolloClient({
  ...apolloClientOptions,
  cache,
  credentials: 'same-origin',
  request: async operation => {
    const token = await AsyncStorage.getItem('token');
    operation.setContext({
      headers: token
        ? {
            'X-JWT': `${token}`,
          }
        : {},
    });
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

function App(): React.ReactElement {
  return (
    <ApolloProvider client={client}>
      <StatusBarComponent />
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </ApolloProvider>
  );
}
export default App;
