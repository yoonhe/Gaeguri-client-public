import React from 'react';
import { InputTitleStyle, FormBoxStyle, InputTextStyle } from '../styles/form';

type FormBoxProps = {
  title: string;
  values?: string;
  placeholder: string;
  blurOnSubmit: boolean;
  multiline: boolean;
  onChangeText: () => void;
};

function FormBoxComponent({
  title,
  placeholder,
  blurOnSubmit,
  multiline,
  onChangeText,
  values,
}: FormBoxProps): React.ReactElement {
  console.log('values? ', values);
  return (
    <FormBoxStyle>
      {title && <InputTitleStyle>{title}</InputTitleStyle>}
      <InputTextStyle
        placeholder={placeholder}
        blurOnSubmit={blurOnSubmit}
        multiline={multiline}
        value={values}
        onChangeText={onChangeText}
      />
    </FormBoxStyle>
  );
}

export default FormBoxComponent;
