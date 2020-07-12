import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { AccessToken, GraphRequest, LoginManager, GraphRequestManager } from 'react-native-fbsdk';
import { BorderButton } from '../../components/ButtonComponent';
import { CommonActions } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/react-hooks';
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

const GET_MYPROFILE = gql`
  query {
    GetMyProfile {
      ok
      error
      user {
        User_id
        Username
        Profile_photo_path
        AboutMe
        userstack {
          stack {
            Stack_id
            Stack_name
          }
        }
        Email
      }
    }
  }
`;

const TOKEN_EMPTY = 'token has not fetched';

function SNSFacebookLogin({ navigation }): React.ReactElement {
  const [FacebookLogin, { data, loading, error }] = useMutation(FACEBOOKLOGIN);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(TOKEN_EMPTY);

  const logging = async () => {
    const fblogin = await LoginManager.logInWithPermissions(['email']);
    if (fblogin) {
      const tokenFB = await AccessToken.getCurrentAccessToken();
      if (tokenFB) {
        setToken(tokenFB.accessToken);
        getPublicProfile();
        useQuery(GET_MYPROFILE);
        logCallback(`Login Finished:${JSON.stringify(tokenFB)}`, setLoginLoading(false));
        logCallback(`navigate Home...`, setIsLogin(true));
      }
    } else {
      logCallback('Login fail with error: ', setIsLogin(false));
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
      <BorderButton onPress={logging}>페이스북로그인</BorderButton>
    </View>
  );
}

export default SNSFacebookLogin;
