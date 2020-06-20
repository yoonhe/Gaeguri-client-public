import React from 'react';
import { TouchableOpacity } from 'react-native';
import { InputCountWrapStyle, InputCountStyle, InputCountButtonStyle } from '../styles/form';

function CountInputComponent({
  count,
  setCount,
  countPlusMinusButtonHandler,
  ref,
}): React.ReactElement {
  return (
    <InputCountWrapStyle>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={count <= 1}
        onPress={countPlusMinusButtonHandler.bind(null, 'minus')}
      >
        <InputCountButtonStyle>-</InputCountButtonStyle>
      </TouchableOpacity>
      <InputCountStyle
        type="number"
        value={count}
        onChangeText={text => setCount(text)}
        maxLength={1}
        ref={ref}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={count > 6}
        onPress={countPlusMinusButtonHandler.bind(null, 'plus')}
      >
        <InputCountButtonStyle>+</InputCountButtonStyle>
      </TouchableOpacity>
    </InputCountWrapStyle>
  );
}

export default CountInputComponent;
