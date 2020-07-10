import React from 'react';
import { View, Text } from 'react-native';
import { TextContentStyle, TextDateStyle } from '../styles/common';
import { ProjectHistoryStyle } from '../styles/list';
import moment from 'moment';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_MY_PROJECTLIST = gql`
  query GetMyProjectList($User_id: Int!) {
    getMyProjectList(User_id: $User_id) {
      Project_id
      Project_name
      StartAt
      EndAt
      Desc
      status
      projectstack {
        stack {
          Stack_name
        }
      }
      projectpositionno {
        position {
          Position_id
          Position_name
        }
        PC {
          Candidate_id
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

/*
projectpositionno{
      Position_id
      NoOfPosition
      position{
        Position_name
      }
      PC{
        Candidate_id <- 여기 유저아이디 = 내 유저아이디면 .. 내포지션인데 ...
        candidate{
          User_id
          Username
          Email
        }
      }
*/

function UserProjectHistory({ route }): React.ReactElement {
  //유저 ID 지정
  // console.log('route.params ??:', route.params);
  // const userId = route.params !== undefined ? route.params : 9;

  const { loading, error, data } = useQuery(GET_MY_PROJECTLIST, {
    variables: { User_id: 9 },
  });
  if (loading) console.log('Loading...');
  if (error) console.log(`Error! ${error.message}`);
  if (data) console.log('[data.getMyProjectList] 확인??:', data.getMyProjectList);

  return (
    <View>
      {loading && <Text>loading...</Text>}
      {data &&
        data.getMyProjectList.map(project => (
          <ProjectHistoryStyle key={project.Project_id}>
            <TextContentStyle>{project.Project_name}</TextContentStyle>
            {/* <TextDateStyle>{project.projectpositionno.position.Position_name}</TextDateStyle> */}
            <TextDateStyle>{moment(project.EndAt).format('YYYY-MM-DD')}</TextDateStyle>
          </ProjectHistoryStyle>
        ))}
    </View>
  );
}

export default UserProjectHistory;
