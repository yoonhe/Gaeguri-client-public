import React, { useCallback } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
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

  if (error) {
    console.log('[CardListComponents] error ? ', error);
  }

  return (
    <PageWrapStyle>
      <ScrollView>
        {loading && (
          <View>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        )}
        {data &&
          data.getAvailableProjectList.map((project, i) => (
            <CardListComponent key={i} project={project} navigation={navigation} />
          ))}
      </ScrollView>
    </PageWrapStyle>
  );
}

export default Main;
