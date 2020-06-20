import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BorderButtonStyle } from '../styles/button';
import { TagTextButtonStyle } from '../styles/tag';

interface BorderButtonProps {
  text: string;
  radius?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  marginRight?: string;
  backgroundColor?: Boolean;
  onPress: () => void;
}

export function BorderButton({
  text,
  onPress,
  backgroundColor,
  radius,
  width,
  height,
  marginTop,
  marginRight,
}: BorderButtonProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <BorderButtonStyle
        marginTop={marginTop}
        marginRight={marginRight}
        height={height}
        width={width}
        radius={radius}
        backgroundColor={backgroundColor}
      >
        {text}
      </BorderButtonStyle>
    </TouchableOpacity>
  );
}

export function TextButton({ text, onPress }: BorderButtonProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <TagTextButtonStyle>{text}</TagTextButtonStyle>
    </TouchableOpacity>
  );
}
