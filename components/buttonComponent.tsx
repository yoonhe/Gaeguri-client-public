import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BorderButtonStyle } from '../styles/button';

export const BorderButton = ({ text, onPress }) => {
  // activeOpacity => 버튼을 눌렀을 때에 투명도가 0.7이 되었다 다시 1로 돌아오게해줌
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <BorderButtonStyle>{text}</BorderButtonStyle>
    </TouchableOpacity>
  );
};
