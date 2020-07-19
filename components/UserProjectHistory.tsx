import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TextContentStyle, TextDateStyle } from '../styles/common';
import { ProjectHistoryStyle } from '../styles/list';
import moment from 'moment';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_MY_PROJECTLIST = gql`
  query GetMyProjectList {
    getMyProjectList {
      Project_name
      EndAt
      Desc
      status
      projectstack {
        stack {
          Stack_name
        }
      }
    }
  }
`;

function UserProjectHistory(): React.ReactElement {
  //전달받은 유저 ID 확인
  // console.log('전달받은 userId ??:', userId);
  const [projectList, setProjectList] = useState<object[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const { loading, error, data } = await useQuery(GET_MY_PROJECTLIST);
    if (error) console.log('프로젝트 히스토리 Error!', error.message);
    if (loading) {
      console.log('프로젝트 히스토리Loading...');
      setDataLoading(true);
    }
    if (data) {
      console.log('프로젝트 히스토리 getMyProjectList??:', data.getMyProjectList);
      setProjectList(data.getMyProjectList);
    }
  };

  return (
    <View>
      {dataLoading && <TextContentStyle placeholder={true}>loading...</TextContentStyle>}
      {projectList.length === 0 ? (
        <TextContentStyle placeholder={true}>아직 참여한 프로젝트가 없습니다.</TextContentStyle>
      ) : (
        projectList.map((project, index) => (
          <ProjectHistoryStyle key={index}>
            <TextContentStyle>{project.Project_name}</TextContentStyle>
            <TextContentStyle mid={true}>{project.Desc}</TextContentStyle>
            <TextDateStyle>
              {project.status === 'await'
                ? '진행중'
                : project.status === 'start'
                ? '모집중'
                : '종료됨'}
              {moment(project.EndAt).format('YYYY-MM-DD')}
            </TextDateStyle>
          </ProjectHistoryStyle>
        ))
      )}
    </View>
  );
}

export default UserProjectHistory;
