import React from 'react';
import { View, Text } from 'react-native';
import { TextContentStyle, TextDateStyle } from '../styles/common';
import { ProjectHistoryStyle } from '../styles/list';
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

function UserProjectHistory({}): React.ReactElement {
  const { loading, error, data } = useQuery(GET_MY_PROJECTLIST, {
    variables: { User_id: 1 },
  });
  if (loading) console.log('Loading...');
  if (error) console.log(`Error! ${error.message}`);
  if (data) console.log('data ?? ', data);

  const projects = data.getMyProjectList;

  return (
    <View>
      {loading && <Text>loading...</Text>}
      {projects === 'null' ? (
        <TextContentStyle>참여한 프로젝트가 없습니다.</TextContentStyle>
      ) : (
        projects.map(project => (
          <ProjectHistoryStyle key={project.Project_id}>
            <TextContentStyle>{project.Project_name}</TextContentStyle>
            <TextDateStyle>{project.projectpositionno.position}</TextDateStyle>
            <TextDateStyle>{project.EndAt}</TextDateStyle>
          </ProjectHistoryStyle>
        ))
      )}
    </View>
  );
}

export default UserProjectHistory;
