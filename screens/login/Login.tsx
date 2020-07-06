import React, { useState, useCallback, useEffect } from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import { PageWrapStyle, PageWrapAlignCenterStyle } from '../../styles/common';
import AsyncStorage from '@react-native-community/async-storage';

import { useFormik } from 'formik';
import { gql } from 'apollo-boost';

const LOGIN = gql`
  mutation EmailLogin($Email: String!, $Password: String!) {
    EmailLogin(Email: $Email, Password: $Password) {
      ok
      error
      token
    }
  }
`;

function Login({ route, navigation }): React.ReactElement {
  const [value, setValue] = useState('');
  const [EmailLogin, { data, loading, error }] = useMutation(LOGIN);
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
          //console.log('data??????????', await AsyncStorage.getItem('token'));
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: '홈' }],
            }),
          );
        })
        .catch(error => {
          console.log('error', error);
        });

      //console.log('EmailLogin----------', data, error, loading);

      //console.log('navigation', navigation);
    },
  });

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
    </PageWrapAlignCenterStyle>
  );
}

export default Login;
