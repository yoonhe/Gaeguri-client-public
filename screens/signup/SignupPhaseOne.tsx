import React from 'react';
import { Alert, View } from 'react-native';
import { PageWrapAlignCenterStyle } from '../../styles/common';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import { useFormik } from 'formik';
//email, password, username, position, stack, about me

function SignupPhaseOne({ navigation }): React.ReactElement {
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

      //console.log('EmailLogin----------', data, error, loading);

      //console.log('navigation', navigation);
      if (email && password) {
        navigation.navigate('SignupPhaseTwo', { email, password });
      }
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
        <BorderButton onPress={formik.handleSubmit}>Next</BorderButton>
      </View>
    </PageWrapAlignCenterStyle>
  );
}

export default SignupPhaseOne;