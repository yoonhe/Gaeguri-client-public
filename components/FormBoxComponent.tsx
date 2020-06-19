import React from 'react';
import { InputTitleStyle, FormBoxStyle, InputTextStyle } from '../styles/form';

type FormBoxProps = {
  title: string;
  values: string;
  propjectName: string;
  placeholder: string;
  blurOnSubmit?: boolean;
  multiline?: boolean;
  handleChange: () => string;
  onBlur: () => void;
};

function FormBox({
  title,
  placeholder,
  blurOnSubmit,
  multiline,
  handleChange,
  values,
  onBlur,
}: FormBoxProps): React.ReactElement {
  console.log('values? ', values);
  return (
    <FormBoxStyle>
      <InputTitleStyle>{title}</InputTitleStyle>
      <InputTextStyle
        placeholder={placeholder}
        blurOnSubmit={blurOnSubmit}
        multiline={multiline}
        value={values}
        onChangeText={handleChange}
        onBlur={onBlur}
      />
    </FormBoxStyle>
  );
}

export default FormBox;
