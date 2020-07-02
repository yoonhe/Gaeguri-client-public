import React, {useState, useEffect} from 'react';
import {
  RowFormWrapStyle,
  FormStyle,
  InputBoxStyle,
  InputTextStyle,
} from '../styles/form';
import {BorderButton, CircleButton} from '../components/ButtonComponent';
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
  const [positionValue, setPositionValue] = useState(position);

  // useEffect(() => {
  //   console.log('positionValue ? ', positionValue);
  //   // positionChangeHandler(index, positionValue);
  // }, [positionValue]);

  return (
    <RowFormWrapStyle>
      <FormStyle>
        <InputBoxStyle>
          <CircleButton
            onPress={deletePositionItemButtonHandler.bind(null, index)}>
            X
          </CircleButton>
          <InputTextStyle
            placeholder="포지션"
            value={positionValue}
            onChangeText={(text) => setPositionValue(text)}
            onBlur={positionChangeHandler.bind(null, index, positionValue)}
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
