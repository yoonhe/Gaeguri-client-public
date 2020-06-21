import React from 'react';
import { InputTitleStyle, FormBoxStyle, InputTextStyle } from '../styles/form';
import { InputButton } from './ButtonComponent';

type FormBoxProps = {
  title: string;
  values?: string;
  placeholder?: string | boolean;
  blurOnSubmit?: boolean;
  multiline?: boolean;
  isButton?: boolean;
  text?: string;
  onPress?: () => void;
  onChangeText?: () => void;
  onFocus?: () => void;
};

function FormBoxComponent({
  title,
  placeholder,
  blurOnSubmit,
  multiline,
  onChangeText,
  onFocus,
  values,
  isButton,
  text,
  onPress,
}: FormBoxProps): React.ReactElement {
  return (
    <FormBoxStyle>
      {title && <InputTitleStyle>{title}</InputTitleStyle>}
      {isButton ? (
        <InputButton text={text} onPress={onPress} placeholder={placeholder} />
      ) : (
        <InputTextStyle
          placeholder={placeholder}
          blurOnSubmit={blurOnSubmit}
          multiline={multiline}
          value={values}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
      )}
    </FormBoxStyle>
  );
}

export default FormBoxComponent;
