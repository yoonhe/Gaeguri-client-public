import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { InputCountWrapStyle, InputCountStyle, InputCountButtonStyle } from '../styles/form';

function CountInputComponent(): React.ReactElement {
  const [count, setCount] = useState('1');
  let NumCount: number = Number(count);

  const countPlusMinusButtonHandler = useCallback(
    (mode: string): void => {
      mode === 'plus' ? setCount(String((NumCount += 1))) : setCount(String((NumCount -= 1)));
    },
    [count],
  );

  return (
    <InputCountWrapStyle>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={NumCount <= 1}
        onPress={countPlusMinusButtonHandler.bind(null, 'minus')}
      >
        <InputCountButtonStyle>-</InputCountButtonStyle>
      </TouchableOpacity>
      <InputCountStyle
        type="number"
        value={count}
        onChangeText={text => setCount(text)}
        maxLength={1}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={NumCount > 9}
        onPress={countPlusMinusButtonHandler.bind(null, 'plus')}
      >
        <InputCountButtonStyle>+</InputCountButtonStyle>
      </TouchableOpacity>
    </InputCountWrapStyle>
  );
}

export default CountInputComponent;
