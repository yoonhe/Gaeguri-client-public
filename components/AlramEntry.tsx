import { View, Button } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import {
  TextContentStyle,
  TextContentStyleThick,
  TextCaptionStyleTime,
  BottomLineStyle,
  TextContentStyleThickGreen,
  TextContentStyleThickBlue,
  ButtonAlignView,
} from '../styles/common';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { AcceptButtonStyleBlue, AcceptButtonStyleYello } from '../styles/button';

const INVITE_ACCEPT = gql`
  mutation participateProjectWithPUBSUB($Project_id: Int, $Position_id: Int) {
    participateProjectWithPUBSUB(input: { Project_id: $Project_id, Position_id: $Position_id }) {
      path
      error
      ok
    }
  }
`;
//User_id: myInfo?.data?.GetMyProfile?.user?.User_id,
//Project_id: positionInfo?.Project_id,
//Position_id: positionInfo?.Position_id,

const INVITE_DENY = gql`
  mutation leaveProject($Project_id: Int, $Position_id: Int) {
    leaveProject(input: { Project_id: $Project_id, Position_id: $Position_id }) {
      path
      message
    }
  }
`;

function AlramEntry({ alram, navigation }): React.ReactElement {
  const client = useApolloClient();
  const { Project_id, Position_id } = alram;

  const acceptInvite = useCallback(async () => {
    //console.log(Project_id, Position_id);
    await client.mutate({
      mutation: INVITE_ACCEPT,
      variables: {
        Project_id: Project_id,
        Position_id: Position_id,
      },
    });
  }, [alram]);

  const denyInvite = useCallback(async () => {
    //console.log(Project_id, Position_id);
    //console.log('deny press??');
    await client.mutate({
      mutation: INVITE_DENY,
      variables: {
        Project_id: Project_id,
        Position_id: Position_id,
      },
    });
    //console.log(result.data.leaveProject);
  }, [alram]);

  if (alram.type === 'NewMember') {
    return (
      <BottomLineStyle>
        <TextContentStyle>
          <TextContentStyleThick>[참여]</TextContentStyleThick>
          {' ' + alram.Username} 님이{' '}
          <TextContentStyleThickBlue>'{alram.Project_name}'</TextContentStyleThickBlue> 에{' '}
          <TextContentStyleThickGreen> '{alram.Position_name}'</TextContentStyleThickGreen>{' '}
          포지션으로 참여하였습니다.
        </TextContentStyle>
        <TextCaptionStyleTime>
          {' '}
          {alram.createAt.split('T')[0] + ' ' + alram.createAt.split('T')[1].substr(0, 8)}
        </TextCaptionStyleTime>
      </BottomLineStyle>
    );
  }
  if (alram.type === 'New Invitation') {
    // if (alram.Allowed === 'Wait') {
    // server update 후 추가 예정
    // }
    return (
      <BottomLineStyle>
        <TextContentStyle>
          <TextContentStyleThick>[초대]</TextContentStyleThick>
          {' ' + alram.Username} 님이{' '}
          <TextContentStyleThickBlue>'{alram.Project_name}'</TextContentStyleThickBlue> 에{' '}
          <TextContentStyleThickGreen> '{alram.Position_name}'</TextContentStyleThickGreen>{' '}
          포지션으로 초대하였습니다.
        </TextContentStyle>
        <TextCaptionStyleTime>
          {alram.createAt.split('T')[0] + ' ' + alram.createAt.split('T')[1].substr(0, 8)}
        </TextCaptionStyleTime>
        <ButtonAlignView>
          <AcceptButtonStyleBlue title="수락" onPress={acceptInvite}>
            수락
          </AcceptButtonStyleBlue>
          <AcceptButtonStyleYello title="거절" onPress={denyInvite}>
            거절
          </AcceptButtonStyleYello>
        </ButtonAlignView>
      </BottomLineStyle>
    );
  }
}
export default AlramEntry;
