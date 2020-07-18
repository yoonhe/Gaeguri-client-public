import React, { useState, useContext, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import { PageWrapAlignCenterStyle, PageWrapStyle } from '../../styles/common';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import AlramEntry from '../../components/AlramEntry';
import { HeaderButtonStyle } from '../../styles/button';

const GET_ALRAMLIST = gql`
  query {
    myAlramList {
      ok
      path
      error
      newMember {
        type
        Project_id
        Project_Name
        Postion_id
        Position_name
        User_id
        Email
        Username
        createAt
      }
      newInvitation {
        type
        Project_id
        Project_Name
        Postion_id
        Position_name
        User_id
        Email
        Username
        createAt
      }
    }
  }
`;

function MyAlramList({ route, navigation }): React.ReactElement {
  const client = useApolloClient();
  const [alrams, setAlrams] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log('route--------', route);
  console.log('navigation----------', navigation);
  console.log('alramlist', alrams);

  useEffect(() => {
    getAlramList();
  }, []);

  const getAlramList = async () => {
    const {
      data: {
        myAlramList: { newMember, newInvitation },
      },
    } = await client.query({
      query: GET_ALRAMLIST,
    });
    //console.log(data);
    const allList = [...newMember, ...newInvitation];
    allList.sort((a, b) => {
      return a.createAt > b.createAt ? -1 : a.createAt < b.createAt ? 1 : 0;
    });
    console.log('allList=================', allList);

    setAlrams([...allList]);
    setLoading(false);
  };

  return (
    <PageWrapStyle>
      <View>
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        ) : (
          <View>
            {alrams.map(alram => {
              return <AlramEntry alram={alram} navigation={navigation} />;
            })}
          </View>
        )}
      </View>
    </PageWrapStyle>
  );
}

export default MyAlramList;
