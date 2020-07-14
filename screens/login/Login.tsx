import React, { useState, useContext, useCallback } from 'react';
import { Alert, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import {
  PageWrapAlignCenterStyle,
  TextSubTitleStyle,
  TextLinkStyle,
  TextLinkStyleFlatColor,
} from '../../styles/common';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components/context';

import { useFormik } from 'formik';
import { gql } from 'apollo-boost';
import SNSFacebookLogin from './SNSFacebookLogin';
import SNSKakaoLogin from './SNSKakaoLogin';

const LOGIN = gql`
  mutation EmailLogin($Email: String!, $Password: String!) {
    EmailLogin(Email: $Email, Password: $Password) {
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

function Login({ route, navigation }): React.ReactElement {
  const [value, setValue] = useState('');
  const [EmailLogin, { data, loading, error }] = useMutation(LOGIN);
  const { signIn } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit(values) {
      const { email, password } = values;

      if (!email) {
        return Alert.alert('이메일을 입력하세요', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        return Alert.alert('이메일을 형식을 확인해주세요', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }

      if (!password) {
        return Alert.alert('패스워드를 입력하세요', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
      //console.log('email----------', email);
      //console.log('password------------', password);
      EmailLogin({
        variables: {
          Email: email,
          Password: password,
        },
      })
        .then(async data => {
          const store = { token: data.data.EmailLogin.token };
          await AsyncStorage.setItem('token', store.token);
          signIn(await AsyncStorage.getItem('token'));
          useQuery(GET_MYPROFILE);
          // console.log('data??????????', await AsyncStorage.getItem('token'));
        })
        .catch(error => {
          console.log('error', error);
        });

      //console.log('EmailLogin----------', data, error, loading);

      //console.log('navigation', navigation);
    },
  });

  const gotoSignup = useCallback(() => {
    navigation.navigate('Signup');
  }, []);

  return (
    <PageWrapAlignCenterStyle>
      <View>
        <FormBoxComponent
          title="Email"
          name="email"
          placeholder="Email"
          onChangeText={formik.handleChange('email')}
        />
        <FormBoxComponent
          secureTextEntry
          title="Password"
          name="password"
          placeholder="Password"
          onChangeText={formik.handleChange('password')}
        />
        <BorderButton onPress={formik.handleSubmit}>Login</BorderButton>
      </View>
      <SNSFacebookLogin />
      <SNSKakaoLogin />
      <View>
        <TextLinkStyleFlatColor>
          아직 계정이 없으신가요.
          <TextLinkStyle onPress={gotoSignup}>회원가입</TextLinkStyle>
        </TextLinkStyleFlatColor>
      </View>
    </PageWrapAlignCenterStyle>
  );
}

export default Login;
