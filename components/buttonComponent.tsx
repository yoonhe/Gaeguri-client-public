import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BorderButtonStyle } from '../styles/button';

export const BorderButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <BorderButtonStyle>{text}</BorderButtonStyle>
    </TouchableOpacity>
  );
};
