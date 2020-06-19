import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BorderButtonStyle } from '../styles/button';

type Props = {
  text: string;
  radius?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  marginRight?: string;
  backgroundColor?: Boolean;
  onPress: () => void;
};

function BorderButton({
  text,
  onPress,
  backgroundColor,
  radius,
  width,
  height,
  marginTop,
  marginRight,
}: Props): React.ReactElement {
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

export { BorderButton };
