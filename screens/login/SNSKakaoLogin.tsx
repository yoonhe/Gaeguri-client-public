/* tslint:disable:ter-arrow-parens */
// tslint:disable:max-line-length
// tslint:disable:no-console
// tslint:disable:no-unused-expression
// tslint:disable:comment-format
// tslint:disable:no-shadowed-variable

import { gql } from 'apollo-boost';
import React, { useState, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';
import { BorderButton } from '../../components/ButtonComponent';
import { AuthContext } from '../../components/context';
import { Alert, View, Platform, StyleSheet, YellowBox } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import KakaoLogins from '@react-native-seoul/kakao-login';

if (!KakaoLogins) {
  console.error('KakaoLogins Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const TOKEN_EMPTY = 'token has not fetched';
const KAKAOLOGIN = gql`
  mutation KakaoLogin($Kakao_id: String!, $Username: String, $Profile_photo_path: String) {
    KakaoLogin(Kakao_id: $Kakao_id, Username: $Username, Profile_photo_path: $Profile_photo_path) {
      ok
      error
      token
    }
  }
`;

function SNSKakaoLogin({ navigation }): React.ReactElement {
  //const [value, setValue] = useState('');
  const [KakaoLogin, { data, loading, error }] = useMutation(KAKAOLOGIN);
  console.log('KakaoLogin----------', data, error, loading);
  const [loginLoading, setLoginLoading] = useState(false);
  const [token, setToken] = useState(TOKEN_EMPTY);
  const { signIn } = useContext(AuthContext);

  const kakaoLogin = async () => {
    try {
      logCallback('Login Start', setLoginLoading(true));
      const result = await KakaoLogins.login();
      if (result) {
        setToken(result.accessToken);
        logCallback(`Login Finished:${JSON.stringify(result)}`, setLoginLoading(false));
        const profile = await KakaoLogins.getProfile();
        if (profile) {
          console.log('userProfile-----------', profile); // 카카오 톡 Id와 닉네임을 받아온다.
          KakaoLogin({
            variables: {
              Kakao_id: profile.id,
              Username: profile.nickname,
              Profile_photo_path: profile.profile_image_url,
            },
          })
            .then(async data => {
              const store = { token: data.data.KakaoLogin.token };
              await AsyncStorage.setItem('token', store.token);
              signIn(await AsyncStorage.getItem('token'));
            })
            .catch(error => {
              Alert.alert('error', error.toString());
              console.log('error', error);
            });
        }
      }
    } catch (error) {
      if (error.code === 'E_CANCELLED_OPERATION') {
        Alert.alert('error', error.toString());
        logCallback(`Login Cancelled:${error.message}`, setLoginLoading(false));
      } else {
        logCallback(`Login Failed:${error.code} ${error.message}`, setLoginLoading(false));
      }
    }
  };
  return (
    <View>
      <BorderButton onPress={kakaoLogin}>Kakaotalk Login</BorderButton>
    </View>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 0 : 24,
    paddingTop: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: 'white',
  },
  content: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnKakaoLogin: {
    height: 48,
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#F8E71C',
    color: '#3C1E1E',
    fontWeight: 'bold',
    borderRadius: 0,
    borderWidth: 0,
  },
  txtKakaoLogin: {
    fontSize: 16,
    color: '#3d3d3d',
  },
});

YellowBox.ignoreWarnings(['source.uri']); */

export default SNSKakaoLogin;
