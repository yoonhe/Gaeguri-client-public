import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import StatusBarComponent from './components/StatusBarComponent';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import BeforeLoginNavigation from './navigation/BeforeLoginNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './components/context';
import client from './apollo';
import AsyncStorage from '@react-native-community/async-storage';

function App(): React.ReactElement {
  const Stack = createStackNavigator();
  // const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(
    () => ({
      signIn: token => {
        console.log('token ? ', token);
        setUserToken(token);
      },
      signOut: () => {
        setUserToken(null);
      },
    }),
    [],
  );

  useLayoutEffect(() => {
    const getToken = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        console.error(e);
      }

      setUserToken(token);
    };

    getToken();
  }, [userToken]);

  return (
    <ApolloProvider client={client}>
      <StatusBarComponent />
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {userToken ? (
              <Stack.Screen name="Main" component={BottomTabNavigation} />
            ) : (
              <Stack.Screen name="Login" component={BeforeLoginNavigation} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
export default App;
