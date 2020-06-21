import React from 'react';
import { RowFormWrapStyle, FormStyle, InputBoxStyle, InputTextStyle } from '../styles/form';
import { BorderButton } from '../components/ButtonComponent';
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
          <BorderButton
            text="X"
            width="30"
            height="30"
            radius="15"
            marginTop="0"
            marginRight="10"
            onPress={deletePositionItemButtonHandler.bind(null, index)}
          />
          <InputTextStyle
            placeholder="포지션"
            value={position}
            onChange={positionChangeHandler.bind(null, index)}
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
