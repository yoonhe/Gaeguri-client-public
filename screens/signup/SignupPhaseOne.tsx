import React from 'react';
import { Alert, View } from 'react-native';
import {
  PageWrapWhiteStyle,
  PageWrapAlignCenterStyle,
  SignupTextStyle,
  TextSubTitleStyle,
  TextLinkStyleFlatColor,
} from '../../styles/common';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import { useFormik } from 'formik';
import { BorderButtonSignupStyle } from '../../styles/button';
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
        <SignupTextStyle>안녕하세요, </SignupTextStyle>
        <SignupTextStyle>개구리에 오신 것을 환영합니다.</SignupTextStyle>
        <TextLinkStyleFlatColor></TextLinkStyleFlatColor>
        <SignupTextStyle>먼저 사용하실 이메일 주소와 </SignupTextStyle>
        <SignupTextStyle>비밀번호를 입력해주세요. </SignupTextStyle>
        <TextLinkStyleFlatColor></TextLinkStyleFlatColor>
      </View>
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
        <BorderButtonSignupStyle onPress={formik.handleSubmit}>Next</BorderButtonSignupStyle>
      </View>
    </PageWrapAlignCenterStyle>
  );
}

export default SignupPhaseOne;
