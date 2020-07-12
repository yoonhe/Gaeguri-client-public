import React from 'react';
import { View, ActivityIndicator } from 'react-native';
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

function UserProjectHistory({ userId }): React.ReactElement {
  //전달받은 유저 ID 확인
  // console.log('전달받은 userId ??:', userId);

  const { loading, error, data } = useQuery(GET_MY_PROJECTLIST, {
    variables: { User_id: userId },
  });
  if (loading) console.log('Loading...');
  if (error) console.log(`Error! ${error.message}`);
  if (data) console.log('[data.getMyProjectList] 확인??:', data.getMyProjectList);

  return (
    <View>
      {loading && (
        <View>
          <ActivityIndicator />
        </View>
      )}
      {data && data.getMyProjectList.length === 0 ? (
        <TextContentStyle placeholder={true}>아직 참여한 프로젝트가 없습니다.</TextContentStyle>
      ) : (
        data &&
        data.getMyProjectList.map((project, index) => (
          <ProjectHistoryStyle key={index}>
            <TextContentStyle>{project.Project_name}</TextContentStyle>
            <TextContentStyle mid={true}>{project.Desc}</TextContentStyle>
            <TextDateStyle>
              {project.status === 'await'
                ? '진행중'
                : project.status === 'start'
                ? '모집중'
                : '종료됨'}
              {' | '} {moment(project.EndAt).format('YYYY-MM-DD')}
            </TextDateStyle>
          </ProjectHistoryStyle>
        ))
      )}
    </View>
  );
}

export default UserProjectHistory;
