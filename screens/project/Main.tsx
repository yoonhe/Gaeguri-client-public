import React, { useCallback } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { PageWrapStyle } from '../../styles/common';
import {
  CardListStyle,
  CardListTitle,
  ButtonAndTextStyle,
  TextWrapStyle,
  TextListStyle,
  TextListItemStyle,
  StateWrap,
  StateStyle,
  StateShapeStyle,
} from '../../styles/list';
import { TagListStyle, TagItemStyle, TagTextStyle } from '../../styles/tag';
import { BorderButton } from '../../components/ButtonComponent';

const GET_PROJECT = gql`
  query GettMyProjectList($User_id: Int!) {
    getAvailableProjectList(User_id: $User_id) {
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
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { User_id: 10 },
  });
  const goToRoom = useCallback(() => {
    navigation.navigate('Room', { title: '' });
  }, []);

  console.log('data ? ', data);

  return (
    <PageWrapStyle>
      <ScrollView>
        {loading && <Text>loading...</Text>}
        {data &&
          data.getAvailableProjectList.map(project => (
            <CardListStyle>
              <CardListTitle>{project.Project_name}</CardListTitle>
              {/* <Text>{project.Desc}</Text> */}
              <TagListStyle type="text">
                {project.projectstack.map(stackItem => (
                  <TagItemStyle type="text">
                    <TagTextStyle type="text">#{stackItem.stack.Stack_name}</TagTextStyle>
                  </TagItemStyle>
                ))}
              </TagListStyle>
              <ButtonAndTextStyle>
                <BorderButton onPress={goToRoom} backgroundColor={true}>
                  참여요청
                </BorderButton>
                <TextWrapStyle>
                  <StateWrap>
                    <StateShapeStyle />
                    <StateStyle>{project.status === 'await' && '모집중'}</StateStyle>
                  </StateWrap>
                  <TextListStyle>
                    {project.projectpositionno.map(positionInfo => (
                      <>
                        <TextListItemStyle>{positionInfo.position.Position_name}</TextListItemStyle>
                        <TextListItemStyle>{positionInfo.NoOfPosition}</TextListItemStyle>
                      </>
                    ))}
                  </TextListStyle>
                </TextWrapStyle>
              </ButtonAndTextStyle>
            </CardListStyle>
          ))}
      </ScrollView>
    </PageWrapStyle>
  );
}

export default Main;
