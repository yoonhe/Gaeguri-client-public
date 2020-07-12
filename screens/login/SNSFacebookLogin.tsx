import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { CommonActions } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const FACEBOOKLOGIN = gql`
  mutation FacebookLogin($Facebook_id: String!, $Username: String) {
    FacebookLogin(Facebook_id: $Facebook_id, Username: $Username) {
      ok
      error
      token
    }
  }
`;
const TOKEN_EMPTY = 'token has not fetched';

function SNSFacebookLogin({ navigation }): React.ReactElement {
  const [FacebookLogin, { data, loading, error }] = useMutation(FACEBOOKLOGIN);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(TOKEN_EMPTY);

  const logging = async (error, result) => {
    logCallback(`Login loading...`, setLoginLoading(true));
    if (error) {
      console.log('login has error: ', result.error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      const tokenFB = await AccessToken.getCurrentAccessToken();
      if (tokenFB) {
        setToken(tokenFB.accessToken);
        getPublicProfile();
        logCallback(`Login Finished:${JSON.stringify(tokenFB)}`, setLoginLoading(false));
        logCallback(`navigate Home...`, setIsLogin(true));
      }
    }
  };

  const getPublicProfile = async () => {
    const infoRequest = new GraphRequest('/me?fields=id,name,picture', null, (error, result) => {
      if (error) {
        console.log('Error fetching data: ', error.toString());
      } else {
        console.log(result);
        const profile: any = result;
        FacebookLogin({
          variables: {
            Facebook_id: profile.id,
            Username: profile.name,
          },
        })
          .then(async data => {
            const store = { token: data.data.FacebookLogin.token };
            await AsyncStorage.setItem('token', store.token);
            navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: '홈' }],
              }),
            );
          })
          .catch(error => {
            Alert.alert('error', error.toString());
            console.log('error', error);
          });
      }
    });
    new GraphRequestManager().addRequest(infoRequest).start();
  };
  return (
    <View>
      <LoginButton onLoginFinished={logging} />
    </View>
  );
}

export default SNSFacebookLogin;
