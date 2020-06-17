import React from 'react';
import { InputTitleStyle, FormBoxStyle, InputTextStyle } from '../styles/form';

function FormBox({ title, placeholder, blurOnSubmit, multiline }) {
  return (
    <FormBoxStyle>
      <InputTitleStyle>{title}</InputTitleStyle>
      <InputTextStyle placeholder={placeholder} blurOnSubmit={blurOnSubmit} multiline={multiline} />
    </FormBoxStyle>
  );
}

export default FormBox;
