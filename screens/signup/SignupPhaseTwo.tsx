import React, { useState, useCallback } from 'react';
import { Alert, View } from 'react-native';
import { PageWrapAlignCenterStyle } from '../../styles/common';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
//email, password, username, position, stack, about me
//<Text title="About me" name="aboutme" placeholder="About me" />

function SignupPhaseTwo({ navigation, route }): React.ReactElement {
  const [username, setUsername] = useState('');
  const [aboutme, setAboutme] = useState('');

  const nextPageButtonHandler = useCallback(() => {
    const data = {
      Email: route.params.email,
      Password: route.params.password,
      Username: username,
      AboutMe: aboutme,
    };
    console.log(data);
    if (username !== '') {
      navigation.navigate('SignupPhaseThree', { data });
    } else {
      return Alert.alert('이름을 입력하세요', '', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  }, [username, aboutme]);
  return (
    <PageWrapAlignCenterStyle>
      <View>
        <FormBoxComponent
          title="Name"
          name="username"
          placeholder="이름을 입력해주세요"
          onChangeText={text => setUsername(text)}
        />
        <FormBoxComponent
          multiline
          title="About Me"
          name="aboutme"
          placeholder="자기소개를 입력해주세요"
          numberOfLines={10}
          onChangeText={text => setAboutme(text)}
        />
        <BorderButton onPress={nextPageButtonHandler}>Next</BorderButton>
      </View>
    </PageWrapAlignCenterStyle>
  );
}

export default SignupPhaseTwo;
