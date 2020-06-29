import React from 'react';
import { InputTitleStyle, FormBoxStyle, InputTextStyle } from '../styles/form';

type FormBoxProps = {
  title: string;
  values?: string;
  placeholder?: string | boolean;
  blurOnSubmit?: boolean;
  multiline?: boolean;
  text?: string;
  onChangeText?: () => void;
  onFocus?: () => void;
  children;
};

function FormBoxComponent({
  title,
  placeholder,
  blurOnSubmit,
  multiline,
  onChangeText,
  onFocus,
  values,
  children,
  ...props
}: FormBoxProps): React.ReactElement {
  return (
    <FormBoxStyle {...props}>
      {title && <InputTitleStyle>{title}</InputTitleStyle>}
      {children ? (
        children
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
