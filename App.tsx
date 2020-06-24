import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import apolloClientOptions from './apollo';
import StatusBarComponent from './components/StatusBarComponent';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { NavigationContainer } from '@react-navigation/native';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  ...apolloClientOptions,
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
