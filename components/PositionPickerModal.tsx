import React from 'react';
import { Modal } from 'react-native';
import { ModalDim, PickerButtonBox, PickerButtonTitle } from '../styles/modal';
import { BorderButton, PickerButton } from './ButtonComponent';
import gql from 'graphql-tag';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { GET_MYINFO } from '../screens/project/room/RoomQuries';

const REQUEST_PARTICIPATE = gql`
  mutation ParticipateProject($input: PP_User) {
    participateProject(input: $input) {
      path
      error
      ok
    }
  }
`;

function PositionPickerModal({ modalVisible, showModalPicker, positionList, goToRoom, project }) {
  const myInfo = useQuery(GET_MYINFO);
  // const [participateProject, { data, loading, error }] = useMutation(REQUEST_PARTICIPATE);
  const client = useApolloClient();

  const proejctParticipation = async positionInfo => {
    try {
      console.log('positionInfo ? ', positionInfo);
      console.log('positionInfo?.Project_id ? ', positionInfo?.Project_id);
      console.log('positionInfo?.Position_id ? ', positionInfo?.Position_id);
      const result = await client.mutate({
        mutation: REQUEST_PARTICIPATE,
        variables: {
          User_id: myInfo?.data?.GetMyProfile?.user?.User_id,
          Project_id: positionInfo?.Project_id,
          Position_id: positionInfo?.Position_id,
        },
      });
      console.log('result ? ', result);
      goToRoom(project.Project_id, project.Project_name, project.Owner_id);
      showModalPicker();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
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
              onPress={proejctParticipation.bind(null, positionInfo)}
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
