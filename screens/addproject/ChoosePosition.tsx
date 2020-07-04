import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { PageWrapAlignCenterStyle } from '../../styles/common';
import FormBoxComponent from '../../components/FormBoxComponent';
import { BorderButton } from '../../components/ButtonComponent';

function ChoosePosition({ navigation }): React.ReactElement {
  const [position, setPosition] = useState('');
  const nextPageButtonHandler = useCallback(() => {
    position !== '' && navigation.navigate('프로젝트 만들기', { position });
  }, [position]);

  return (
    <PageWrapAlignCenterStyle>
      <View>
        <FormBoxComponent
          value={position}
          onChangeText={text => setPosition(text)}
          placeholder="포지션을 입력해주세요"
        />
        <BorderButton onPress={nextPageButtonHandler}>다음</BorderButton>
      </View>
    </PageWrapAlignCenterStyle>
  );
}

export default ChoosePosition;
