import React, { useState } from 'react';
import { Picker } from 'react-native';

function ProjectStatusPickerComponent({ selectedValue, onValueChange }) {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      <Picker.Item label="모집중/진행중" value="onGoing" />
      <Picker.Item label="종료됨" value="end" />
    </Picker>
  );
}

export default ProjectStatusPickerComponent;
