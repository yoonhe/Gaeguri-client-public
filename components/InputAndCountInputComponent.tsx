import React from 'react';
import { RowFormWrapStyle, FormStyle, InputBoxStyle, InputTextStyle } from '../styles/form';
import { BorderButton, CircleButton } from '../components/ButtonComponent';
import CountInputComponent from './CountInputComponent';

function InputAndCountInputComponent({
  position,
  count,
  setPositionList,
  deletePositionItemButtonHandler,
  countPlusMinusButtonHandler,
  positionChangeHandler,
  index,
}) {
  return (
    <RowFormWrapStyle>
      <FormStyle>
        <InputBoxStyle>
          <CircleButton onPress={deletePositionItemButtonHandler.bind(null, index)}>X</CircleButton>
          <InputTextStyle
            placeholder="포지션"
            value={position}
            onChange={positionChangeHandler.bind(null, index)}
            row={true}
          />
        </InputBoxStyle>
      </FormStyle>
      <CountInputComponent
        count={count}
        index={index}
        setPositionList={setPositionList}
        countPlusMinusButtonHandler={countPlusMinusButtonHandler}
      />
    </RowFormWrapStyle>
  );
}

export default InputAndCountInputComponent;
