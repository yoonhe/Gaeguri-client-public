import React from 'react';
import { InputTitleStyle, FormBoxStyle, InputTextStyle } from '../styles/form';

type FormBoxProps = {
  title: string;
  placeholder: string;
  blurOnSubmit?: boolean;
  multiline?: boolean;
};

function FormBox({
  title,
  placeholder,
  blurOnSubmit,
  multiline,
}: FormBoxProps): React.ReactElement {
  return (
    <FormBoxStyle>
      <InputTitleStyle>{title}</InputTitleStyle>
      <InputTextStyle placeholder={placeholder} blurOnSubmit={blurOnSubmit} multiline={multiline} />
    </FormBoxStyle>
  );
}

export default FormBox;
