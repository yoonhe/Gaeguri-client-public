import React, { useState, useCallback } from 'react';
import { PageWrapStyleVer2 } from '../../styles/common';
import FormBoxComponent from '../../components/FormBoxComponent';
import { BorderButton } from '../../components/ButtonComponent';

function ChoosePosition({ navigation }): React.ReactElement {
  const [position, setPosition] = useState('');
  const nextPageButtonHandler = useCallback(() => {
    position !== '' && navigation.navigate('프로젝트 만들기', { position });
  }, [position]);

  return (
    <PageWrapStyleVer2>
      <FormBoxComponent
        value={position}
        onChangeText={text => setPosition(text)}
        placeholder="포지션을 입력해주세요"
      />
      <BorderButton onPress={nextPageButtonHandler} text="다음" />
    </PageWrapStyleVer2>
  );
}

export default ChoosePosition;
