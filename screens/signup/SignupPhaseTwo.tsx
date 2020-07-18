import React, { useState, useCallback } from 'react';
import { Alert, View, Button, TouchableOpacity } from 'react-native';
import { PageWrapAlignCenterStyle, ProfileMediumStyle } from '../../styles/common';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import ImagePicker from 'react-native-image-picker';
import { BorderButtonSignupStyle } from '../../styles/button';

//email, password, username, position, stack, about me
//<Text title="About me" name="aboutme" placeholder="About me" />

function SignupPhaseTwo({ navigation, route }): React.ReactElement {
  const [username, setUsername] = useState('');
  const [aboutme, setAboutme] = useState('');
  const [avatarSource, setAvatarSource] = useState('');
  const [imgFile, setImgFile] = useState({});

  const nextPageButtonHandler = useCallback(() => {
    const data = {
      Email: route.params.email,
      Password: route.params.password,
      Username: username,
      AboutMe: aboutme,
    };
    //console.log('-------------phasw two data?', data);
    //console.log('-------------phasw two avatartsource', imgFile);
    if (username !== '') {
      navigation.navigate('SignupPhaseThree', { data, avatarSource, imgFile });
    } else {
      return Alert.alert('이름을 입력하세요', '', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  }, [username, aboutme, avatarSource, imgFile]);

  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    title: '프로필 이미지',
    customButtons: [{ name: 'delete', title: '이미지 삭제하기' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const SelectPhotoTapped = useCallback(() => {
    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setAvatarSource('');
      } else {
        const source = { uri: response.uri };
        // console.log('response.uri ?? ', response.uri);
        //console.log('avatarSource ?? ', avatarSource);
        //console.log('source??????', source);
        setAvatarSource(source);
        setImgFile({
          ...response,
        });
      }
    });
  }, [imgFile, avatarSource]);

  return (
    <PageWrapAlignCenterStyle>
      <View>
        <TouchableOpacity onPress={SelectPhotoTapped}>
          <ProfileMediumStyle uri={avatarSource} />
        </TouchableOpacity>
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
        <BorderButtonSignupStyle onPress={nextPageButtonHandler}>Next</BorderButtonSignupStyle>
      </View>
    </PageWrapAlignCenterStyle>
  );
}

export default SignupPhaseTwo;
