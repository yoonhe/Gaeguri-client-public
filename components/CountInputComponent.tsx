import React from 'react';
import { TouchableOpacity } from 'react-native';
import { InputCountWrapStyle, InputCountStyle, InputCountButtonStyle } from '../styles/form';

function CountInputComponent({ count, countPlusMinusButtonHandler, index }): React.ReactElement {
  return (
    <InputCountWrapStyle>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={count <= 1}
        onPress={countPlusMinusButtonHandler.bind(null, 'minus', index)}
      >
        <InputCountButtonStyle>-</InputCountButtonStyle>
      </TouchableOpacity>
      <InputCountStyle type="number" value={`${count}`} editable={false} />
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={count > 6}
        onPress={countPlusMinusButtonHandler.bind(null, 'plus', index)}
      >
        <InputCountButtonStyle>+</InputCountButtonStyle>
      </TouchableOpacity>
    </InputCountWrapStyle>
  );
}

export default CountInputComponent;
