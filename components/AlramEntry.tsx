import { View } from 'react-native';

import React, { useState, useCallback } from 'react';
import {
  TextContentStyle,
  TextCaptionStyle,
  TextContentStyleThick,
  TextCaptionStyleTime,
  BottomLineStyle,
  TextContentStyleThickGreen,
  TextContentStyleThickBlue,
} from '../styles/common';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const PROJECT_INFO = gql`
  query getProjectDetail($Project_id: Int) {
    getProjectDetail(Project_id: $Project_id) {
      Project_id
      Project_name
    }
  }
`;
function AlramEntry({ alram, navigation }): React.ReactElement {
  const prjInfo = useQuery(PROJECT_INFO, {
    variables: { Project_id: alram.Project_id },
  });
  if (prjInfo.data)
    console.log(
      '-------project detail data usequery',
      prjInfo?.data?.getProjectDetail?.Project_name,
    );

  if (alram.type === 'NewMember') {
    return (
      <BottomLineStyle>
        <TextContentStyle>
          <TextContentStyleThick>[참여]</TextContentStyleThick>
          {' ' + alram.Username} 님이{' '}
          <TextContentStyleThickBlue>
            '{alram.Project_Name || prjInfo?.data?.getProjectDetail?.Project_name}'
          </TextContentStyleThickBlue>{' '}
          에 <TextContentStyleThickGreen> '{alram.Position_name}'</TextContentStyleThickGreen>{' '}
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
    return (
      <BottomLineStyle>
        <TextContentStyle>
          <TextContentStyleThick>[초대]</TextContentStyleThick>
          {' ' + alram.Username} 님이{' '}
          <TextContentStyleThickBlue>
            '{alram.Project_Name || prjInfo?.data?.getProjectDetail?.Project_name}'
          </TextContentStyleThickBlue>{' '}
          에 <TextContentStyleThickGreen> '{alram.Position_name}'</TextContentStyleThickGreen>{' '}
          포지션으로 초대하였습니다.
        </TextContentStyle>
        <TextCaptionStyleTime>
          {alram.createAt.split('T')[0] + ' ' + alram.createAt.split('T')[1].substr(0, 8)}
        </TextCaptionStyleTime>
      </BottomLineStyle>
    );
  }
}
export default AlramEntry;

//alram data
//{"Email": null,
// "Position_name": "front",
// "Postion_id": null,
// "Project_Name": null,
// "Project_id": 51,
//  "User_id": 25,
//  "Username": "윤해은",
//   "__typename": "alram",
//    "createAt": "2020-07-18T00:06:56.730Z",
//    "type": "NewMember"}

// Username 님이 Project_Name 에 Position_name으로 참여하였습니다.  --createAt
// Username 님이 Project_Name 에 Postion_name으로 초대하였습니다. --creaetAt
// 수락, 무시
