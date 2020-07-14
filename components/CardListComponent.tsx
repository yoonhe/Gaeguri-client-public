import React, { useCallback, useState } from 'react';
import { Text, Modal, View, ActivityIndicator } from 'react-native';
import {
  CardListStyle,
  CardListTitle,
  ButtonAndTextStyle,
  TextWrapStyle,
  TextListStyle,
  TextListItemWrapStyle,
  TextListItemStyle,
  StateWrap,
  StateStyle,
  StateShapeStyle,
  NewIcon,
} from '../styles/list';
import { TextTagListStyle, TextTagItemStyle, TextTagTextStyle } from '../styles/tag';
import { BorderButton } from './ButtonComponent';
import PositionPickerModal from './PositionPickerModal';
import moment from 'moment';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

function CardListComponent({ project, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const deadLine = moment().subtract(24, 'hour');

  const GET_PROJECT_ID = gql`
    query GetProjectDetail($Project_id: Int) {
      getProjectDetail(Project_id: $Project_id) {
        Owner_id
        createdAt
        projectpositionno {
          PP_id
          Position_id
          Project_id
          NoOfPosition
          position {
            Position_id
            Position_name
          }
          PC {
            Project_Position_id
            Sender_id
            Candidate_id
            Allowed
            Owner
            candidate {
              User_id
              Username
              Email
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PROJECT_ID, {
    variables: { Project_id: project.Project_id },
  });

  if (error) {
    console.log('[CardListCompoennt Error] ? ', error);
  }

  const statusFormat = useCallback(() => {
    let statusName;
    switch (project.status) {
      case 'await':
        statusName = '모집중';
        break;

      case 'Start':
        statusName = '진행중';
        break;

      case 'End':
        statusName = '종료됨';
        break;
    }

    return statusName;
  }, []);

  const goToRoom = useCallback(
    (projectId, projectName, OwnerId) => {
      console.log('goToRoom 클릭');
      navigation.navigate('Room', {
        projectId,
        projectName,
        OwnerId,
      });
    },
    [modalVisible],
  );

  const showModalPicker = useCallback(() => {
    setModalVisible(prev => !prev);
  }, []);

  return (
    <CardListStyle status={project.status}>
      <CardListTitle status={project.status}>{project.Project_name}</CardListTitle>
      {/* <Text>{project.Desc}</Text> */}
      <TextTagListStyle>
        {project.projectstack.map(stackItem => (
          <TextTagItemStyle>
            <TextTagTextStyle>#{stackItem.stack.Stack_name}</TextTagTextStyle>
          </TextTagItemStyle>
        ))}
      </TextTagListStyle>
      <ButtonAndTextStyle>
        <BorderButton
          onPress={showModalPicker}
          backgroundColor={project.status === 'End' ? 'disabled' : true}
          disabled={project.status === 'End'}
        >
          참여요청
        </BorderButton>
        <TextWrapStyle>
          <StateWrap>
            <StateShapeStyle status={project.status} />
            <StateStyle status={project.status}>{statusFormat()}</StateStyle>
          </StateWrap>
          <TextListStyle>
            {project.projectpositionno.map((positionInfo, index) => (
              <TextListItemWrapStyle key={index} index={index}>
                <TextListItemStyle>{positionInfo.position.Position_name} </TextListItemStyle>
                <TextListItemStyle>{positionInfo.NoOfPosition}</TextListItemStyle>
                <Text>{index !== project.projectpositionno.length - 1 && ','}</Text>
              </TextListItemWrapStyle>
            ))}
          </TextListStyle>
        </TextWrapStyle>
      </ButtonAndTextStyle>

      {data && moment(data.getProjectDetail.createdAt) > deadLine && <NewIcon>NEW</NewIcon>}

      {data && (
        <PositionPickerModal
          modalVisible={modalVisible}
          showModalPicker={showModalPicker}
          positionList={data}
          goToRoom={goToRoom}
          project={project}
        />
      )}
    </CardListStyle>
  );
}

export default CardListComponent;
