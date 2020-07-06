import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import StatusBarComponent from './components/StatusBarComponent';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import client from './apollo';

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
