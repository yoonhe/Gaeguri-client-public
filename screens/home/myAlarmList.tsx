import React, { useState, useContext, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import { PageWrapAlignCenterStyle, PageWrapStyle } from '../../styles/common';
import { gql } from 'apollo-boost';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import AlramEntry from '../../components/AlramEntry';
import { HeaderCloseButtonStyle, BorderButtonSmallStyle } from '../../styles/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const GET_ALRAMLIST = gql`
  query {
    myAlramList {
      ok
      path
      error
      newMember {
        type
        Project_id
        Project_name
        Position_id
        Position_name
        User_id
        Email
        Username
        createAt
      }
      newInvitation {
        type
        Project_id
        Project_name
        Position_id
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
  //const [loading, setLoading] = useState(true);
  const { data, loading } = useQuery(GET_ALRAMLIST, { pollInterval: 200 });
  console.log('loading----------', loading);
  console.log('alramlist', alrams);

  useEffect(() => {
    getAlramList();
  }, [data, loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '알람 리스트',
      headerRight: () => (
        <HeaderCloseButtonStyle title="닫기" onPress={closeDrawer}>
          닫기
        </HeaderCloseButtonStyle>
      ),
    });
  }, []);

  const closeDrawer = () => {
    navigation.navigate('home');
  };

  const getAlramList = async () => {
    // const {
    //   data: {
    //     myAlramList: { newMember, newInvitation },
    //   },
    //   errors,
    // } = await client.query({
    //   query: GET_ALRAMLIST,
    // });
    const newMember = data?.myAlramList?.newMember;
    const newInvitation = data?.myAlramList?.newInvitation;

    const allList = [...newMember, ...newInvitation];
    allList.sort((a, b) => {
      return a.createAt > b.createAt ? -1 : a.createAt < b.createAt ? 1 : 0;
    });
    console.log('allList=================', allList);

    setAlrams([...allList]);
  };

  return (
    <PageWrapStyle>
      <KeyboardAwareScrollView>
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        ) : (
          <View>
            {alrams.map((alram, i) => {
              return <AlramEntry key={i} alram={alram} navigation={navigation} />;
            })}
          </View>
        )}
      </KeyboardAwareScrollView>
    </PageWrapStyle>
  );
}

export default MyAlramList;
