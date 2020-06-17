import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BorderButtonStyle } from '../styles/button';

type Props = {
  text: string;
  backgroundColor?: Boolean;
  onPress: () => void;
};

function BorderButton({ text, onPress, backgroundColor }: Props): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <BorderButtonStyle backgroundColor={backgroundColor}>{text}</BorderButtonStyle>
    </TouchableOpacity>
  );
}

export { BorderButton };
