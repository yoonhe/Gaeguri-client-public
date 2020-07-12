import React from 'react';
import { Modal } from 'react-native';
import { ModalDim, PickerButtonBox, PickerButtonTitle } from '../styles/modal';
import { BorderButton, PickerButton } from './ButtonComponent';

function PositionPickerModal({ modalVisible, showModalPicker, positionList, goToRoom, project }) {
  return (
    <Modal
      visible={modalVisible}
      animationType='fade'
      onRequestClose={showModalPicker}
      transparent={true}
    >
      <ModalDim>
        <PickerButtonBox>
          <PickerButtonTitle>참여할 포지션을 선택해주세요</PickerButtonTitle>
          {positionList?.getProjectDetail.projectpositionno.map((positionInfo, index) => (
            <PickerButton
              index={index}
              disabled={positionInfo.NoOfPosition === positionInfo.PC.length}
              onPress={() => {
                goToRoom(project.Project_id, project.Project_name, project.Owner_id);
                showModalPicker();
              }}
            >
              {positionInfo.position.Position_name}
            </PickerButton>
          ))}
        </PickerButtonBox>
        <BorderButton onPress={showModalPicker} backgroundColor={true}>
          취소
        </BorderButton>
      </ModalDim>
    </Modal>
  );
}

export default PositionPickerModal;
