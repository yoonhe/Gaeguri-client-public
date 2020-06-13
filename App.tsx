import React from 'react';

import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from 'apollo-boost';
import apolloClientOptions from './apollo';
import StatusBarComponent from './components/StatusBarComponent';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { NavigationContainer  } from '@react-navigation/native';

const client = new ApolloClient({
  ...apolloClientOptions,
});

function App(): React.ReactElement {
  return (
    <ApolloProvider client = {client}>
      <StatusBarComponent />
        <NavigationContainer>
          <BottomTabNavigation />
        </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
