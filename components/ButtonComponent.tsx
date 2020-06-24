import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BorderButtonStyle, InputButtonStyle, CircleButtonStyle } from '../styles/button';
import { TagTextButtonStyle } from '../styles/tag';

interface BorderButtonProps {
  children: string;
  onPress: () => void;
}

export function BorderButton({
  children,
  onPress,
  ...props
}: BorderButtonProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <BorderButtonStyle {...props}>{children}</BorderButtonStyle>
    </TouchableOpacity>
  );
}

export function TextButton({ children, onPress }: BorderButtonProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <TagTextButtonStyle>{children}</TagTextButtonStyle>
    </TouchableOpacity>
  );
}

export function InputButton({ children, onPress, ...props }): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <InputButtonStyle {...props}>{children}</InputButtonStyle>
    </TouchableOpacity>
  );
}

export function CircleButton({ children, onPress }): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <CircleButtonStyle>{children}</CircleButtonStyle>
    </TouchableOpacity>
  );
}
