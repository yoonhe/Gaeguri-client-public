import React, { useState, useCallback } from 'react';
import { Alert, View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useMutation } from '@apollo/react-hooks';
import {
  PageWrapAlignCenterStyle,
  TextSubTitleStyle,
  PageWrapWhiteStyle,
} from '../../styles/common';
import { TagListStyle, TagItemStyle, TagTextStyle } from '../../styles/tag';
import { BorderButton } from '../../components/ButtonComponent';
import FormBoxComponent from '../../components/FormBoxComponent';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { CommonActions } from '@react-navigation/native';

//email, password, username, position, stack, about me
//<Text title="About me" name="aboutme" placeholder="About me" />

const GET_STACK = gql`
  query {
    stackAll {
      Stack_id
      Stack_name
    }
  }
`;

const GET_POSITION = gql`
  query {
    positionUser {
      Position_id
      Position_name
    }
  }
`;

const SIGNUP = gql`
  mutation EmailSignUp(
    $Username: String!
    $Email: String!
    $Password: String!
    $Position_id: Int
    $stack: [String]
    $AboutMe: String
  ) {
    EmailSignUp(
      Username: $Username
      Email: $Email
      Password: $Password
      Position_id: $Position_id
      stack: $stack
      AboutMe: $AboutMe
    ) {
      ok
      error
    }
  }
`;

function SignupPhaseThree({ navigation, route }): React.ReactElement {
  const [stackList, setStackList] = useState<object[]>([]);
  const [position, setPosition] = useState('');
  const [createUser] = useMutation(SIGNUP);
  const stacks = useQuery(GET_STACK);
  const positions = useQuery(GET_POSITION);

  if (stacks.loading || positions.loading || positions.error || stacks.error) {
    return (
      <PageWrapWhiteStyle>
        <TextSubTitleStyle>Loading...</TextSubTitleStyle>
      </PageWrapWhiteStyle>
    );
  }
  if (positions.data) {
    //console.log('-----------positions', positions.data);
    let items = ['포지션을 입력하세요'];
    //items.concat(positions.data.positionUser);
    //console.log('items---------------', items);
    var serviceItems = items.concat(positions.data.positionUser).map((s, i) => {
      // console.log('service position map s', s);
      // console.log('service position map index', i);
      if (i === 0) {
        return <Picker.Item key={i} value={s} label={s} />;
      } else {
        return <Picker.Item key={i} value={s.Position_id} label={s.Position_name} />;
      }
    });
  }
  const stackHandler = newStack => {
    //console.log('------------stack value', e._dispatchInstances.memoizedProps.children);
    if (stackList.indexOf(newStack) === -1) {
      let newStacks = stackList.slice();
      newStacks.push(newStack);
      setStackList(newStacks);
      //console.log('newstacklist==============', stackList);
    } else {
      let rmIndex = stackList.indexOf(newStack);
      //console.log(rmIndex, newStack);
      let rmStacks = stackList.slice();
      rmStacks.splice(rmIndex, 1);

      setStackList(rmStacks);
      //console.log('rmStacks==============', stackList);
    }
  };

  const nextPageButtonHandler = useCallback(() => {
    const createUserInfo = {
      ...route.params.data,
      stack: stackList,
      Position_id: position,
    };

    //console.log(createUserInfo);

    createUser({
      variables: { ...createUserInfo },
    })
      .then(res => {
        console.log('-----------??????', res);
        Alert.alert('회원가입 완료!', '', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ name: '로그인' }],
          }),
        );
      })
      .catch(error => {
        console.log('----------?????error', error);
      });
  }, [stackList, position]);
  return (
    <PageWrapWhiteStyle>
      <TextSubTitleStyle>포지션을 선택해주세요. </TextSubTitleStyle>
      <Picker mode="dropdown" selectedValue={position} onValueChange={value => setPosition(value)}>
        {positions.data ? serviceItems : null}
      </Picker>

      <TextSubTitleStyle>기술스택을 선택해주세요.</TextSubTitleStyle>
      <TagListStyle>
        {stacks.data
          ? stacks.data.stackAll.map((stack, index) => (
              <TagItemStyle key={index}>
                <TagTextStyle>
                  <Text onPress={e => stackHandler(e._dispatchInstances.memoizedProps.children)}>
                    {stack.Stack_name}
                  </Text>
                </TagTextStyle>
              </TagItemStyle>
            ))
          : null}
      </TagListStyle>
      <BorderButton onPress={nextPageButtonHandler}>Done</BorderButton>
    </PageWrapWhiteStyle>
  );
}

export default SignupPhaseThree;
