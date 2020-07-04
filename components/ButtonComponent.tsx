import React from 'react';
import { TouchableOpacity, Button } from 'react-native';
import {
  ButtonBox,
  BorderButtonStyle,
  InputButtonStyle,
  CircleButtonStyle,
  ButtonText,
} from '../styles/button';
import { TagTextButtonStyle, TagTextTouchStyle } from '../styles/tag';

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
    <ButtonBox {...props} onPress={onPress} activeOpacity={0.8}>
      <BorderButtonStyle {...props}>{children}</BorderButtonStyle>
    </ButtonBox>
  );
}

export function TextButton({ children, onPress }: BorderButtonProps): React.ReactElement {
  return (
    <TagTextButtonStyle onPress={onPress} activeOpacity={0.8}>
      <ButtonText>{children}</ButtonText>
    </TagTextButtonStyle>
  );
}

export function InputButton({ children, onPress, ...props }): React.ReactElement {
  return (
    <ButtonBox {...props} onPress={onPress} activeOpacity={0.8}>
      <InputButtonStyle {...props}>{children}</InputButtonStyle>
    </ButtonBox>
  );
}

export function CircleButton({ children, onPress }): React.ReactElement {
  return (
    <ButtonBox onPress={onPress} activeOpacity={0.8}>
      <CircleButtonStyle>{children}</CircleButtonStyle>
    </ButtonBox>
  );
}
