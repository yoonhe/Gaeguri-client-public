import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { InputCountWrap, InputCount, InputCountButton } from '../styles/form';

function CountInput(): React.ReactElement {
  const [count, setCount] = useState('1');
  let NumCount = Number(count);

  const countPlusMinusButtonHandler = useCallback(
    mode => {
      mode === 'plus' ? setCount(String((NumCount += 1))) : setCount(String((NumCount -= 1)));
    },
    [count],
  );

  return (
    <InputCountWrap>
      <TouchableOpacity
        disabled={NumCount <= 1}
        onPress={countPlusMinusButtonHandler.bind(null, 'minus')}
      >
        <InputCountButton>-</InputCountButton>
      </TouchableOpacity>
      <InputCount type="number" value={count} onChangeText={text => setCount(text)} maxLength={1} />
      <TouchableOpacity
        disabled={NumCount > 9}
        onPress={countPlusMinusButtonHandler.bind(null, 'plus')}
      >
        <InputCountButton>+</InputCountButton>
      </TouchableOpacity>
    </InputCountWrap>
  );
}

export default CountInput;
