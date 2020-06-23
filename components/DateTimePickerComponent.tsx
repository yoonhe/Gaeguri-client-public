import React, { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BorderButton } from './ButtonComponent';
import FormBoxComponent from './FormBoxComponent';
import { DateTimePickerBoxStyle } from '../styles/form';
import { InputButton } from './ButtonComponent';

interface DateTimePickerProps {
  date: Date | null;
  setDate: Function;
  formatDate: Function;
}

function DateTimePickerComponent({
  date,
  setDate,
  formatDate,
}: DateTimePickerProps): React.ReactElement {
  const [show, setShow] = useState(false);
  const today = new Date();

  const onChange = useCallback(
    (event, selectedDate) => {
      const currentDate: Date = selectedDate || date;
      console.log('currentDate ? ', currentDate);
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    },
    [date],
  );

  const showDatePicker = useCallback(() => {
    setShow(true);
  }, []);

  const closeDatePicker = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <FormBoxComponent title="완료일정">
        <InputButton onPress={showDatePicker} placeholder={!date}>
          {date ? formatDate() : '완료일정'}
        </InputButton>
      </FormBoxComponent>
      {show && (
        <DateTimePickerBoxStyle>
          <DateTimePicker
            testID="dateTimePicker"
            value={date ? date : today}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
          <BorderButton onPress={closeDatePicker}>확인</BorderButton>
        </DateTimePickerBoxStyle>
      )}
    </>
  );
}

export default DateTimePickerComponent;
