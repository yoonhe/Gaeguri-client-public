import React, { useCallback } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { PageWrapStyle } from '../../styles/common';
import CardListComponent from '../../components/CardListComponent';

const GET_PROJECT = gql`
  query GetAvailableProjectList {
    getAvailableProjectList {
      Project_id
      Project_name
      StartAt
      EndAt
      Desc
      status
      Owner_id
      projectstack {
        stack {
          Stack_name
        }
      }
      projectpositionno {
        NoOfPosition
        position {
          Position_name
        }
      }
    }
  }
`;

function Main({ navigation }): React.ReactElement {
  const { loading, error, data } = useQuery(GET_PROJECT);

  if (data) {
    console.log('[CardListComponents] data ? ', data);
  }

  if (error) {
    console.log('[CardListComponents] error ? ', error);
  }

  // const goToRoom = useCallback((projectId, projectName) => {
  //   navigation.navigate('Room', { title: '', projectId: projectId, projectName: projectName });
  // }, []);

  return (
    <PageWrapStyle>
      <ScrollView>
        {loading && <Text>loading...</Text>}
        {data &&
          data.getAvailableProjectList.map(project => (
            <CardListComponent key={project} project={project} navigation={navigation} />
          ))}
      </ScrollView>
    </PageWrapStyle>
  );
}

export default Main;
