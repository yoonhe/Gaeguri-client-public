import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { InputCountWrap, InputCount, InputCountButton } from '../styles/form';

function CountInputComponent(): React.ReactElement {
  const [count, setCount] = useState('1');
  let NumCount: number = Number(count);

  const countPlusMinusButtonHandler = useCallback(
    (mode: string): void => {
      mode === 'plus' ? setCount(String((NumCount += 1))) : setCount(String((NumCount -= 1)));
    },
    [count],
  );
  console.log('NumCount ? ', NumCount);
  return (
    <InputCountWrap>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={NumCount <= 1}
        onPress={countPlusMinusButtonHandler.bind(null, 'minus')}
      >
        <InputCountButton>-</InputCountButton>
      </TouchableOpacity>
      <InputCount type="number" value={count} onChangeText={text => setCount(text)} maxLength={1} />
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={NumCount > 9}
        onPress={countPlusMinusButtonHandler.bind(null, 'plus')}
      >
        <InputCountButton>+</InputCountButton>
      </TouchableOpacity>
    </InputCountWrap>
  );
}

export default CountInputComponent;
